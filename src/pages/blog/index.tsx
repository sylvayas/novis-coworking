
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Search, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Tous les articles" },
    { id: "news", name: "Actualités" },
    { id: "coworking", name: "Coworking" },
    { id: "entrepreneurship", name: "Entrepreneuriat" },
    { id: "events", name: "Événements" },
    { id: "press", name: "Presse" }
  ];

  const blogPosts = [
    {
      id: "post-1",
      title: "5 avantages du coworking pour les freelances",
      excerpt: "Découvrez comment le coworking peut transformer votre expérience de travail en tant que freelance et booster votre productivité.",
      category: "coworking",
      author: "Sophie Martin",
      date: "10 mai 2025",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "avantages-coworking-freelances"
    },
    {
      id: "post-2",
      title: "NOVIS Coworking ouvre un nouvel espace dans le 9ème arrondissement",
      excerpt: "Nous sommes ravis d'annoncer l'ouverture de notre nouvel espace de coworking dans le 9ème arrondissement de Paris.",
      category: "news",
      author: "Thomas Dubois",
      date: "5 mai 2025",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "ouverture-nouvel-espace-9eme"
    },
    {
      id: "post-3",
      title: "Comment organiser un événement professionnel réussi",
      excerpt: "Nos conseils pour organiser un événement professionnel qui marquera les esprits et créera des opportunités de networking.",
      category: "events",
      author: "Julie Lefèvre",
      date: "28 avril 2025",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "organiser-evenement-professionnel-reussi"
    },
    {
      id: "post-4",
      title: "Interview: Comment j'ai lancé ma startup depuis un espace de coworking",
      excerpt: "Rencontre avec Léa Bernard, fondatrice de GreenTech Solutions, qui a développé son entreprise depuis NOVIS Coworking.",
      category: "entrepreneurship",
      author: "Alexandre Chen",
      date: "20 avril 2025",
      image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "interview-startup-espace-coworking"
    },
    {
      id: "post-5",
      title: "NOVIS Coworking dans le top 10 des meilleurs espaces de travail partagés de Paris",
      excerpt: "Le magazine Business Insider a classé NOVIS Coworking parmi les 10 meilleurs espaces de coworking de la capitale.",
      category: "press",
      author: "Sophie Martin",
      date: "15 avril 2025",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "novis-top-10-meilleurs-espaces-paris"
    },
    {
      id: "post-6",
      title: "L'importance du networking pour développer son activité",
      excerpt: "Comment le networking peut vous aider à développer votre réseau professionnel et créer de nouvelles opportunités d'affaires.",
      category: "entrepreneurship",
      author: "Thomas Dubois",
      date: "10 avril 2025",
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slug: "importance-networking-developpement-activite"
    }
  ];

  const filteredPosts = searchQuery
    ? blogPosts.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  return (
    <Layout 
      title="Blog & Actualités | NOVIS Coworking"
      description="Découvrez nos articles, conseils et actualités sur le coworking, l'entrepreneuriat et les événements professionnels."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Blog & Actualités</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Nos derniers articles
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Découvrez nos articles, conseils et actualités sur le coworking, l'entrepreneuriat et les événements professionnels.
            </p>
          </div>
          
          <div className="mt-12 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          {searchQuery ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Résultats de recherche pour "{searchQuery}"</h2>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun article trouvé pour votre recherche.</p>
                  <p className="mt-2 text-gray-500">Essayez avec d'autres termes ou parcourez nos catégories.</p>
                </div>
              )}
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex justify-center mb-8 flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </TabsContent>
              
              {categories.slice(1).map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts
                      .filter((post) => post.category === category.id)
                      .map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Abonnez-vous à notre newsletter
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Recevez nos derniers articles, conseils et actualités directement dans votre boîte mail.
          </p>
          <div className="mt-8 flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">
              S'abonner
            </Button>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            En vous inscrivant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
      </div>
    </Layout>
  );
}

function BlogPostCard({ post }: { post: any }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white">
            {post.category === "news" && "Actualités"}
            {post.category === "coworking" && "Coworking"}
            {post.category === "entrepreneurship" && "Entrepreneuriat"}
            {post.category === "events" && "Événements"}
            {post.category === "press" && "Presse"}
          </Badge>
        </div>
      </div>
      <CardContent className="py-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <CardDescription className="mb-4">
          {post.excerpt}
        </CardDescription>
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <User className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.author}</span>
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.date}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" className="p-3 h-auto" asChild>
          <Link href={`/blog/${post.slug}`}>
            Lire la suite
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
