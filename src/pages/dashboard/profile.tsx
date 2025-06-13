import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Bell,
  Shield,
  CreditCard,
  Camera
} from "lucide-react";

export default function DashboardProfile() {
  const [profile, setProfile] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    company: "Tech Startup",
    position: "Développeur Full Stack",
    bio: "Passionné de technologie et d'innovation, je travaille sur des projets web modernes.",
    location: "Paris, France",
    website: "https://jeandupont.dev",
    linkedin: "linkedin.com/in/jeandupont",
    avatar: "/images/avatar.jpg"
  });

  const [notifications, setNotifications] = useState({
    emailReservations: true,
    emailEvents: true,
    emailMessages: false,
    pushReservations: true,
    pushEvents: false,
    pushMessages: true
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: "30"
  });

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profile);
  };

  const handleNotificationUpdate = () => {
    console.log("Notifications updated:", notifications);
  };

  const handleSecurityUpdate = () => {
    console.log("Security updated:", security);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Mon Profil</h2>
            <p className="text-muted-foreground">Gérez vos informations personnelles et préférences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Photo de profil</CardTitle>
                  <CardDescription>Votre photo apparaît dans vos réservations et messages</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-lg">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Changer la photo
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Mettez à jour vos informations de profil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Poste</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Site web</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                      />
                    </div>
                  </div>
                  <Button onClick={handleProfileUpdate} className="bg-novis-primary hover:bg-novis-primary/90">
                    Sauvegarder les modifications
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Notifications par email</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Réservations</span>
                      </div>
                      <Switch
                        checked={notifications.emailReservations}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailReservations: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Événements</span>
                      </div>
                      <Switch
                        checked={notifications.emailEvents}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailEvents: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Messages</span>
                      </div>
                      <Switch
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailMessages: checked }))}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">Notifications push</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Réservations</span>
                      </div>
                      <Switch
                        checked={notifications.pushReservations}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushReservations: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Événements</span>
                      </div>
                      <Switch
                        checked={notifications.pushEvents}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushEvents: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Messages</span>
                      </div>
                      <Switch
                        checked={notifications.pushMessages}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushMessages: checked }))}
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={handleNotificationUpdate} className="bg-novis-primary hover:bg-novis-primary/90">
                  Sauvegarder les préférences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>Gérez la sécurité de votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Authentification à deux facteurs</h4>
                      <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire</p>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactorEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Notifications de connexion</h4>
                      <p className="text-sm text-muted-foreground">Recevez un email lors de nouvelles connexions</p>
                    </div>
                    <Switch
                      checked={security.loginNotifications}
                      onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, loginNotifications: checked }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                      className="w-32"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Changer le mot de passe
                  </Button>
                  <Button onClick={handleSecurityUpdate} className="w-full bg-novis-primary hover:bg-novis-primary/90">
                    Sauvegarder les paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Abonnement actuel</CardTitle>
                  <CardDescription>Votre plan et utilisation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Plan actuel</span>
                    <Badge className="bg-novis-primary">Premium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Prix mensuel</span>
                    <span className="font-medium">30 625 CFA/mois</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Prochaine facturation</span>
                    <span>15 juillet 2025</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Changer de plan
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Méthode de paiement</CardTitle>
                  <CardDescription>Gérez vos moyens de paiement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CreditCard className="h-6 w-6" />
                    <div className="flex-1">
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expire 12/26</p>
                    </div>
                    <Badge variant="secondary">Défaut</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ajouter une carte
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historique de facturation</CardTitle>
                <CardDescription>Vos dernières factures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "15 juin 2025", amount: "30 625 CFA", status: "Payée" },
                    { date: "15 mai 2025", amount: "30 625 CFA", status: "Payée" },
                    { date: "15 avril 2025", amount: "30 625 CFA", status: "Payée" }
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">Abonnement Premium</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{invoice.amount}</p>
                        <Badge variant="secondary">{invoice.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
