import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  Search,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

interface Reservation {
  id: string;
  spaceType: string;
  spaceSubType?: string;
  spaceName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "cancelled";
  price: number;
  duration: number;
  durationType: "hourly" | "daily" | "weekly" | "monthly";
}

interface Space {
  id: string;
  name: string;
  type: string;
  subType?: string;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  isAvailable: boolean;
  reservations: Array<{
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  }>;
}

export default function DashboardReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookingType, setBookingType] = useState<"hourly" | "daily" | "weekly" | "monthly">("hourly");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedSpaceType, setSelectedSpaceType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    const mockSpaces: Space[] = [
      {
        id: "space-001",
        name: "Bureau Privé A1",
        type: "Bureau Privé",
        subType: "Standard",
        hourlyRate: 6000,
        dailyRate: 37500,
        weeklyRate: 225000,
        monthlyRate: 900000,
        isAvailable: true,
        reservations: [
          {
            startDate: "2025-06-20",
            endDate: "2025-06-20",
            startTime: "10:00",
            endTime: "14:00"
          }
        ]
      },
      {
        id: "space-002",
        name: "Bureau Privé A2",
        type: "Bureau Privé",
        subType: "Premium",
        hourlyRate: 8000,
        dailyRate: 50000,
        weeklyRate: 300000,
        monthlyRate: 1200000,
        isAvailable: true,
        reservations: []
      },
      {
        id: "space-003",
        name: "Bureau Privé B1",
        type: "Bureau Privé",
        subType: "Exécutif",
        hourlyRate: 10000,
        dailyRate: 62500,
        weeklyRate: 375000,
        monthlyRate: 1500000,
        isAvailable: true,
        reservations: []
      },
      {
        id: "space-004",
        name: "Salle de Réunion B2",
        type: "Salle de Réunion",
        hourlyRate: 12500,
        dailyRate: 75000,
        weeklyRate: 450000,
        monthlyRate: 1800000,
        isAvailable: true,
        reservations: []
      },
      {
        id: "space-005",
        name: "Open Space Principal",
        type: "Open Space",
        hourlyRate: 4000,
        dailyRate: 17500,
        weeklyRate: 105000,
        monthlyRate: 420000,
        isAvailable: true,
        reservations: []
      }
    ];

    const mockReservations: Reservation[] = [
      {
        id: "res-001",
        spaceType: "Bureau Privé",
        spaceSubType: "Standard",
        spaceName: "Bureau Privé A1",
        startDate: "2025-06-15",
        endDate: "2025-06-15",
        startTime: "09:00",
        endTime: "18:00",
        status: "confirmed",
        price: 37500,
        duration: 1,
        durationType: "daily"
      },
      {
        id: "res-002",
        spaceType: "Salle de Réunion",
        spaceName: "Salle de Réunion B2",
        startDate: "2025-06-22",
        endDate: "2025-06-22",
        startTime: "14:00",
        endTime: "16:00",
        status: "pending",
        price: 25000,
        duration: 2,
        durationType: "hourly"
      },
      {
        id: "res-003",
        spaceType: "Open Space",
        spaceName: "Open Space Principal",
        startDate: "2025-06-10",
        endDate: "2025-06-17",
        startTime: "10:00",
        endTime: "17:00",
        status: "confirmed",
        price: 105000,
        duration: 1,
        durationType: "weekly"
      }
    ];

    setSpaces(mockSpaces);
    setReservations(mockReservations);
  }, []);

  const spaceTypes = ["Bureau Privé", "Salle de Réunion", "Open Space", "Salle de Conférence"];
  const bureauSubTypes = ["Standard", "Premium", "Exécutif"];

  const getAvailableSpaces = () => {
    return spaces.filter(space => {
      if (!selectedSpaceType || space.type !== selectedSpaceType) return false;
      if (selectedSpaceType === "Bureau Privé" && selectedSubType && space.subType !== selectedSubType) return false;
      return space.isAvailable && !isSpaceReserved(space);
    });
  };

  const isSpaceReserved = (space: Space) => {
    if (selectedDates.length === 0) return false;
    
    const startDate = selectedDates[0];
    const endDate = selectedDates[selectedDates.length - 1] || startDate;
    
    return space.reservations.some(reservation => {
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);
      
      return (startDate <= resEnd && endDate >= resStart);
    });
  };

  const calculatePrice = () => {
    if (!selectedSpace || selectedDates.length === 0) return 0;
    
    const space = spaces.find(s => s.id === selectedSpace);
    if (!space) return 0;

    switch (bookingType) {
      case "hourly":
        const hours = calculateHours();
        return space.hourlyRate * hours * selectedDates.length;
      case "daily":
        return space.dailyRate * selectedDates.length;
      case "weekly":
        const weeks = Math.ceil(selectedDates.length / 7);
        return space.weeklyRate * weeks;
      case "monthly":
        const months = Math.ceil(selectedDates.length / 30);
        return space.monthlyRate * months;
      default:
        return 0;
    }
  };

  const calculateHours = () => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const handleCreateReservation = () => {
    if (!selectedSpace || selectedDates.length === 0) return;

    const space = spaces.find(s => s.id === selectedSpace);
    if (!space) return;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      spaceType: space.type,
      spaceSubType: space.subType,
      spaceName: space.name,
      startDate: selectedDates[0].toISOString().split('T')[0],
      endDate: (selectedDates[selectedDates.length - 1] || selectedDates[0]).toISOString().split('T')[0],
      startTime: bookingType === "hourly" ? startTime : "00:00",
      endTime: bookingType === "hourly" ? endTime : "23:59",
      status: "pending",
      price: calculatePrice(),
      duration: bookingType === "hourly" ? calculateHours() : selectedDates.length,
      durationType: bookingType
    };

    setReservations([...reservations, newReservation]);
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedDates([]);
    setSelectedSpace("");
    setSelectedSpaceType("");
    setSelectedSubType("");
    setStartTime("09:00");
    setEndTime("18:00");
    setBookingType("hourly");
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.spaceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.spaceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancelReservation = (id: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status: "cancelled" as const } : res
    ));
  };

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

  const getDurationText = (reservation: Reservation) => {
    switch (reservation.durationType) {
      case "hourly": return `${reservation.duration}h`;
      case "daily": return `${reservation.duration} jour(s)`;
      case "weekly": return `${reservation.duration} semaine(s)`;
      case "monthly": return `${reservation.duration} mois`;
      default: return "";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " CFA";
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes Réservations</h2>
            <p className="text-muted-foreground">Gérez vos réservations d'espaces de coworking</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-novis-primary hover:bg-novis-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Réservation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nouvelle Réservation</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* Type de réservation */}
                <div>
                  <Label>Type de réservation</Label>
                  <Select value={bookingType} onValueChange={(value: any) => setBookingType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">À l'heure</SelectItem>
                      <SelectItem value="daily">À la journée</SelectItem>
                      <SelectItem value="weekly">À la semaine</SelectItem>
                      <SelectItem value="monthly">Au mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sélection d'espace */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="space-type">Type d'espace</Label>
                    <Select value={selectedSpaceType} onValueChange={setSelectedSpaceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {spaceTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedSpaceType === "Bureau Privé" && (
                    <div>
                      <Label htmlFor="sub-type">Sous-type</Label>
                      <Select value={selectedSubType} onValueChange={setSelectedSubType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un sous-type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bureauSubTypes.map(subType => (
                            <SelectItem key={subType} value={subType}>{subType}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="space">Espace spécifique</Label>
                    <Select value={selectedSpace} onValueChange={setSelectedSpace}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un espace" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableSpaces().map(space => (
                          <SelectItem key={space.id} value={space.id}>
                            {space.name} {space.subType && `(${space.subType})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Calendrier pour sélection de dates */}
                <div>
                  <Label>Sélection des dates</Label>
                  <div className="border rounded-lg p-4">
                    <Calendar
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={(dates) => setSelectedDates(dates || [])}
                      className="rounded-md"
                      disabled={(date) => date < new Date()}
                    />
                    {selectedDates.length > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {selectedDates.length} jour(s) sélectionné(s)
                      </div>
                    )}
                  </div>
                </div>

                {/* Heures pour réservation horaire */}
                {bookingType === "hourly" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time">Heure de début</Label>
                      <Input 
                        type="time" 
                        id="start-time" 
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">Heure de fin</Label>
                      <Input 
                        type="time" 
                        id="end-time" 
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Récapitulatif du prix */}
                {selectedSpace && selectedDates.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Prix total:</span>
                        <span className="text-2xl font-bold text-novis-primary">
                          {formatPrice(calculatePrice())}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleCreateReservation}
                    className="bg-novis-primary hover:bg-novis-primary/90"
                    disabled={!selectedSpace || selectedDates.length === 0}
                  >
                    Réserver
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une réservation..."
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{reservation.spaceType}</CardTitle>
                    <CardDescription>
                      {reservation.spaceName}
                      {reservation.spaceSubType && ` (${reservation.spaceSubType})`}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(reservation.status)}>
                    {getStatusText(reservation.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {reservation.startDate === reservation.endDate 
                      ? new Date(reservation.startDate).toLocaleDateString('fr-FR')
                      : `${new Date(reservation.startDate).toLocaleDateString('fr-FR')} - ${new Date(reservation.endDate).toLocaleDateString('fr-FR')}`
                    }
                  </div>
                  {reservation.durationType === "hourly" && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {reservation.startTime} - {reservation.endTime} ({getDurationText(reservation)})
                    </div>
                  )}
                  {reservation.durationType !== "hourly" && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {getDurationText(reservation)}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {formatPrice(reservation.price)}
                  </div>
                  <p className="text-xs text-muted-foreground">Référence: {reservation.id}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Détails
                </Button>
                {reservation.status !== "cancelled" && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleCancelReservation(reservation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Aucune réservation trouvée</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Créer votre première réservation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}