
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const team = [
    {
      name: "Sophie Martin",
      role: "Fondatrice & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      bio: "Ancienne consultante en management, Sophie a fondé NOVIS en 2020 avec la vision de créer des espaces de travail qui favorisent la créativité et la collaboration."
    },
    {
      name: "Thomas Dubois",
      role: "Directeur des Opérations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      bio: "Avec plus de 10 ans d'expérience dans l'hôtellerie de luxe, Thomas veille à ce que l'expérience client chez NOVIS soit toujours exceptionnelle."
    },
    {
      name: "Julie Lefèvre",
      role: "Responsable Communauté",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      bio: "Julie anime la communauté NOVIS en organisant des événements et en facilitant les connexions entre les membres."
    },
    {
      name: "Alexandre Chen",
      role: "Directeur Technique",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      bio: "Alexandre s'assure que toutes les technologies et infrastructures de NOVIS fonctionnent parfaitement pour offrir la meilleure expérience possible."
    }
  ];

  const values = [
    {
      title: "Communauté",
      description: "Nous croyons en la puissance des connexions humaines et nous nous efforçons de créer une communauté dynamique où les idées et les opportunités peuvent s'épanouir."
    },
    {
      title: "Innovation",
      description: "Nous sommes constamment à la recherche de nouvelles façons d'améliorer nos espaces et services pour répondre aux besoins évolutifs de nos membres."
    },
    {
      title: "Bien-être",
      description: "Nous concevons nos espaces pour favoriser le bien-être physique et mental, car nous croyons que le meilleur travail émerge lorsque les gens se sentent bien."
    },
    {
      title: "Durabilité",
      description: "Nous nous engageons à minimiser notre impact environnemental et à promouvoir des pratiques durables dans tous les aspects de notre activité."
    }
  ];

  return (
    <Layout 
      title="À propos | NOVIS Coworking"
      description="Découvrez l'histoire, les valeurs et l'équipe derrière NOVIS Coworking, votre espace de travail moderne au cœur de Paris."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">À propos</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Notre histoire
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Une nouvelle vision du travail
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                NOVIS est né en 2020 d'une vision simple : créer des espaces de travail où les professionnels peuvent s'épanouir, collaborer et développer leurs projets dans un environnement inspirant.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Fondé par Sophie Martin, ancienne consultante en management, NOVIS a commencé avec un petit espace dans le 2ème arrondissement de Paris. Aujourd'hui, nous avons grandi pour devenir l'un des espaces de coworking les plus prisés de la capitale.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Notre mission est de créer des environnements de travail qui favorisent la créativité, la productivité et le bien-être, tout en construisant une communauté dynamique de professionnels partageant les mêmes valeurs.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="NOVIS Coworking space"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Nos valeurs</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Ces principes guident toutes nos décisions et actions.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="mt-4 text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Notre équipe</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Des professionnels passionnés qui travaillent chaque jour pour vous offrir la meilleure expérience.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                  <p className="mt-4 text-gray-500">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Rejoignez notre communauté
          </h2>
          <p className="mt-4 text-lg text-white opacity-80">
            Découvrez par vous-même ce qui rend NOVIS si spécial. Réservez une visite de nos espaces.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100" size="lg">
                Réserver une visite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
