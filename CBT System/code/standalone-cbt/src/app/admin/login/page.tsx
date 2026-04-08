"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, ArrowRight, Loader2 } from "lucide-react";

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
    <main className="min-h-[100dvh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] fade-in">
        {/* Branding */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[6px]"
            style={{ background: "var(--accent)" }}
          >
            <CheckSquare size={14} strokeWidth={2.5} color="white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Standalone CBT
          </span>
        </div>

        {/* Form card */}
        <div className="section-card" style={{ padding: "32px" }}>
          <span className="section-label">Admin access</span>
          <h1
            className="mt-2 text-xl font-semibold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Sign in to your dashboard
          </h1>
          <p className="section-subtitle">
            Use the admin account configured for this system.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="email" className="field-label">Email</label>
              <input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input"
                placeholder="admin@example.com"
                type="email"
                required
                autoFocus
              />
            </div>

            <div className="field-group">
              <label htmlFor="password" className="field-label">Password</label>
              <input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>

            {error ? (
              <div className="banner-danger">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-accent w-full"
              style={{ marginTop: "8px" }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={14} strokeWidth={2} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
