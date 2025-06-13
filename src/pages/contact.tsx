
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <Layout 
      title="Contact | NOVIS Coworking"
      description="Contactez-nous pour toute question concernant nos espaces de coworking, tarifs ou services. Notre équipe est à votre disposition."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Contact</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Nous contacter
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Sujet
                    </label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="subject"
                        id="subject"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full">
                      Envoyer
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>MACI SUARL, Abidjan Cocody, Saint Viateur, près du rond-point de la Y4</p>
                     
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>+225 01 70 80 13 02</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>infos@noviscoworking.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>Horaires d'ouverture</p>
                      <p>Lundi - Vendredi: 8h - 22h</p>
                      <p>Samedi - Dimanche: 9h - 18h</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">Comment nous trouver</h3>
                  <div className="mt-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2124502866587!2d2.3280459!3d48.8697631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3c844d5635%3A0x5636b8cc7de44b65!2s15%20Rue%20de%20la%20Paix%2C%2075002%20Paris!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-64"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Vous préférez nous rencontrer en personne?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Réservez une visite guidée de nos espaces et découvrez tout ce que NOVIS peut vous offrir.
            </p>
            <div className="mt-8">
              <Button size="lg">
                Réserver une visite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
