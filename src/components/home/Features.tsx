
import { 
  Calendar, 
  Users, 
  Coffee, 
  Wifi, 
  Map, 
  Clock,
  FileText,
  Printer,
  Zap,
  Lock,
  Headphones,
  Shield
} from "lucide-react";

export default function Features() {
  const features = [
    {
      name: "Espaces flexibles",
      description:
        "Des espaces adaptés à tous vos besoins : postes en open space, bureaux privés, salles de réunion et espaces événementiels.",
      icon: Map,
    },
    {
      name: "Réservation simple",
      description:
        "Réservez votre espace en quelques clics via notre plateforme en ligne, pour une heure, une journée ou un abonnement mensuel.",
      icon: Calendar,
    },
    {
      name: "Communauté dynamique",
      description:
        "Rejoignez une communauté de professionnels, entrepreneurs et créatifs et participez à nos événements de networking.",
      icon: Users,
    },
    {
      name: "Internet ultra-rapide",
      description:
        "Connexion fibre optique sécurisée avec WiFi haut débit et prises Ethernet à chaque poste de travail.",
      icon: Wifi,
    },
    {
      name: "Accès 24/7",
      description:
        "Accédez à votre espace de travail quand vous le souhaitez, 7j/7 et 24h/24 avec notre système de badge sécurisé.",
      icon: Clock,
    },
    {
      name: "Cuisine équipée",
      description:
        "Profitez de notre espace cuisine avec café, thé et rafraîchissements offerts pour rester productif toute la journée.",
      icon: Coffee,
    },
    {
      name: "Impression et scan",
      description:
        "Service d'impression, de numérisation et de photocopie disponible pour tous nos membres.",
      icon: Printer,
    },
    {
      name: "Salles de réunion",
      description:
        "Réservez nos salles de réunion entièrement équipées (écran, vidéoprojecteur, tableau blanc) à l'heure ou à la journée.",
      icon: Shield,
    },
    {
      name: "Espaces de détente",
      description:
        "Zones de détente confortables pour faire une pause, socialiser ou tenir des réunions informelles.",
      icon: Headphones,
    },
    {
      name: "Domiciliation d'entreprise",
      description:
        "Utilisez notre adresse prestigieuse pour votre entreprise et bénéficiez de notre service de gestion du courrier.",
      icon: FileText,
    },
    {
      name: "Sécurité 24/7",
      description:
        "Système de sécurité avec vidéosurveillance et accès contrôlé pour protéger vos équipements et données.",
      icon: Lock,
    },
    {
      name: "Événements professionnels",
      description:
        "Participez à nos ateliers, conférences et événements de networking pour développer vos compétences et votre réseau.",
      icon: Zap,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-novis-primary font-semibold tracking-wide uppercase">
            Nos Services
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Un espace de travail complet et moderne
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Découvrez tous les avantages et services que NOVIS Coworking vous offre pour travailler
            dans les meilleures conditions et développer votre activité.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-novis-neutral rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-novis-primary rounded-md shadow-lg">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
