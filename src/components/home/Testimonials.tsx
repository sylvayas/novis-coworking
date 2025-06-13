
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      content:
        "NOVIS Coworking a transformé ma façon de travailler. L'ambiance est parfaite pour la productivité et j'ai pu développer mon réseau professionnel grâce aux événements organisés. Les équipements sont de qualité et le personnel est toujours disponible pour nous aider.",
      author: "Marie Dupont",
      role: "Freelance Designer UX/UI",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "En tant que startup en pleine croissance, nous avions besoin d'un espace flexible qui puisse évoluer avec nous. NOVIS nous a offert exactement cela, avec un excellent rapport qualité-prix et une localisation idéale au centre de Paris. Nous avons pu facilement passer de 2 à 8 personnes sans tracas.",
      author: "Thomas Martin",
      role: "CEO, TechStart Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "Les événements de networking organisés par NOVIS m'ont permis de rencontrer des partenaires clés pour mon entreprise. L'espace est magnifique, la connexion internet ultra-rapide et l'ambiance de travail est à la fois stimulante et conviviale. Un vrai hub d'innovation au cœur de Paris!",
      author: "Sophie Lefèvre",
      role: "Fondatrice, GreenTech Innovations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      content:
        "Je travaille chez NOVIS depuis plus d'un an maintenant et c'est le meilleur environnement de travail que j'ai connu. Les espaces sont bien conçus, l'équipe est attentionnée et la communauté est incroyablement diverse et enrichissante. Je recommande vivement!",
      author: "Alexandre Dubois",
      role: "Consultant Marketing Digital",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-novis-primary tracking-wide uppercase">
            Témoignages
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ce que disent nos membres
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Découvrez l'expérience de ceux qui ont choisi NOVIS Coworking pour leur espace
            de travail quotidien.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg h-full border-l-4 "
              >
                <div className="px-6 py-8 h-full flex flex-col">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 relative">
                        <Image
                          className="rounded-full"
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          sizes="48px"
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-novis-primary">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-grow">
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
