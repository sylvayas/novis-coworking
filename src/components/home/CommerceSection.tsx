
import Image from "next/image";

export default function CommerceSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Commerce général"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-serif italic text-[#8B4513] mb-4">
              Notre pôle Commerce
            </h2>
            <p className="text-gray-700">
              offre une gamme complète de produits et services de qualité supérieure. 
              Nous sélectionnons rigoureusement nos partenaires et fournisseurs pour 
              garantir à notre clientèle des produits d'exception répondant aux plus 
              hautes exigences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
