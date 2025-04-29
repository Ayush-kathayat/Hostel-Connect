"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const { login, signup } = useAuthContext();

  const handleLogin = async (
    email: string,
    password: string,
    userType: "student" | "hostelProvider"
  ) => {
    const success = await login(email, password, userType);
    if (success) {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
      });

      // Redirect based on user type
      if (userType === "hostelProvider") {
        navigate("/post-hostels");
      } else {
        navigate("/home");
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string,
    userType: "student" | "hostelProvider"
  ) => {
    const success = await signup(name, email, password, userType);
    if (success) {
      toast({
        title: "Account Created Successfully",
        description: "Your account has been created and you are now logged in",
      });

      // Redirect based on user type
      if (userType === "hostelProvider") {
        navigate("/post-hostels");
      } else {
        navigate("/home");
      }
    } else {
      toast({
        title: "Signup Failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Navbar />{" "}
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-indigo-200 opacity-10 blur-3xl"></div>
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-16 h-16 rounded-lg bg-blue-400 opacity-10 animate-float"></div>
          <div className="absolute bottom-40 right-20 w-12 h-12 rounded-full bg-purple-400 opacity-10 animate-float-delay"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-md bg-indigo-400 opacity-10 animate-float-slow"></div>
        </div>

        <Card className="w-full max-w-md border-none shadow-xl bg-white/80 backdrop-blur-sm rounded-xl">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
          <CardHeader className="space-y-1 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl"></div>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {activeTab === "login" ? "Welcome Back!" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login"
                ? "Enter your credentials to access your account"
                : "Fill in your details to create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "login" | "signup")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-0 space-y-4">
                <LoginForm onLogin={handleLogin} />
              </TabsContent>
              <TabsContent value="signup" className="mt-0 space-y-4">
                <SignupForm onSignup={handleSignup} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 relative">
            <div className="text-sm text-center text-gray-500">
              {activeTab === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-blue-600 hover:underline font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-blue-600 hover:underline font-medium transition-colors"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
