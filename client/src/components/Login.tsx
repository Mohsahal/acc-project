import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });

    // Basic validation
    if (!username.trim()) {
      setErrors(prev => ({ ...prev, username: "Username cannot be blank." }));
      return;
    }

    if (!password.trim()) {
      setErrors(prev => ({ ...prev, password: "Password cannot be blank." }));
      return;
    }

    // Mock authentication - accept any username/password
    toast({
      title: "Login Successful",
      description: "Welcome to AdminPanel!",
    });
    
    // Store login state
    localStorage.setItem("isAuthenticated", "true");
    if (rememberMe) {
      localStorage.setItem("username", username);
    }
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700">
            Admin<span className="text-primary">Panel</span>
          </h1>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <p className="text-gray-600">Sign in to start your session</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-600 font-medium">
                  Username
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                    placeholder="Enter username"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-600 font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Enter password"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-gray-600 text-sm">
                  Remember Me
                </Label>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;