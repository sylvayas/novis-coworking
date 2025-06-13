import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";

interface AdminReservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  spaceType: string;
  spaceSubType?: string;
  spaceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "cancelled";
  price: number;
  duration: number;
  durationType: "hourly" | "daily" | "weekly" | "monthly";
  createdAt: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " CFA";
  };

  useEffect(() => {
    const mockReservations: AdminReservation[] = [
      {
        id: "res-001",
        userId: "user-001",
        userName: "Marie Dubois",
        userEmail: "marie.dubois@email.com",
        spaceType: "Bureau Privé",
        spaceSubType: "Standard",
        spaceName: "Bureau Privé A1",
        date: "2025-06-15",
        startTime: "09:00",
        endTime: "18:00",
        status: "confirmed",
        price: 37500,
        duration: 1,
        durationType: "daily",
        createdAt: "2025-06-10"
      },
      {
        id: "res-002",
        userId: "user-002",
        userName: "Thomas Martin",
        userEmail: "thomas.martin@email.com",
        spaceType: "Salle de Réunion",
        spaceName: "Salle de Réunion B2",
        date: "2025-06-22",
        startTime: "14:00",
        endTime: "16:00",
        status: "pending",
        price: 25000,
        duration: 2,
        durationType: "hourly",
        createdAt: "2025-06-12"
      },
      {
        id: "res-003",
        userId: "user-003",
        userName: "Sophie Lefèvre",
        userEmail: "sophie.lefevre@email.com",
        spaceType: "Open Space",
        spaceName: "Open Space Principal",
        date: "2025-06-10",
        startTime: "10:00",
        endTime: "17:00",
        status: "confirmed",
        price: 105000,
        duration: 1,
        durationType: "weekly",
        createdAt: "2025-06-08"
      }
    ];
    setReservations(mockReservations);
  }, []);

  const handleStatusChange = (id: string, newStatus: "confirmed" | "cancelled") => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    ));
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.spaceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "today" && reservation.date === new Date().toISOString().split('T')[0]) ||
                       (dateFilter === "upcoming" && new Date(reservation.date) > new Date());
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Confirmée";
      case "pending": return "En attente";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  const totalRevenue = filteredReservations
    .filter(res => res.status === "confirmed")
    .reduce((sum, res) => sum + res.price, 0);

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Réservations</h2>
            <p className="text-muted-foreground">Gérez toutes les réservations d'espaces</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Réservations</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredReservations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredReservations.filter(r => r.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredReservations.filter(r => r.status === "confirmed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher par nom, email ou espace..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="confirmed">Confirmées</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="cancelled">Annulées</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="upcoming">À venir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reservations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Réservations</CardTitle>
            <CardDescription>
              Liste de toutes les réservations avec leurs détails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Espace</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reservation.userName}</div>
                        <div className="text-sm text-muted-foreground">{reservation.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reservation.spaceName}</div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.spaceType}
                          {reservation.spaceSubType && ` (${reservation.spaceSubType})`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(reservation.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.startTime} - {reservation.endTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(reservation.status)}>
                        {getStatusText(reservation.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{formatPrice(reservation.price)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {reservation.status === "pending" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(reservation.id, "confirmed")}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(reservation.id, "cancelled")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
