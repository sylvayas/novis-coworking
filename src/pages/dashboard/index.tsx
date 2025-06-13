
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bell, Calendar as CalendarIcon, CreditCard, Download, FileText, Home, MessageSquare, Plus, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data
  const upcomingReservations = [
    {
      id: "res-001",
      type: "Bureau Privé",
      date: "15 juin 2025",
      time: "09:00 - 18:00",
      status: "confirmed"
    },
    {
      id: "res-002",
      type: "Salle de Réunion",
      date: "22 juin 2025",
      time: "14:00 - 16:00",
      status: "pending"
    }
  ];
  
  const upcomingEvents = [
    {
      id: "event-001",
      title: "Atelier: Développer son réseau professionnel",
      date: "15 juin 2025",
      time: "18:30 - 20:30"
    }
  ];
  
  const notifications = [
    {
      id: "notif-001",
      title: "Réservation confirmée",
      message: "Votre réservation pour le 15 juin a été confirmée.",
      time: "Il y a 2 heures",
      read: false
    },
    {
      id: "notif-002",
      title: "Nouvel événement",
      message: "Un nouvel atelier a été ajouté: Développer son réseau professionnel",
      time: "Il y a 1 jour",
      read: true
    }
  ];

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle réservation
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Réservations totales</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heures réservées</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">54h</div>
                  <p className="text-xs text-muted-foreground">+12h depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 depuis le mois dernier</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Factures en attente</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Montant total: 120€</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Réservations à venir</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingReservations.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingReservations.map((reservation) => (
                        <div key={reservation.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="font-medium">{reservation.type}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {reservation.date} • {reservation.time}
                            </div>
                          </div>
                          <Badge variant={reservation.status === "confirmed" ? "default" : "outline"}>
                            {reservation.status === "confirmed" ? "Confirmée" : "En attente"}
                          </Badge>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Link href="/dashboard/reservations">Voir toutes les réservations</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground mb-4">Aucune réservation à venir</p>
                      <Button>
                        <Link href="/reservations">Réserver un espace</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Calendrier</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Événements à venir</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {event.date} • {event.time}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            S'inscrire
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Link href="/events">Voir tous les événements</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">Aucun événement à venir</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`flex items-start space-x-4 ${notification.read ? '' : 'bg-secondary/50 p-2 rounded-md'}`}>
                        <Bell className={`h-5 w-5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Voir toutes les notifications</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes réservations</CardTitle>
                <CardDescription>
                  Gérez vos réservations passées et à venir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingReservations.map((reservation) => (
                      <Card key={reservation.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{reservation.type}</CardTitle>
                          <CardDescription>
                            {reservation.date} • {reservation.time}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Badge variant={reservation.status === "confirmed" ? "default" : "outline"} className="mb-2">
                            {reservation.status === "confirmed" ? "Confirmée" : "En attente"}
                          </Badge>
                          <p className="text-sm text-muted-foreground">Référence: {reservation.id}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">Modifier</Button>
                          <Button variant="destructive" size="sm">Annuler</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link href="/reservations">Nouvelle réservation</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Événements</CardTitle>
                <CardDescription>
                  Découvrez et inscrivez-vous aux événements à venir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>
                          {event.date} • {event.time}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Un atelier pratique pour apprendre à développer et entretenir son réseau professionnel de manière efficace et authentique.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">S'inscrire</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Link href="/events">Voir tous les événements</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes factures</CardTitle>
                <CardDescription>
                  Consultez et téléchargez vos factures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="grid grid-cols-4 items-center gap-4 font-medium">
                        <div>Référence</div>
                        <div>Date</div>
                        <div>Montant</div>
                        <div className="text-right">Actions</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-4 items-center gap-4 p-4">
                        <div>FACT-2025-001</div>
                        <div>10/05/2025</div>
                        <div>75,00 €</div>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4 p-4">
                        <div>FACT-2025-002</div>
                        <div>05/05/2025</div>
                        <div>45,00 €</div>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
