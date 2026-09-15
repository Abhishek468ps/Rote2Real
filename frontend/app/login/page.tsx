/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_CREDENTIALS, INTERN_CREDENTIALS } from "@/lib/authConfig";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      login("admin");
      router.push("/admin/dashboard");
      return;
    }

    if (
      email === INTERN_CREDENTIALS.email &&
      password === INTERN_CREDENTIALS.password
    ) {
      login("intern");
      router.push("/intern/dashboard");
      return;
    }

    setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="bg-white p-8 rounded-xl w-full max-w-md space-y-4 shadow">
        <h2 className="text-2xl font-bold">Login</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
*/

"use client";

import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="
      min-h-screen
      bg-[#050816]
      flex
      items-center
      justify-center
      px-6
      py-12
      "
    >
      <LoginForm />
    </main>
  );
}