
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="bg-novis-primary">
      <div className="max-w-7xl h-64 mx-auto py-14 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Prêt à rejoindre notre espace?</span>
          <span className="block text-white">
            Commencez dès aujourd'hui.
          </span>
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/spaces">
              <Button
                size="lg"
                className="bg-white text-novis-primary hover:bg-gray-50 hover:text-novis-primary w-full"
              >
                Réserver une visite
              </Button>
            </Link>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="bg-novis-primary text-white border-white hover:bg-novis-primary/90 w-full"
              >
                Voir nos tarifs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
