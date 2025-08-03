import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'client' | 'staff';
  status: 'active' | 'inactive' | 'pending';
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    avatar?: string;
  };
  lastLogin?: string;
}

export interface Client {
  id: string;
  clientName: string;
  legalEntity: string;
  email: string;
  phone1: string;
  phone2?: string;
  address: string;
  trnNumber?: string;
  giban?: string;
  ftaUsername?: string;
  ftaPassword?: string;
  vatReturnDueDate?: string;
  location?: string;
  status: 'active' | 'inactive' | 'pending';
  documents?: {
    tradeLicense?: {
      filename: string;
      path: string;
      uploadedAt: string;
    };
    agreement?: {
      filename: string;
      path: string;
      uploadedAt: string;
    };
  };
  taxPeriods?: Array<{
    period: number;
    fromDate: string;
    toDate: string;
  }>;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: Client;
  type: 'single' | 'multiple';
  category: 'sales' | 'purchase' | 'sales/purchase';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'partially_completed' | 'cancelled';
  dueDate: string;
  issueDate: string;
  description?: string;
  files?: Array<{
    filename: string;
    path: string;
    uploadedAt: string;
  }>;
  vatAmount: number;
  totalAmount: number;
  notes?: string;
  createdBy: User;
  processedBy?: User;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'client' | 'staff';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// API Service Class
class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  private async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.patch<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async upload<T>(url: string, formData: FormData): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error);
    }
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    return new Error(error.message || 'An error occurred');
  }

  // Auth Methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post('/auth/login', credentials);
      const data = response.data;
      
      if (data.success && data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return {
          token: data.token,
          user: data.user
        };
      } else {
        throw new Error(data.error || data.message || 'Login failed');
      }
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.api.post('/auth/register', userData);
      const data = response.data;
      
      if (data.success) {
        return {
          success: true,
          message: 'Registration successful'
        };
      } else {
        throw new Error(data.error || data.message || 'Registration failed');
      }
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.api.get('/auth/me');
      const data = response.data;
      
      if (data.success && data.user) {
        return data.user;
      } else {
        throw new Error(data.error || data.message || 'Failed to get current user');
      }
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    await this.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Client Methods
  async getClients(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<{ data: Client[]; pagination: any }> {
    const response = await this.get<Client[]>('/clients', params);
    return {
      data: response.data || [],
      pagination: response.pagination
    };
  }

  async getClient(id: string): Promise<Client> {
    const response = await this.get<Client>(`/clients/${id}`);
    return response.data!;
  }

  async createClient(clientData: FormData): Promise<Client> {
    const response = await this.upload<Client>('/clients', clientData);
    return response.data!;
  }

  async updateClient(id: string, clientData: FormData): Promise<Client> {
    const response = await this.upload<Client>(`/clients/${id}`, clientData);
    return response.data!;
  }

  async deleteClient(id: string): Promise<void> {
    await this.delete(`/clients/${id}`);
  }

  // Invoice Methods
  async getInvoices(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    client?: string;
    type?: string;
  }): Promise<{ data: Invoice[]; pagination: any }> {
    const response = await this.get<Invoice[]>('/invoices', params);
    return {
      data: response.data || [],
      pagination: response.pagination
    };
  }

  async getInvoice(id: string): Promise<Invoice> {
    const response = await this.get<Invoice>(`/invoices/${id}`);
    return response.data!;
  }

  async createInvoice(invoiceData: FormData): Promise<Invoice> {
    const response = await this.upload<Invoice>('/invoices', invoiceData);
    return response.data!;
  }

  async updateInvoice(id: string, invoiceData: FormData): Promise<Invoice> {
    const response = await this.upload<Invoice>(`/invoices/${id}`, invoiceData);
    return response.data!;
  }

  async processInvoice(id: string): Promise<Invoice> {
    const response = await this.patch<Invoice>(`/invoices/${id}/process`);
    return response.data!;
  }

  async deleteInvoice(id: string): Promise<void> {
    await this.delete(`/invoices/${id}`);
  }

  // User Methods
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<{ data: User[]; pagination: any }> {
    const response = await this.get<User[]>('/users', params);
    return {
      data: response.data || [],
      pagination: response.pagination
    };
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.get<User>(`/users/${id}`);
    return response.data!;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await this.put<User>(`/users/${id}`, userData);
    return response.data!;
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(`/users/${id}`);
  }

  // Staff Methods
  async getStaff(params?: {
    page?: number;
    limit?: number;
    search?: string;
    client?: string;
  }): Promise<{ data: User[]; pagination: any }> {
    const response = await this.get<User[]>('/staff', params);
    return {
      data: response.data || [],
      pagination: response.pagination
    };
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService; 