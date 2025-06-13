
import Image from "next/image";

export default function RealEstateSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Appartement de luxe"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-serif italic text-[#8B4513] mb-4">
              Le pôle immobilier
            </h2>
            <p className="text-gray-700">
              se concentre sur la location et la construction d'appartements de haut standing. 
              Chaque bien est sélectionné ou conçu avec une attention particulière portée aux 
              détails, à l'emplacement et aux finitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
