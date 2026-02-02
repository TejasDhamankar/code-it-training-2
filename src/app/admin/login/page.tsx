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
    <main className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
      <Card className="w-full max-w-md border-stone-200 shadow-2xl rounded-[2rem] overflow-hidden">
        <CardHeader className="pt-10 pb-6 text-center bg-white">
          <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <Lock size={24} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-stone-900">
            CODE IT <span className="text-emerald-600 text-sm block uppercase tracking-widest mt-1">Admin Access</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-8 pt-0">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Username</label>
              <Input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl border-stone-200 bg-stone-50 h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Password</label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-stone-200 bg-stone-50 h-12"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}