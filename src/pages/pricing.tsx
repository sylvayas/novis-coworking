import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "25 000",
      period: "CFA/mois",
      description: "Parfait pour les freelances et entrepreneurs débutants",
      features: [
        "Accès aux espaces de coworking",
        "Wi-Fi haut débit",
        "Café et thé illimités",
        "Accès 24h/24, 7j/7",
        "1 heure de salle de réunion/mois"
      ],
      cta: "Réserver maintenant",
      href: "/auth/register",
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Standard",
      price: "45 000",
      period: "CFA/mois",
      description: "Idéal pour les petites équipes et startups",
      features: [
        "Tout du plan Basic",
        "Bureau dédié",
        "Adresse commerciale",
        "5 heures de salle de réunion/mois",
        "Accès aux événements networking",
        "Support prioritaire"
      ],
      cta: "Commencer l'essai gratuit",
      href: "/auth/register",
      popular: true,
      color: "border-novis-primary"
    },
    {
      name: "Premium",
      price: "75 000",
      period: "CFA/mois",
      description: "Pour les entreprises en croissance",
      features: [
        "Tout du plan Standard",
        "Bureau privé",
        "Salle de réunion illimitée",
        "Service de secrétariat",
        "Domiciliation d'entreprise",
        "Accès VIP aux événements",
        "Concierge business"
      ],
      cta: "Réserver votre bureau",
      href: "/auth/register",
      popular: false,
      color: "border-novis-secondary"
    }
  ];

  const additionalServices = [
    {
      name: "Salle de réunion",
      price: "18 750 CFA/heure",
      description: "Salles équipées pour 4 à 12 personnes"
    },
    {
      name: "Domiciliation d'entreprise",
      price: "46 875 CFA/mois",
      description: "Adresse professionnelle et gestion du courrier"
    },
    {
      name: "Événements",
      price: "Sur devis",
      description: "Location d'espace pour vos événements professionnels"
    },
    {
      name: "Impression",
      price: "62 CFA/page",
      description: "Service d'impression noir et blanc et couleur"
    }
  ];

  return (
    <Layout 
      title="Tarifs | NOVIS Coworking"
      description="Découvrez nos offres et tarifs pour les espaces de coworking, bureaux privés et services additionnels chez NOVIS."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Tarifs</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Des formules adaptées à vos besoins
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Choisissez la formule qui correspond le mieux à votre façon de travailler.
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-4">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`border rounded-lg shadow-sm divide-y divide-gray-200 ${
                  plan.popular ? 'border-primary' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary px-4 py-1 text-center text-sm font-semibold text-white rounded-t-lg">
                    Le plus populaire
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
                  <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-base font-medium text-gray-500"> {plan.period}</span>
                  </p>
                  <Link href={plan.href}>
                    <Button 
                      className={`mt-8 w-full ${
                        plan.popular ? '' : 'bg-white text-primary border-primary hover:bg-gray-50'
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">Ce qui est inclus</h3>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-3 text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Services additionnels</h2>
            <p className="mt-4 text-lg text-gray-500">
              Des services complémentaires pour répondre à tous vos besoins professionnels.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service) => (
              <div key={service.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{service.price}</p>
                  <p className="mt-4 text-sm text-gray-500">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Besoin d'une offre personnalisée?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Contactez-nous pour discuter de vos besoins spécifiques et obtenir une offre sur mesure.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button size="lg">
                Demander un devis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
