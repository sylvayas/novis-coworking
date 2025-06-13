
import Image from "next/image";

export default function TransportSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-serif italic text-[#8B4513] mb-4">
              Le secteur Transport
            </h2>
            <p className="text-gray-700">
              propose des solutions logistiques adaptées aux besoins spécifiques de nos clients. 
              Notre flotte moderne et nos équipes expérimentées garantissent un service fiable 
              et ponctuel pour tous vos besoins de transport et de livraison.
            </p>
          </div>
          <div className="order-1 md:order-2 relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Transport et logistique"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
