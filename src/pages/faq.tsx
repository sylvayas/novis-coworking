
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    { id: "general", name: "Général" },
    { id: "reservations", name: "Réservations" },
    { id: "pricing", name: "Tarifs" },
    { id: "services", name: "Services" },
    { id: "membership", name: "Abonnements" }
  ];

  const faqItems = [
    {
      id: "faq-1",
      category: "general",
      question: "Quels sont les horaires d'ouverture de NOVIS Coworking?",
      answer: "NOVIS Coworking est ouvert du lundi au vendredi de 8h à 22h, et le weekend (samedi et dimanche) de 9h à 18h. Les membres avec un abonnement incluant l'accès 24/7 peuvent accéder à nos locaux à tout moment grâce à leur badge."
    },
    {
      id: "faq-2",
      category: "general",
      question: "Est-ce que je peux recevoir du courrier à l'adresse de NOVIS?",
      answer: "Oui, nous proposons un service de domiciliation d'entreprise qui vous permet de recevoir votre courrier à notre adresse. Ce service est inclus dans certains abonnements ou peut être souscrit séparément. Contactez-nous pour plus d'informations."
    },
    {
      id: "faq-3",
      category: "reservations",
      question: "Comment puis-je réserver un espace de travail?",
      answer: "Vous pouvez réserver un espace de travail directement sur notre site web dans la section 'Réservations', par téléphone au +33 1 42 56 78 90, ou en vous rendant sur place. Les réservations peuvent être effectuées à l'heure, à la journée ou au mois selon vos besoins."
    },
    {
      id: "faq-4",
      category: "reservations",
      question: "Puis-je annuler ou modifier ma réservation?",
      answer: "Oui, vous pouvez annuler ou modifier votre réservation jusqu'à 24 heures avant l'heure prévue sans frais. Pour les annulations tardives (moins de 24 heures avant), des frais équivalents à 50% du montant de la réservation seront appliqués."
    },
    {
      id: "faq-5",
      category: "pricing",
      question: "Quels sont les tarifs pour un bureau privé?",
      answer: "Les tarifs pour un bureau privé commencent à 450€/mois pour un bureau individuel et varient en fonction de la taille et du nombre de postes. Nous proposons également des formules à la journée à partir de 80€. Consultez notre page Tarifs pour plus de détails ou contactez-nous pour une offre personnalisée."
    },
    {
      id: "faq-6",
      category: "pricing",
      question: "Y a-t-il des réductions pour les engagements longue durée?",
      answer: "Oui, nous proposons des tarifs préférentiels pour les engagements de 6 mois (-10%) et 12 mois (-15%). Des offres spéciales sont également disponibles pour les startups et les associations. N'hésitez pas à nous contacter pour discuter de vos besoins spécifiques."
    },
    {
      id: "faq-7",
      category: "services",
      question: "Quels services sont inclus dans mon abonnement?",
      answer: "Tous nos abonnements incluent l'accès à Internet haut débit, café et thé à volonté, l'utilisation des espaces communs et l'accès aux événements communautaires. Selon votre formule, vous pouvez également bénéficier de crédits pour les salles de réunion, d'un service d'impression, d'un casier personnel et d'autres avantages."
    },
    {
      id: "faq-8",
      category: "services",
      question: "Proposez-vous des salles de réunion?",
      answer: "Oui, nous disposons de plusieurs salles de réunion pouvant accueillir de 4 à 20 personnes. Elles sont équipées d'écrans, de vidéoprojecteurs et de tableaux blancs. Les membres bénéficient de tarifs préférentiels et certains abonnements incluent des heures gratuites chaque mois."
    },
    {
      id: "faq-9",
      category: "membership",
      question: "Comment devenir membre de NOVIS Coworking?",
      answer: "Pour devenir membre, il vous suffit de créer un compte sur notre site web et de choisir la formule qui correspond à vos besoins. Vous pouvez également venir nous rencontrer directement dans nos locaux pour une visite et une présentation de nos offres."
    },
    {
      id: "faq-10",
      category: "membership",
      question: "Puis-je essayer l'espace avant de m'engager?",
      answer: "Absolument! Nous proposons une journée d'essai gratuite pour vous permettre de découvrir nos espaces et notre communauté. Contactez-nous pour réserver votre journée d'essai ou passez directement nous voir."
    }
  ];

  const filteredFAQs = searchQuery
    ? faqItems.filter(
        item =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <Layout 
      title="FAQ | NOVIS Coworking"
      description="Trouvez des réponses à toutes vos questions concernant nos espaces de coworking, nos services et nos tarifs."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">FAQ</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Foire aux questions
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Trouvez des réponses à toutes vos questions concernant nos espaces de coworking, nos services et nos tarifs.
            </p>
          </div>
          
          <div className="mt-12 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          {searchQuery ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Résultats de recherche pour "{searchQuery}"</h2>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun résultat trouvé pour votre recherche.</p>
                  <p className="mt-2 text-gray-500">Essayez avec d'autres termes ou contactez-nous directement.</p>
                  <Button className="mt-4">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="flex justify-center mb-8 flex-wrap">
                <TabsTrigger value="all">Toutes les questions</TabsTrigger>
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems
                      .filter((item) => item.category === category.id)
                      .map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger className="text-left font-medium">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>

      <div className="bg-white mb-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Vous n'avez pas trouvé votre réponse?</CardTitle>
                <CardDescription>
                  Notre équipe est à votre disposition pour répondre à toutes vos questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Contactez-nous par téléphone, email ou en remplissant notre formulaire de contact. Nous vous répondrons dans les plus brefs délais.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assistance en ligne</CardTitle>
                <CardDescription>
                  Discutez avec notre équipe en temps réel pour obtenir une réponse immédiate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Notre service d'assistance en ligne est disponible du lundi au vendredi de 9h à 18h. Cliquez sur le bouton ci-dessous pour démarrer une conversation.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Démarrer une conversation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
