
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mock authentication - replace with real authentication later
    if (email === "admin@noviscoworking.com" && password === "admin123") {
      // Store admin session in localStorage (replace with proper auth later)
      localStorage.setItem("adminAuth", "true");
      localStorage.setItem("adminUser", JSON.stringify({
        id: "1",
        email: "admin@noviscoworking.com",
        name: "Administrateur NOVIS",
        role: "admin"
      }));
      router.push("/admin/dashboard");
    } else {
      setError("Email ou mot de passe incorrect");
    }
    
    setLoading(false);
  };

  return (
    <Layout
      title="Connexion Administrateur - NOVIS Coworking"
      description="Accès réservé aux administrateurs NOVIS Coworking"
    >
      <div className="min-h-screen bg-novis-neutral flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Lock className="mx-auto h-12 w-12 text-novis-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Administration NOVIS
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous pour accéder au panneau d'administration
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-novis-primary">
                Connexion Administrateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="email">Email administrateur</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@noviscoworking.com"
                      required
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-10"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-novis-primary hover:bg-novis-primary/90"
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Compte de démonstration :<br />
                  Email: admin@noviscoworking.com<br />
                  Mot de passe: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
