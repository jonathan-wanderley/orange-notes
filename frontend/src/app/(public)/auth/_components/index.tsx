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

const Auth = () => {
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
            <TabsTrigger value="register">Register</TabsTrigger>
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
