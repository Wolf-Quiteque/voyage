import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Mail, Lock, Phone, CalendarDays,CheckCircle  } from "lucide-react";
import { loginUser, registerUser } from "@/lib/supabse/queries";

export default function AuthDialog({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  // State to store login and registration form data
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    birth_date: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    if(id == 'email'){
      const email = value.toLowerCase();
      setLoginData((prev) => ({ ...prev, [id]: email }));
    return
    }
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    if(id == 'email'){
      const email = value.toLowerCase();
    setRegisterData((prev) => ({ ...prev, [id]: email }));

    return
    }
    setRegisterData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Log the data for demonstration purposes
    if (e.target.closest("form").classList.contains("login-form")) {
      console.log("Login Data:", loginData);
      const data = await loginUser(loginData)
      setIsLoading(false);
      if(data.success){
    onClose();
        
      }
  

    } else {
    const isRegistered = await registerUser(registerData);
    setIsLoading(false);
    if (isRegistered) {
      setIsSuccess(true);
      // Reset after animation
      setTimeout(() => {
        window.location.reload();
       
      }, 2000);
    }else{
      console.log('error')
    }
    }

    // Simulate API call

  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            {isSuccess ? "Success!" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-blue-600">
          {isSuccess
              ? "Your account has been successfully created!"
              : "Sign in to your account or create a new one"}
          </DialogDescription>
        </DialogHeader>

        {isSuccess && (
          <div className="flex flex-col items-center justify-center space-y-4 mt-6">
            <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
            <p className="text-lg text-blue-600 font-medium">
              You have successfully registered!
            </p>
          </div>
        )}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50">
            <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 login-form">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4 register-form">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-blue-700">Full Name</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="full_name"
                    placeholder="Enter your full name"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={registerData.full_name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-blue-700">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={registerData.phone_number}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birth_date" className="text-blue-700">Birth Date</Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="birth_date"
                    type="date"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={registerData.birth_date}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-9 border-blue-200 focus:ring-blue-400"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
