
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: "event-1",
      title: "Atelier: Développer son réseau professionnel",
      date: "15 juin 2025",
      time: "18:30 - 20:30",
      location: "NOVIS Coworking - Espace Événementiel",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Un atelier pratique pour apprendre à développer et entretenir son réseau professionnel de manière efficace et authentique.",
      speaker: "Marie Laurent, Coach en développement professionnel",
      capacity: 30,
      price: "Gratuit pour les membres, 15€ pour les non-membres"
    },
    {
      id: "event-2",
      title: "Conférence: Financement des startups en 2025",
      date: "22 juin 2025",
      time: "19:00 - 21:00",
      location: "NOVIS Coworking - Espace Événementiel",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Découvrez les dernières tendances et opportunités de financement pour les startups avec des investisseurs et entrepreneurs expérimentés.",
      speaker: "Thomas Dubois, Partner chez Venture Capital Partners",
      capacity: 50,
      price: "Gratuit pour les membres, 20€ pour les non-membres"
    },
    {
      id: "event-3",
      title: "Petit-déjeuner networking",
      date: "30 juin 2025",
      time: "8:30 - 10:00",
      location: "NOVIS Coworking - Espace Café",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Rencontrez d'autres professionnels dans une ambiance détendue autour d'un petit-déjeuner convivial.",
      speaker: "Équipe NOVIS",
      capacity: 25,
      price: "Gratuit pour les membres, 10€ pour les non-membres"
    }
  ];

  const pastEvents = [
    {
      id: "past-1",
      title: "Workshop: Design Thinking",
      date: "5 mai 2025",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: "past-2",
      title: "Conférence: Intelligence Artificielle",
      date: "20 avril 2025",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: "past-3",
      title: "Afterwork: Entrepreneurs",
      date: "10 avril 2025",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: "past-4",
      title: "Formation: Marketing Digital",
      date: "28 mars 2025",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <Layout 
      title="Événements | NOVIS Coworking"
      description="Découvrez les prochains événements, ateliers et conférences organisés chez NOVIS Coworking."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Événements</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Rejoignez notre communauté
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Participez à nos événements pour développer vos compétences, élargir votre réseau et vous inspirer.
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Événements à venir</h2>
          <div className="space-y-12">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <div className="relative h-64 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                      Événement
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{event.title}</h3>
                    <p className="mt-3 text-gray-500">{event.description}</p>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-gray-500">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-gray-500">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-gray-500">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-gray-500">Capacité: {event.capacity} personnes</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700 font-medium">Intervenant: {event.speaker}</p>
                      <p className="text-gray-700">Prix: {event.price}</p>
                    </div>
                    <div className="mt-6">
                      <Button>
                        S'inscrire à l'événement
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Événements passés</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pastEvents.map((event) => (
              <div key={event.id} className=" overflow-hidden rounded-lg shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{event.date}</p>
                  <div className="mt-4">
                    <Link href={`/events/${event.id}`}>
                      <Button variant="outline" className="w-full">
                        Voir les photos
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Vous souhaitez organiser un événement?
          </h2>
          <p className="mt-4 text-lg text-white opacity-80">
            Nous mettons à disposition notre espace événementiel pour vos conférences, ateliers et séminaires.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100" size="lg">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
