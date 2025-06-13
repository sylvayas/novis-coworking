import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  Building, 
  Mail, 
  Globe, 
  Shield, 
  Database,
  Palette,
  Bell,
  Users,
  CreditCard
} from "lucide-react";

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "NOVIS Coworking",
    siteDescription: "Espaces de travail collaboratifs modernes",
    contactEmail: "contact@novis.fr",
    supportEmail: "support@novis.fr",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Innovation, 75001 Paris",
    timezone: "Europe/Paris",
    language: "fr",
    currency: "EUR"
  });

  const [bookingSettings, setBookingSettings] = useState({
    minBookingDuration: 1,
    maxBookingDuration: 24,
    advanceBookingDays: 30,
    cancellationDeadline: 24,
    autoConfirmBookings: true,
    requirePaymentUpfront: false,
    allowRecurringBookings: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminNotifications: true,
    userWelcomeEmail: true,
    bookingConfirmationEmail: true,
    reminderEmails: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    bankTransferEnabled: true,
    taxRate: 20,
    currency: "EUR",
    refundPolicy: "7 days"
  });

  const handleSaveGeneral = () => {
    console.log("General settings saved:", generalSettings);
  };

  const handleSaveBooking = () => {
    console.log("Booking settings saved:", bookingSettings);
  };

  const handleSaveNotifications = () => {
    console.log("Notification settings saved:", notificationSettings);
  };

  const handleSaveSecurity = () => {
    console.log("Security settings saved:", securitySettings);
  };

  const handleSavePayment = () => {
    console.log("Payment settings saved:", paymentSettings);
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
            <p className="text-muted-foreground">Configurez votre plateforme de coworking</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="booking">Réservations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="payment">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Informations générales
                </CardTitle>
                <CardDescription>Configurez les informations de base de votre site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Nom du site</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="siteDescription">Description du site</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email de contact</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Email de support</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={generalSettings.phone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Textarea
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <Button onClick={handleSaveGeneral} className="bg-novis-primary hover:bg-novis-primary/90">
                  Sauvegarder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Paramètres de réservation
                </CardTitle>
                <CardDescription>Configurez les règles de réservation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minBookingDuration">Durée minimale (heures)</Label>
                    <Input
                      id="minBookingDuration"
                      type="number"
                      value={bookingSettings.minBookingDuration}
                      onChange={(e) => setBookingSettings(prev => ({ ...prev, minBookingDuration: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxBookingDuration">Durée maximale (heures)</Label>
                    <Input
                      id="maxBookingDuration"
                      type="number"
                      value={bookingSettings.maxBookingDuration}
                      onChange={(e) => setBookingSettings(prev => ({ ...prev, maxBookingDuration: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="advanceBookingDays">Réservation à l'avance (jours)</Label>
                    <Input
                      id="advanceBookingDays"
                      type="number"
                      value={bookingSettings.advanceBookingDays}
                      onChange={(e) => setBookingSettings(prev => ({ ...prev, advanceBookingDays: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cancellationDeadline">Délai d'annulation (heures)</Label>
                    <Input
                      id="cancellationDeadline"
                      type="number"
                      value={bookingSettings.cancellationDeadline}
                      onChange={(e) => setBookingSettings(prev => ({ ...prev, cancellationDeadline: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Confirmation automatique</Label>
                      <p className="text-sm text-muted-foreground">Les réservations sont confirmées automatiquement</p>
                    </div>
                    <Switch
                      checked={bookingSettings.autoConfirmBookings}
                      onCheckedChange={(checked) => setBookingSettings(prev => ({ ...prev, autoConfirmBookings: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Paiement à l'avance requis</Label>
                      <p className="text-sm text-muted-foreground">Exiger le paiement avant confirmation</p>
                    </div>
                    <Switch
                      checked={bookingSettings.requirePaymentUpfront}
                      onCheckedChange={(checked) => setBookingSettings(prev => ({ ...prev, requirePaymentUpfront: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Réservations récurrentes</Label>
                      <p className="text-sm text-muted-foreground">Permettre les réservations répétées</p>
                    </div>
                    <Switch
                      checked={bookingSettings.allowRecurringBookings}
                      onCheckedChange={(checked) => setBookingSettings(prev => ({ ...prev, allowRecurringBookings: checked }))}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveBooking} className="bg-novis-primary hover:bg-novis-primary/90">
                  Sauvegarder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Paramètres de notification
                </CardTitle>
                <CardDescription>Configurez les notifications système</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Activer les notifications par email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications SMS</Label>
                      <p className="text-sm text-muted-foreground">Activer les notifications par SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications push</Label>
                      <p className="text-sm text-muted-foreground">Activer les notifications push</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications admin</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les notifications administrateur</p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, adminNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email de bienvenue</Label>
                      <p className="text-sm text-muted-foreground">Envoyer un email aux nouveaux utilisateurs</p>
                    </div>
                    <Switch
                      checked={notificationSettings.userWelcomeEmail}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, userWelcomeEmail: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Confirmation de réservation</Label>
                      <p className="text-sm text-muted-foreground">Email de confirmation automatique</p>
                    </div>
                    <Switch
                      checked={notificationSettings.bookingConfirmationEmail}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, bookingConfirmationEmail: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emails de rappel</Label>
                      <p className="text-sm text-muted-foreground">Rappels avant les réservations</p>
                    </div>
                    <Switch
                      checked={notificationSettings.reminderEmails}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, reminderEmails: checked }))}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveNotifications} className="bg-novis-primary hover:bg-novis-primary/90">
                  Sauvegarder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de sécurité
                </CardTitle>
                <CardDescription>Configurez la sécurité de la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Vérification email obligatoire</Label>
                      <p className="text-sm text-muted-foreground">Les utilisateurs doivent vérifier leur email</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireEmailVerification}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">Activer 2FA pour tous les utilisateurs</p>
                    </div>
                    <Switch
                      checked={securitySettings.enableTwoFactor}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, enableTwoFactor: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mot de passe fort requis</Label>
                      <p className="text-sm text-muted-foreground">Exiger des mots de passe complexes</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireStrongPassword}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireStrongPassword: checked }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Expiration session (min)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">Tentatives de connexion max</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordMinLength">Longueur mot de passe min</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSecurity} className="bg-novis-primary hover:bg-novis-primary/90">
                  Sauvegarder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paramètres de paiement
                </CardTitle>
                <CardDescription>Configurez les méthodes de paiement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Stripe</Label>
                      <p className="text-sm text-muted-foreground">Paiements par carte bancaire</p>
                    </div>
                    <Switch
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, stripeEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>PayPal</Label>
                      <p className="text-sm text-muted-foreground">Paiements via PayPal</p>
                    </div>
                    <Switch
                      checked={paymentSettings.paypalEnabled}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, paypalEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Virement bancaire</Label>
                      <p className="text-sm text-muted-foreground">Paiements par virement</p>
                    </div>
                    <Switch
                      checked={paymentSettings.bankTransferEnabled}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({ ...prev, bankTransferEnabled: checked }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taxRate">Taux de TVA (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Devise</Label>
                    <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="refundPolicy">Politique de remboursement</Label>
                    <Select value={paymentSettings.refundPolicy} onValueChange={(value) => setPaymentSettings(prev => ({ ...prev, refundPolicy: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7 days">7 jours</SelectItem>
                        <SelectItem value="14 days">14 jours</SelectItem>
                        <SelectItem value="30 days">30 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleSavePayment} className="bg-novis-primary hover:bg-novis-primary/90">
                  Sauvegarder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}