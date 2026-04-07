"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Login failed.");
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl border border-border bg-white p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">Admin Access</p>
        <h1 className="mt-4 text-4xl font-medium">Sign in to the standalone CBT dashboard.</h1>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          Use the local admin account created for this standalone app.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-border bg-white px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
              placeholder="admin@example.com"
              type="email"
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-border bg-white px-4 py-3 outline-none focus:ring-1 focus:ring-accent"
              placeholder="Password"
              type="password"
              required
            />
          </label>
          {error ? <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
