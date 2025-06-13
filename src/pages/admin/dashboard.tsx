import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Building, 
  TrendingUp,
  Clock,
  MapPin,
  Star
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  activeReservations: number;
  monthlyRevenue: number;
  occupancyRate: number;
  totalSpaces: number;
  pendingReservations: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeReservations: 0,
    monthlyRevenue: 0,
    occupancyRate: 0,
    totalSpaces: 0,
    pendingReservations: 0
  });

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem("adminAuth");
    if (!adminAuth) {
      router.push("/admin/login");
      return;
    }

    // Load mock dashboard data
    setStats({
      totalUsers: 156,
      activeReservations: 23,
      monthlyRevenue: 8150000,
      occupancyRate: 78,
      totalSpaces: 45,
      pendingReservations: 8
    });
  }, [router]);

  const statCards = [
    {
      title: "Utilisateurs Total",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Réservations Actives",
      value: stats.activeReservations,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Revenus Mensuels",
      value: `${stats.monthlyRevenue.toLocaleString()} CFA`,
      icon: DollarSign,
      color: "text-novis-primary",
      bgColor: "bg-orange-50"
    },
    {
      title: "Taux d'Occupation",
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Espaces Disponibles",
      value: stats.totalSpaces,
      icon: Building,
      color: "text-novis-accent",
      bgColor: "bg-teal-50"
    },
    {
      title: "Réservations en Attente",
      value: stats.pendingReservations,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "reservation",
      message: "Nouvelle réservation - Salle de réunion A",
      user: "Marie Dupont",
      time: "Il y a 5 minutes"
    },
    {
      id: 2,
      type: "user",
      message: "Nouvel utilisateur inscrit",
      user: "Thomas Martin",
      time: "Il y a 15 minutes"
    },
    {
      id: 3,
      type: "payment",
      message: "Paiement reçu - Abonnement mensuel",
      user: "Sophie Lefèvre",
      time: "Il y a 1 heure"
    },
    {
      id: 4,
      type: "cancellation",
      message: "Annulation de réservation",
      user: "Alexandre Dubois",
      time: "Il y a 2 heures"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre espace de coworking</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-novis-primary" />
                Activités Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-600">Par {activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-novis-primary" />
                Espaces Populaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Salle de réunion A</p>
                    <p className="text-sm text-gray-600">85% d'occupation</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Open Space Principal</p>
                    <p className="text-sm text-gray-600">72% d'occupation</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.6</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Bureau Privé 1</p>
                    <p className="text-sm text-gray-600">68% d'occupation</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
