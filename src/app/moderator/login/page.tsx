"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/moderator");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 relative overflow-hidden bg-dark-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-200/10 via-transparent to-transparent blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 glass rounded-2xl relative z-10 border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <Lock className="w-5 h-5 text-brand-200" />
          </div>
          <h1 className="text-2xl font-bold tracking-widest uppercase">Moderator</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">{error}</div>}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/50">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-200 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/50">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-200 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-white text-dark-100 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
