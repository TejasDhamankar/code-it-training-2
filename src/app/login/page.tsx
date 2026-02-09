"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/admin/courses"); // Redirect to dashboard
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            CODE IT
          </h1>
          <p className="text-sm text-gray-600">Admin Dashboard</p>
        </div>
        <Card className="rounded-2xl shadow-lg ring-1 ring-gray-200/50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Lock size={24} className="text-gray-500" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 rounded-lg border-gray-200 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg border-gray-200 bg-white"
                  required
                />
              </div>
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
              <Button 
                type="submit" 
                disabled={loading}
                className="h-11 w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              >
                {loading ? "Authenticating..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}