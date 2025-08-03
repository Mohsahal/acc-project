import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If we have a token but no user data, try to get it from storage
  if (!user && localStorage.getItem('token')) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // We'll let the AuthContext handle this, but for now, redirect to login
        return <Navigate to="/login" replace />;
      } catch (error) {
        return <Navigate to="/login" replace />;
      }
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;