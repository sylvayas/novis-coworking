import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin
} from "lucide-react";

interface AdminEvent {
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
  isPublished: boolean;
  organizer: string;
  createdAt: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " CFA";
  };

  useEffect(() => {
    const mockEvents: AdminEvent[] = [
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
        isPublished: true,
        organizer: "Marie Dubois",
        createdAt: "2025-06-10"
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
        price: 7500,
        isPublished: true,
        organizer: "Thomas Martin",
        createdAt: "2025-06-12"
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
        price: 12500,
        isPublished: false,
        organizer: "Sophie Lefèvre",
        createdAt: "2025-06-11"
      }
    ];
    setEvents(mockEvents);
  }, []);

  const handleSaveEvent = (eventData: Partial<AdminEvent>) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id ? { ...event, ...eventData } : event
      ));
    } else {
      const newEvent: AdminEvent = {
        id: `event-${Date.now()}`,
        title: eventData.title || "",
        description: eventData.description || "",
        date: eventData.date || "",
        startTime: eventData.startTime || "",
        endTime: eventData.endTime || "",
        location: eventData.location || "",
        category: eventData.category || "",
        maxParticipants: eventData.maxParticipants || 10,
        currentParticipants: 0,
        price: eventData.price || 0,
        isPublished: eventData.isPublished ?? false,
        organizer: eventData.organizer || "",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setEvents([...events, newEvent]);
    }
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleTogglePublish = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, isPublished: !event.isPublished } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["Networking", "Conférence", "Formation", "Workshop", "Social"];

  const EventForm = ({ event, onSave, onCancel }: { 
    event?: AdminEvent | null; 
    onSave: (data: Partial<AdminEvent>) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      title: event?.title || "",
      description: event?.description || "",
      date: event?.date || "",
      startTime: event?.startTime || "",
      endTime: event?.endTime || "",
      location: event?.location || "",
      category: event?.category || "",
      maxParticipants: event?.maxParticipants || 10,
      price: event?.price || 0,
      isPublished: event?.isPublished ?? false,
      organizer: event?.organizer || ""
    });

    return (
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="title">Titre de l'événement</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="organizer">Organisateur</Label>
            <Input
              id="organizer"
              value={formData.organizer}
              onChange={(e) => setFormData(prev => ({ ...prev, organizer: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime">Heure de début</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="endTime">Heure de fin</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="location">Lieu</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxParticipants">Nombre max de participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 10 }))}
            />
          </div>
          <div>
            <Label htmlFor="price">Prix (CFA)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isPublished}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublished: checked }))}
          />
          <Label>Publier l'événement</Label>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button onClick={() => onSave(formData)} className="bg-novis-primary hover:bg-novis-primary/90">
            {event ? "Modifier" : "Créer"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Événements</h2>
            <p className="text-muted-foreground">Gérez tous les événements de la communauté</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-novis-primary hover:bg-novis-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Événement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Modifier l'événement" : "Nouvel événement"}</DialogTitle>
              </DialogHeader>
              <EventForm
                event={editingEvent}
                onSave={handleSaveEvent}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingEvent(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Événements</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publiés</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.filter(e => e.isPublished).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.reduce((sum, event) => sum + event.currentParticipants, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(events.reduce((sum, event) => sum + (event.price * event.currentParticipants), 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
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
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="mt-1">{event.organizer}</CardDescription>
                  </div>
                  <Badge variant={event.isPublished ? "default" : "secondary"}>
                    {event.isPublished ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
                <Badge variant="outline" className="w-fit">
                  {event.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
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
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Détails
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEditingEvent(event);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTogglePublish(event.id)}
                    className={event.isPublished ? "text-red-600" : "text-green-600"}
                  >
                    {event.isPublished ? "Dépublier" : "Publier"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Aucun événement trouvé</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Créer votre premier événement
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
