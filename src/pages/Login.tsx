import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, LogIn } from "lucide-react";
import logo from "@/assets/rvtc_logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 bg-background min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-card rounded-2xl p-8 card-elevated">
            <div className="text-center mb-8">
              <img src={logo} alt="RVTC" className="h-20 w-20 mx-auto mb-4 rounded-full" />
              <h1 className="text-2xl font-heading font-bold text-card-foreground">Student Login</h1>
              <p className="text-sm text-muted-foreground mt-1">Access your student portal</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Email Address</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-bold gap-2" size="lg">
                <LogIn size={18} /> Login
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/apply" className="text-primary font-semibold hover:underline">Apply Now</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
