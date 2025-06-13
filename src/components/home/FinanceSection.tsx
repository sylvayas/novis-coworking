
import Image from "next/image";

export default function FinanceSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-serif italic text-[#8B4513] mb-4">
              Dans le domaine Financier,
            </h2>
            <p className="text-gray-700">
              nous accompagnons particuliers et entreprises dans la gestion et la valorisation 
              de leur patrimoine, en leur proposant des solutions sur mesure, pensées pour produire 
              des résultats concrets, sécurisés et durables.
            </p>
          </div>
          <div className="order-1 md:order-2 relative h-64 md:h-80">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Professionnel dans le domaine financier"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
