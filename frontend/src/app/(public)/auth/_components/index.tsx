"use client";

import { useState } from "react";
// import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "./tabs/login";
import RegisterTab from "./tabs/register";
// import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      // toast({
      //   title: "Erro",
      //   description: "Preencha todos os campos",
      //   variant: "destructive",
      // });
      return;
    }
    // toast({
    //   title: "Login realizado!",
    //   description: "Você será redirecionado...",
    // });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword || !registerConfirmPassword) {
      // toast({
      //   title: "Erro",
      //   description: "Preencha todos os campos",
      //   variant: "destructive",
      // });
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      // toast({
      //   title: "Erro",
      //   description: "As senhas não coincidem",
      //   variant: "destructive",
      // });
      return;
    }
    // toast({
    //   title: "Cadastro realizado!",
    //   description: "Você será redirecionado...",
    // });
  };

  const handleGoogleLogin = () => {
    // toast({
    //   title: "Login com Google",
    //   description: "Redirecionando para o Google...",
    // });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <Link to="/" className="inline-flex items-center gap-2 mb-4"> */}
          <img
            src="/orange-logo.png"
            alt="Orange Notes"
            className="h-12 w-12"
          />
          <h1 className="text-3xl font-bold text-primary">Orange Notes</h1>
          {/* </Link> */}
          <p className="text-muted-foreground">
            Organize suas ideias com facilidade
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginTab />
          </TabsContent>

          <TabsContent value="register">
            <RegisterTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
