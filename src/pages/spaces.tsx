import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function SpacesPage() {
  const spaces = [
    {
      id: "open-space",
      name: "Open Space",
      description: "Espace de travail partagé idéal pour les freelances et les entrepreneurs individuels.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      features: [
        "Accès 24/7",
        "Internet haut débit",
        "Café et thé à volonté",
        "Espaces de détente",
        "Événements communautaires"
      ],
      price: "À partir de 25€/jour"
    },
    {
      id: "private-office",
      name: "Bureau Privé",
      description: "Bureaux fermés pour les équipes de 1 à 10 personnes avec tous les services inclus.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      features: [
        "Bureau dédié et fermé",
        "Accès 24/7",
        "Salle de réunion (4h/mois incluses)",
        "Casier personnel",
        "Adresse professionnelle"
      ]
    },
    {
      id: "meeting-room",
      name: "Salle de Réunion",
      description: "Salles équipées pour vos réunions, formations et événements professionnels.",
      image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      features: [
        "Capacité de 4 à 20 personnes",
        "Équipement audiovisuel",
        "Tableau blanc interactif",
        "Café et eau inclus",
        "Configuration personnalisable"
      ],
      price: "À partir de 30€/heure"
    },
    {
      id: "event-space",
      name: "Espace Événementiel",
      description: "Grand espace modulable pour vos conférences, ateliers et événements d'entreprise.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      features: [
        "Capacité jusqu'à 100 personnes",
        "Système son et vidéo",
        "Espace traiteur",
        "Assistance technique",
        "Configuration sur mesure"
      ],
      price: "Sur devis"
    }
  ];

  return (
    <Layout 
      title="Nos Espaces de Coworking | NOVIS"
      description="Découvrez nos différents espaces de coworking à Paris: open space, bureaux privés, salles de réunion et espaces événementiels."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Nos Espaces</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Des espaces adaptés à tous vos besoins
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Que vous soyez freelance, startup ou entreprise établie, nous avons l'espace qui vous convient.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="space-y-16">
            {spaces.map((space, index) => (
              <div 
                key={space.id}
                className={`flex flex-col lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                } gap-8 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden rounded-lg">
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-900">{space.name}</h2>
                  <p className="mt-4 text-lg text-gray-500">{space.description}</p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Caractéristiques:</h3>
                    <ul className="mt-2 space-y-2">
                      {space.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="ml-2 text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {space.price && (
                    <div className="mt-6 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{space.price}</span>
                    </div>
                  )}
                  <div className="mt-6">
                    <Link href={space.id === "private-office" ? "/categories" : "/pricing"}>
                      <Button size="lg" className="hover:bg-orange-500 text-white">
                        {space.id === "private-office" ? "Nos différents espaces" : "Voir les tarifs détaillés"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Vous avez des questions sur nos espaces?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Notre équipe est à votre disposition pour vous aider à trouver l'espace qui correspond le mieux à vos besoins.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button size="lg">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}