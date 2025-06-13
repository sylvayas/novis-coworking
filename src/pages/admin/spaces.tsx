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
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Coffee
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
}

export default function AdminSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

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
        imageUrl: "/images/bureau-prive.jpg"
      },
      {
        id: "space-002",
        name: "Bureau Privé A2",
        type: "Bureau Privé",
        subType: "Premium",
        description: "Bureau privé haut de gamme avec équipements premium.",
        capacity: 1,
        hourlyRate: 8000,
        dailyRate: 50000,
        weeklyRate: 300000,
        monthlyRate: 1200000,
        amenities: ["Wifi", "Écran", "Projecteur", "Café", "Climatisation"],
        isAvailable: true,
        location: "2ème étage",
        imageUrl: "/images/bureau-premium.jpg"
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
        imageUrl: "/images/bureau-executif.jpg"
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
        imageUrl: "/images/salle-reunion.jpg"
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
        imageUrl: "/images/open-space.jpg"
      }
    ];
    setSpaces(mockSpaces);
  }, []);

  const handleSaveSpace = (spaceData: Partial<Space>) => {
    if (editingSpace) {
      setSpaces(spaces.map(space => 
        space.id === editingSpace.id ? { ...space, ...spaceData } : space
      ));
    } else {
      const newSpace: Space = {
        id: `space-${Date.now()}`,
        name: spaceData.name || "",
        type: spaceData.type || "",
        subType: spaceData.subType || "",
        description: spaceData.description || "",
        capacity: spaceData.capacity || 1,
        hourlyRate: spaceData.hourlyRate || 0,
        dailyRate: spaceData.dailyRate || 0,
        weeklyRate: spaceData.weeklyRate || 0,
        monthlyRate: spaceData.monthlyRate || 0,
        amenities: spaceData.amenities || [],
        isAvailable: spaceData.isAvailable ?? true,
        location: spaceData.location || "",
        imageUrl: spaceData.imageUrl
      };
      setSpaces([...spaces, newSpace]);
    }
    setIsDialogOpen(false);
    setEditingSpace(null);
  };

  const handleDeleteSpace = (id: string) => {
    setSpaces(spaces.filter(space => space.id !== id));
  };

  const handleToggleAvailability = (id: string) => {
    setSpaces(spaces.map(space => 
      space.id === id ? { ...space, isAvailable: !space.isAvailable } : space
    ));
  };

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || space.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const spaceTypes = ["Bureau Privé", "Salle de Réunion", "Open Space", "Salle de Conférence"];
  const bureauSubTypes = ["Standard", "Premium", "Exécutif"];
  const amenitiesList = ["Wifi", "Écran", "Projecteur", "Tableau blanc", "Café", "Imprimante", "Climatisation", "Casiers"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " CFA";
  };

  const SpaceForm = ({ space, onSave, onCancel }: { 
    space?: Space | null; 
    onSave: (data: Partial<Space>) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState({
      name: space?.name || "",
      type: space?.type || "",
      subType: space?.subType || "",
      description: space?.description || "",
      capacity: space?.capacity || 1,
      hourlyRate: space?.hourlyRate || 0,
      dailyRate: space?.dailyRate || 0,
      weeklyRate: space?.weeklyRate || 0,
      monthlyRate: space?.monthlyRate || 0,
      amenities: space?.amenities || [],
      isAvailable: space?.isAvailable ?? true,
      location: space?.location || "",
      imageUrl: space?.imageUrl || ""
    });

    const handleAmenityToggle = (amenity: string) => {
      setFormData(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nom de l'espace</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="type">Type d'espace</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
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
        </div>
        
        {formData.type === "Bureau Privé" && (
          <div>
            <Label htmlFor="subType">Sous-type de bureau</Label>
            <Select value={formData.subType} onValueChange={(value) => setFormData(prev => ({ ...prev, subType: value }))}>
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="capacity">Capacité</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 1 }))}
            />
          </div>
          <div>
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hourlyRate">Tarif horaire (CFA)</Label>
            <Input
              id="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <Label htmlFor="dailyRate">Tarif journalier (CFA)</Label>
            <Input
              id="dailyRate"
              type="number"
              value={formData.dailyRate}
              onChange={(e) => setFormData(prev => ({ ...prev, dailyRate: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weeklyRate">Tarif hebdomadaire (CFA)</Label>
            <Input
              id="weeklyRate"
              type="number"
              value={formData.weeklyRate}
              onChange={(e) => setFormData(prev => ({ ...prev, weeklyRate: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <Label htmlFor="monthlyRate">Tarif mensuel (CFA)</Label>
            <Input
              id="monthlyRate"
              type="number"
              value={formData.monthlyRate}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlyRate: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>
        <div>
          <Label>Équipements</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {amenitiesList.map(amenity => (
              <div key={amenity} className="flex items-center space-x-2">
                <Switch
                  checked={formData.amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <Label>{amenity}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isAvailable}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAvailable: checked }))}
          />
          <Label>Espace disponible</Label>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button onClick={() => onSave(formData)} className="bg-novis-primary hover:bg-novis-primary/90">
            {space ? "Modifier" : "Créer"}
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
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Espaces</h2>
            <p className="text-muted-foreground">Gérez tous les espaces de coworking</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-novis-primary hover:bg-novis-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Espace
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSpace ? "Modifier l'espace" : "Nouvel espace"}</DialogTitle>
              </DialogHeader>
              <SpaceForm
                space={editingSpace}
                onSave={handleSaveSpace}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingSpace(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Espaces</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{spaces.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {spaces.filter(s => s.isAvailable).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacité Totale</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {spaces.reduce((sum, space) => sum + space.capacity, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus/jour</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(spaces.reduce((sum, space) => sum + space.dailyRate, 0))}
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
              placeholder="Rechercher un espace..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {spaceTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <Card key={space.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{space.name}</CardTitle>
                    <CardDescription>{space.type}</CardDescription>
                  </div>
                  <Badge variant={space.isAvailable ? "default" : "secondary"}>
                    {space.isAvailable ? "Disponible" : "Indisponible"}
                  </Badge>
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
                  <div className="text-sm">
                    <span className="font-medium">{formatPrice(space.hourlyRate)}/h</span> - 
                    <span className="font-medium"> {formatPrice(space.dailyRate)}/jour</span>
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
                  {space.subType && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {space.subType}
                      </Badge>
                    </div>
                  )}
                </div>
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
                      setEditingSpace(space);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleAvailability(space.id)}
                    className={space.isAvailable ? "text-red-600" : "text-green-600"}
                  >
                    {space.isAvailable ? "Désactiver" : "Activer"}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteSpace(space.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredSpaces.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Aucun espace trouvé</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                Créer votre premier espace
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
