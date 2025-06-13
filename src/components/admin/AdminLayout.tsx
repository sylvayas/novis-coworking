import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  FileText, 
  LogOut,
  Menu,
  X,
  Building,
  DollarSign,
  CalendarDays,
  BookOpen
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem("adminAuth");
    const adminUserData = localStorage.getItem("adminUser");
    
    if (!adminAuth || !adminUserData) {
      router.push("/admin/login");
      return;
    }

    setAdminUser(JSON.parse(adminUserData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const navigation = [
    {
      name: "Tableau de Bord",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      current: router.pathname === "/admin/dashboard"
    },
    {
      name: "Gestion des Réservations",
      href: "/admin/reservations",
      icon: Calendar,
      current: router.pathname === "/admin/reservations"
    },
    {
      name: "Gestion des Utilisateurs",
      href: "/admin/users",
      icon: Users,
      current: router.pathname === "/admin/users"
    },
    {
      name: "Gestion des Espaces",
      href: "/admin/spaces",
      icon: Building,
      current: router.pathname === "/admin/spaces"
    },
    {
      name: "Gestion des Tarifs",
      href: "/admin/pricing",
      icon: DollarSign,
      current: router.pathname === "/admin/pricing"
    },
    {
      name: "Gestion des Événements",
      href: "/admin/events",
      icon: CalendarDays,
      current: router.pathname === "/admin/events"
    },
    {
      name: "Gestion du Blog",
      href: "/admin/blog",
      icon: BookOpen,
      current: router.pathname === "/admin/blog"
    },
    {
      name: "Gestion du Contenu",
      href: "/admin/content",
      icon: FileText,
      current: router.pathname === "/admin/content"
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
      current: router.pathname === "/admin/settings"
    }
  ];

  if (!adminUser) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-novis-primary">NOVIS Admin</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    item.current
                      ? "bg-novis-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-novis-primary">NOVIS Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? "bg-novis-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{adminUser.name}</p>
                <p className="text-xs font-medium text-gray-500">{adminUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <div></div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
