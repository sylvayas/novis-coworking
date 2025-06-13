import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Search,
  Heart,
  Share2
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  isRegistered: boolean;
  isFavorite: boolean;
  organizer: string;
}

export default function DashboardEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: "event-001",
        title: "Atelier: Développer son réseau professionnel",
        description: "Un atelier pratique pour apprendre à développer et entretenir son réseau professionnel de manière efficace et authentique.",
        date: "2025-06-15",
        startTime: "18:30",
        endTime: "20:30",
        location: "Salle de Conférence A",
        category: "Networking",
        maxParticipants: 25,
        currentParticipants: 18,
        price: 0,
        isRegistered: true,
        isFavorite: false,
        organizer: "Marie Dubois"
      },
      {
        id: "event-002",
        title: "Conférence: L'avenir du travail hybride",
        description: "Une conférence sur les tendances du travail hybride et son impact sur les espaces de coworking.",
        date: "2025-06-20",
        startTime: "19:00",
        endTime: "21:00",
        location: "Auditorium Principal",
        category: "Conférence",
        maxParticipants: 50,
        currentParticipants: 32,
        price: 15,
        isRegistered: false,
        isFavorite: true,
        organizer: "Thomas Martin"
      },
      {
        id: "event-003",
        title: "Workshop: Productivité et gestion du temps",
        description: "Techniques et outils pour améliorer sa productivité et mieux gérer son temps au quotidien.",
        date: "2025-06-25",
        startTime: "14:00",
        endTime: "17:00",
        location: "Salle de Formation B",
        category: "Formation",
        maxParticipants: 15,
        currentParticipants: 12,
        price: 25,
        isRegistered: false,
        isFavorite: false,
        organizer: "Sophie Lefèvre"
      }
    ];
    setEvents(mockEvents);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " CFA";
  };

  const handleRegister = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isRegistered: !event.isRegistered,
            currentParticipants: event.isRegistered 
              ? event.currentParticipants - 1 
              : event.currentParticipants + 1
          }
        : event
    ));
  };

  const handleToggleFavorite = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, isFavorite: !event.isFavorite } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const registeredEvents = filteredEvents.filter(event => event.isRegistered);
  const favoriteEvents = filteredEvents.filter(event => event.isFavorite);

  const categories = ["Networking", "Conférence", "Formation", "Workshop", "Social"];

  const EventCard = ({ event }: { event: Event }) => (
    <Card key={event.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="mt-1">{event.organizer}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggleFavorite(event.id)}
              className={event.isFavorite ? "text-red-500" : "text-gray-400"}
            >
              <Heart className={`h-4 w-4 ${event.isFavorite ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          {event.category}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(event.date).toLocaleDateString('fr-FR')}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {event.startTime} - {event.endTime}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {event.currentParticipants}/{event.maxParticipants} participants
          </div>
        </div>
        {event.price > 0 && (
          <div className="mt-2">
            <Badge variant="secondary">{formatPrice(event.price)}</Badge>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${event.isRegistered 
            ? "bg-green-500 hover:bg-green-600" 
            : "bg-novis-primary hover:bg-novis-primary/90"
          }`}
          onClick={() => handleRegister(event.id)}
          disabled={!event.isRegistered && event.currentParticipants >= event.maxParticipants}
        >
          {event.isRegistered ? "Inscrit ✓" : "S'inscrire"}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Événements</h2>
            <p className="text-muted-foreground">Découvrez et participez aux événements de la communauté</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-novis-primary"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">À venir ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="registered">Mes inscriptions ({registeredEvents.length})</TabsTrigger>
            <TabsTrigger value="favorites">Favoris ({favoriteEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {upcomingEvents.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun événement à venir</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="registered" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {registeredEvents.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Vous n'êtes inscrit à aucun événement</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {favoriteEvents.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun événement en favori</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
