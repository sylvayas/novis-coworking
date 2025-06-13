import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Space {
  id: string;
  name: string;
  type: string;
  subType?: string;
  description: string;
  capacity: number;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  amenities: string[];
  isAvailable: boolean;
  location: string;
  imageUrl?: string;
  reservations: Array<{
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  }>;
}

interface ReservationData {
  spaceId: string;
  spaceType: string;
  spaceSubType?: string;
  spaceName: string;
  bookingType: "hourly" | "daily" | "weekly" | "monthly";
  selectedDates: Date[];
  startTime: string;
  endTime: string;
  totalPrice: number;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    notes?: string;
  };
}

export default function ReservationsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpaceType, setSelectedSpaceType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [bookingType, setBookingType] = useState<"hourly" | "daily" | "weekly" | "monthly">("daily");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });

  useEffect(() => {
    const mockSpaces: Space[] = [
      {
        id: "space-001",
        name: "Bureau Privé A1",
        type: "Bureau Privé",
        subType: "Standard",
        description: "Bureau privé moderne avec vue sur la ville, parfait pour le travail concentré.",
        capacity: 1,
        hourlyRate: 6000,
        dailyRate: 37500,
        weeklyRate: 225000,
        monthlyRate: 900000,
        amenities: ["Wifi", "Écran", "Café", "Climatisation"],
        isAvailable: true,
        location: "1er étage",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
        description: "Bureau privé haut de gamme avec équipements premium et services exclusifs.",
        capacity: 1,
        hourlyRate: 8000,
        dailyRate: 50000,
        weeklyRate: 300000,
        monthlyRate: 1200000,
        amenities: ["Wifi", "Écran", "Projecteur", "Café", "Climatisation"],
        isAvailable: true,
        location: "2ème étage",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        reservations: []
      },
      {
        id: "space-003",
        name: "Bureau Privé B1",
        type: "Bureau Privé",
        subType: "Exécutif",
        description: "Bureau exécutif spacieux avec vue panoramique et équipements de luxe.",
        capacity: 2,
        hourlyRate: 10000,
        dailyRate: 62500,
        weeklyRate: 375000,
        monthlyRate: 1500000,
        amenities: ["Wifi", "Écran", "Projecteur", "Tableau blanc", "Café", "Climatisation", "Casiers"],
        isAvailable: true,
        location: "3ème étage",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        reservations: []
      },
      {
        id: "space-004",
        name: "Salle de Réunion B2",
        type: "Salle de Réunion",
        description: "Salle de réunion équipée pour 8 personnes avec écran de présentation.",
        capacity: 8,
        hourlyRate: 12500,
        dailyRate: 75000,
        weeklyRate: 450000,
        monthlyRate: 1800000,
        amenities: ["Wifi", "Écran", "Projecteur", "Tableau blanc"],
        isAvailable: true,
        location: "2ème étage",
        imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        reservations: []
      },
      {
        id: "space-005",
        name: "Open Space Principal",
        type: "Open Space",
        description: "Grand espace de coworking ouvert avec ambiance collaborative.",
        capacity: 50,
        hourlyRate: 4000,
        dailyRate: 17500,
        weeklyRate: 105000,
        monthlyRate: 420000,
        amenities: ["Wifi", "Café", "Imprimante", "Casiers"],
        isAvailable: true,
        location: "Rez-de-chaussée",
        imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        reservations: []
      }
    ];
    setSpaces(mockSpaces);
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

    switch (bookingType) {
      case "hourly":
        const hours = calculateHours();
        return selectedSpace.hourlyRate * hours * selectedDates.length;
      case "daily":
        return selectedSpace.dailyRate * selectedDates.length;
      case "weekly":
        const weeks = Math.ceil(selectedDates.length / 7);
        return selectedSpace.weeklyRate * weeks;
      case "monthly":
        const months = Math.ceil(selectedDates.length / 30);
        return selectedSpace.monthlyRate * months;
      default:
        return 0;
    }
  };

  const calculateHours = () => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " CFA";
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSpaceSelect = (space: Space) => {
    setSelectedSpace(space);
    handleNextStep();
  };

  const handleSubmitReservation = () => {
    const reservationData: ReservationData = {
      spaceId: selectedSpace!.id,
      spaceType: selectedSpace!.type,
      spaceSubType: selectedSpace!.subType,
      spaceName: selectedSpace!.name,
      bookingType,
      selectedDates,
      startTime: bookingType === "hourly" ? startTime : "00:00",
      endTime: bookingType === "hourly" ? endTime : "23:59",
      totalPrice: calculatePrice(),
      customerInfo
    };

    console.log("Réservation soumise:", reservationData);
    alert("Votre réservation a été soumise avec succès ! Vous recevrez une confirmation par email.");
    
    // Reset form
    setCurrentStep(1);
    setSelectedSpace(null);
    setSelectedSpaceType("");
    setSelectedSubType("");
    setSelectedDates([]);
    setCustomerInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      notes: ""
    });
  };

  const steps = [
    { number: 1, title: "Choisir l'espace", description: "Sélectionnez le type d'espace souhaité" },
    { number: 2, title: "Dates et horaires", description: "Définissez votre période de réservation" },
    { number: 3, title: "Informations", description: "Renseignez vos coordonnées" },
    { number: 4, title: "Confirmation", description: "Vérifiez et confirmez votre réservation" }
  ];

  return (
    <Layout
      title="Réservation - NOVIS Coworking"
      description="Réservez votre espace de coworking en ligne facilement et rapidement"
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? "bg-novis-primary border-novis-primary text-white" 
                      : "border-gray-300 text-gray-500"
                  }`}>
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-medium">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-novis-primary" : "text-gray-500"
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                      currentStep > step.number ? "bg-novis-primary" : "bg-gray-300"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Space Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  {/* Espace spécifique - Ajouté en bas */}
                  {selectedSpaceType && (
                    <div>
                      <Label htmlFor="space">Espace</Label>
                      <Select value={selectedSpace?.id || ""} onValueChange={(value) => {
                        const space = getAvailableSpaces().find(s => s.id === value);
                        setSelectedSpace(space || null);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un espace spécifique" />
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
                  )}

                  {selectedSpaceType && getAvailableSpaces().length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getAvailableSpaces().map((space) => (
                        <Card key={space.id} className={`cursor-pointer hover:shadow-lg transition-shadow ${
                          selectedSpace?.id === space.id ? "ring-2 ring-novis-primary" : ""
                        }`}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{space.name}</CardTitle>
                                <CardDescription>{space.type}</CardDescription>
                              </div>
                              {space.subType && (
                                <Badge variant="secondary" className="text-xs">
                                  {space.subType}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{space.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="mr-2 h-4 w-4" />
                                Capacité: {space.capacity} personne{space.capacity > 1 ? 's' : ''}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                {space.location}
                              </div>
                              <div className="text-sm space-y-1">
                                <div><span className="font-medium">{formatPrice(space.hourlyRate)}/heure</span></div>
                                <div><span className="font-medium">{formatPrice(space.dailyRate)}/jour</span></div>
                                <div><span className="font-medium">{formatPrice(space.weeklyRate)}/semaine</span></div>
                                <div><span className="font-medium">{formatPrice(space.monthlyRate)}/mois</span></div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {space.amenities.slice(0, 3).map(amenity => (
                                  <Badge key={amenity} variant="outline" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                                {space.amenities.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{space.amenities.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full bg-novis-primary hover:bg-novis-primary/90"
                              onClick={() => handleSpaceSelect(space)}
                            >
                              Réserver cet espace
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}

                  {selectedSpaceType && getAvailableSpaces().length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Aucun espace disponible pour ce type et cette période.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Date and Time Selection */}
              {currentStep === 2 && selectedSpace && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">Espace sélectionné</h3>
                    <p className="text-blue-700">{selectedSpace.name} - {selectedSpace.type}</p>
                    {selectedSpace.subType && <p className="text-blue-600 text-sm">{selectedSpace.subType}</p>}
                  </div>

                  <div>
                    <Label>Durée de réservation</Label>
                    <Select value={bookingType} onValueChange={(value: any) => setBookingType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la durée" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">À l'heure</SelectItem>
                        <SelectItem value="daily">À la journée</SelectItem>
                        <SelectItem value="weekly">À la semaine</SelectItem>
                        <SelectItem value="monthly">Au mois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Période de réservation</Label>
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          {bookingType === "hourly" && "Sélectionnez les jours pour votre réservation horaire"}
                          {bookingType === "daily" && "Sélectionnez les jours à réserver"}
                          {bookingType === "weekly" && "Sélectionnez la période (minimum 7 jours)"}
                          {bookingType === "monthly" && "Sélectionnez la période (minimum 30 jours)"}
                        </p>
                      </div>
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => setSelectedDates(dates || [])}
                        className="rounded-md"
                        disabled={(date) => {
                          // Désactiver les dates passées
                          if (date < new Date()) return true;
                          
                          // Vérifier si l'espace est réservé à cette date
                          return isSpaceReserved(selectedSpace);
                        }}
                      />
                      {selectedDates.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 mb-2">
                            Période sélectionnée:
                          </div>
                          <div className="text-sm text-gray-600">
                            {selectedDates.length === 1 
                              ? `${selectedDates[0].toLocaleDateString('fr-FR')}`
                              : `Du ${selectedDates[0]?.toLocaleDateString('fr-FR')} au ${selectedDates[selectedDates.length - 1]?.toLocaleDateString('fr-FR')}`
                            }
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {selectedDates.length} jour(s) sélectionné(s)
                          </div>
                          {bookingType === "weekly" && selectedDates.length < 7 && (
                            <div className="text-sm text-amber-600 mt-1">
                              ⚠️ Minimum 7 jours requis pour une réservation hebdomadaire
                            </div>
                          )}
                          {bookingType === "monthly" && selectedDates.length < 30 && (
                            <div className="text-sm text-amber-600 mt-1">
                              ⚠️ Minimum 30 jours requis pour une réservation mensuelle
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

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

                  {selectedDates.length > 0 && (
                    <Card className="bg-gradient-to-r from-novis-primary/5 to-novis-secondary/5">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Type de réservation:</span>
                            <span className="text-sm">
                              {bookingType === "hourly" && "À l'heure"}
                              {bookingType === "daily" && "À la journée"}
                              {bookingType === "weekly" && "À la semaine"}
                              {bookingType === "monthly" && "Au mois"}
                            </span>
                          </div>
                          {bookingType === "hourly" && (
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Durée par jour:</span>
                              <span className="text-sm">{calculateHours()}h</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Nombre de jours:</span>
                            <span className="text-sm">{selectedDates.length}</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between items-center">
                            <span className="font-medium text-lg">Prix total:</span>
                            <span className="text-2xl font-bold text-novis-primary">
                              {formatPrice(calculatePrice())}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 3: Customer Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Entreprise (optionnel)</Label>
                    <Input
                      id="company"
                      value={customerInfo.company}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes ou demandes spéciales (optionnel)</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Indiquez ici toute demande particulière..."
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && selectedSpace && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-green-900 mb-4">Récapitulatif de votre réservation</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-700">Espace:</span>
                        <span className="font-medium">{selectedSpace.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Type:</span>
                        <span className="font-medium">{selectedSpace.type} {selectedSpace.subType && `(${selectedSpace.subType})`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Dates:</span>
                        <span className="font-medium">
                          {selectedDates.length === 1 
                            ? selectedDates[0].toLocaleDateString('fr-FR')
                            : `${selectedDates[0]?.toLocaleDateString('fr-FR')} - ${selectedDates[selectedDates.length - 1]?.toLocaleDateString('fr-FR')}`
                          }
                        </span>
                      </div>
                      {bookingType === "hourly" && (
                        <div className="flex justify-between">
                          <span className="text-green-700">Horaires:</span>
                          <span className="font-medium">{startTime} - {endTime}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-green-700">Type de réservation:</span>
                        <span className="font-medium">
                          {bookingType === "hourly" && "À l'heure"}
                          {bookingType === "daily" && "À la journée"}
                          {bookingType === "weekly" && "À la semaine"}
                          {bookingType === "monthly" && "Au mois"}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="text-green-700 font-medium">Prix total:</span>
                        <span className="text-xl font-bold text-green-900">{formatPrice(calculatePrice())}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-900 mb-4">Informations de contact</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Nom:</span> {customerInfo.firstName} {customerInfo.lastName}</p>
                      <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                      <p><span className="font-medium">Téléphone:</span> {customerInfo.phone}</p>
                      {customerInfo.company && <p><span className="font-medium">Entreprise:</span> {customerInfo.company}</p>}
                      {customerInfo.notes && <p><span className="font-medium">Notes:</span> {customerInfo.notes}</p>}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button 
                  onClick={handleNextStep}
                  className="bg-novis-primary hover:bg-novis-primary/90 ml-auto"
                  disabled={
                    (currentStep === 1 && !selectedSpace) ||
                    (currentStep === 2 && selectedDates.length === 0) ||
                    (currentStep === 3 && (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone))
                  }
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitReservation}
                  className="bg-green-600 hover:bg-green-700 ml-auto"
                >
                  Confirmer la réservation
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
}