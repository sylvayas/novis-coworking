
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-novis-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <div className="relative w-44 h-12">
                <Image
                  src="/logo-1.png"
                  alt="NOVIS Coworking"
                  fill
                  sizes="144px"
                  className="object-contain "
                />
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              NOVIS Coworking offre des espaces de travail collaboratifs modernes et inspirants au cœur de Paris.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-novis-accent mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/spaces" className="text-gray-300 hover:text-novis-accent transition-colors">
                  Espaces de Coworking
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-novis-accent transition-colors">
                  Bureaux Privés
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-novis-accent transition-colors">
                  Salles de Réunion
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-novis-accent transition-colors">
                  Événements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-novis-accent mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-novis-accent transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-novis-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-novis-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-novis-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-novis-accent mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin className="h-10 w-10 mr-2 text-novis-accent" />
                <span>MACI SUARL, Abidjan Cocody, Saint Viateur, près du rond-point de la Y4</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-6 w-6 mr-2 text-novis-accent" />
                <span>CI-ABJ-03-2022-B13-04387 / N° CC : 2242023T</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-novis-accent" />
                <span>info@noviscoworking.com</span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-novis-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-novis-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-novis-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-novis-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Novis Coworking. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
