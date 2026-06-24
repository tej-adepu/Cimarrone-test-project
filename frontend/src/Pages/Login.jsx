import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    console.log(data);

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    if (data.role === "MANAGER") {
      navigate("/manager/dashboard");
    } else {
      navigate("/employee/dashboard");
    }

  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  const s = {
    page:    { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f1f5f9", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    card:    { backgroundColor: "#fff", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 400, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" },
    logo:    { display: "flex", alignItems: "center", gap: 10, marginBottom: 28 },
    logoBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" },
    h2:      { fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" },
    sub:     { fontSize: 13, color: "#64748b", margin: "0 0 28px" },
    label:   { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 },
    input:   { width: "100%", boxSizing: "border-box", padding: "10px 14px", fontSize: 14, border: "1px solid #e2e8f0", borderRadius: 8, outline: "none", color: "#0f172a", fontFamily: "inherit" },
    row:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
    link:    { fontSize: 12, color: "#2563eb", textDecoration: "none", fontWeight: 500 },
    btn:     { width: "100%", padding: "11px 0", backgroundColor: "#2563eb", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", marginTop: 20, fontFamily: "inherit" },
    foot:    { textAlign: "center", fontSize: 13, color: "#6b7280", marginTop: 20 },
  };

  return (
    <>
      <style>{`
        .ld-input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        .ld-btn:hover   { background-color: #1d4ed8 !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={s.page}>
        <div style={s.card}>

          {/* Logo */}
          <div style={s.logo}>
            <div style={s.logoBox}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>LeaveDesk</span>
          </div>

          <h2 style={s.h2}>Welcome back</h2>
          <p style={s.sub}>Sign in to access your account</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={s.label}>Email address</label>
              <input className="ld-input" style={s.input} type="email" placeholder="you@company.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            {/* Password */}
            <div>
              <div style={s.row}>
                <label style={{ ...s.label, marginBottom: 0 }}>Password</label>
                <a href="#" style={s.link}>Forgot password?</a>
              </div>
              <input className="ld-input" style={s.input} type="password" placeholder="••••••••" required
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>

            <button type="submit" disabled={loading} className="ld-btn" style={s.btn}>
              {loading
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite", verticalAlign: "middle" }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                : "Sign in"}
            </button>
          </form>

          <p style={s.foot}>
            Don't have an account?{" "}
            <span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>Request access</span>
          </p>
        </div>
      </div>
    </>
  );
}