
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for gallery
  const galleryItems = [
    {
      id: "img-1",
      type: "image",
      category: "spaces",
      title: "Espace Open Space",
      description: "Notre espace de coworking principal avec des postes de travail modernes",
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "Janvier 2025"
    },
    {
      id: "img-2",
      type: "image",
      category: "spaces",
      title: "Bureaux Privés",
      description: "Bureaux fermés pour les équipes et les entrepreneurs",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "Janvier 2025"
    },
    {
      id: "img-3",
      type: "image",
      category: "spaces",
      title: "Salle de Réunion",
      description: "Salle de réunion équipée pour vos rendez-vous professionnels",
      src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "Février 2025"
    },
    {
      id: "img-4",
      type: "image",
      category: "events",
      title: "Atelier Design Thinking",
      description: "Retour sur notre atelier de Design Thinking du mois dernier",
      src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "Mars 2025"
    },
    {
      id: "img-5",
      type: "image",
      category: "events",
      title: "Conférence IA",
      description: "Conférence sur l'intelligence artificielle et ses applications",
      src: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "Avril 2025"
    },
    {
      id: "img-6",
      type: "image",
      category: "events",
      title: "Afterwork Entrepreneurs",
      description: "Networking entre entrepreneurs dans notre espace",
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "Avril 2025"
    },
    {
      id: "vid-1",
      type: "video",
      category: "spaces",
      title: "Visite virtuelle",
      description: "Découvrez nos espaces en vidéo",
      src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      videoUrl: "#",
      date: "Mai 2025"
    },
    {
      id: "vid-2",
      type: "video",
      category: "events",
      title: "Résumé des événements 2024",
      description: "Retour sur les moments forts de l'année dernière",
      src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      videoUrl: "#",
      date: "Janvier 2025"
    }
  ];

  const filteredItems = activeTab === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab || item.type === activeTab);

  return (
    <Layout 
      title="Galerie | NOVIS Coworking"
      description="Découvrez notre espace de coworking en images et vidéos. Visitez virtuellement nos bureaux, salles de réunion et événements."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Galerie</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Découvrez nos espaces en images
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Explorez notre espace de coworking, nos événements et notre communauté à travers notre galerie de photos et vidéos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">Tout</TabsTrigger>
                <TabsTrigger value="spaces">Espaces</TabsTrigger>
                <TabsTrigger value="events">Événements</TabsTrigger>
                <TabsTrigger value="video">Vidéos</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-40 rounded-full p-4">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-400">{item.date}</span>
                        <Button variant="ghost" size="sm">
                          {item.type === "video" ? "Regarder" : "Agrandir"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Vous souhaitez visiter nos espaces?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Réservez une visite guidée et découvrez nos espaces de coworking en personne.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button size="lg">
                Réserver une visite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
