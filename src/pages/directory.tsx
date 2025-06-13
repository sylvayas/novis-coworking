
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone, Linkedin, Globe, MapPin, Lock } from "lucide-react";
import Link from "next/link";

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  // Mock data for directory
  const industries = [
    { id: "", name: "Toutes les industries" },
    { id: "tech", name: "Technologie" },
    { id: "marketing", name: "Marketing & Communication" },
    { id: "finance", name: "Finance" },
    { id: "design", name: "Design & Création" },
    { id: "consulting", name: "Conseil" },
    { id: "education", name: "Éducation & Formation" },
    { id: "health", name: "Santé & Bien-être" }
  ];

  const members = [
    {
      id: "member-1",
      name: "Sophie Martin",
      company: "GreenTech Solutions",
      role: "Fondatrice & CEO",
      industry: "tech",
      bio: "Entrepreneure passionnée par les technologies vertes et le développement durable.",
      email: "sophie@greentechsolutions.com",
      phone: "+33 6 12 34 56 78",
      website: "https://greentechsolutions.com",
      linkedin: "https://linkedin.com/in/sophiemartin",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: true
    },
    {
      id: "member-2",
      name: "Thomas Dubois",
      company: "Dubois Consulting",
      role: "Consultant en Stratégie",
      industry: "consulting",
      bio: "Consultant en stratégie d'entreprise avec plus de 10 ans d'expérience dans le conseil aux PME et startups.",
      email: "thomas@duboisconsulting.fr",
      phone: "+33 6 23 45 67 89",
      website: "https://duboisconsulting.fr",
      linkedin: "https://linkedin.com/in/thomasdubois",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: true
    },
    {
      id: "member-3",
      name: "Julie Lefèvre",
      company: "Design Studio Paris",
      role: "Directrice Artistique",
      industry: "design",
      bio: "Directrice artistique spécialisée dans l'identité de marque et le design d'interface utilisateur.",
      email: "julie@designstudioparis.com",
      phone: "+33 6 34 56 78 90",
      website: "https://designstudioparis.com",
      linkedin: "https://linkedin.com/in/julielefevre",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: true
    },
    {
      id: "member-4",
      name: "Alexandre Chen",
      company: "TechStart Solutions",
      role: "CTO",
      industry: "tech",
      bio: "Expert en développement web et mobile, passionné par les nouvelles technologies et l'innovation.",
      email: "alexandre@techstartsolutions.com",
      phone: "+33 6 45 67 89 01",
      website: "https://techstartsolutions.com",
      linkedin: "https://linkedin.com/in/alexandrechen",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: true
    },
    {
      id: "member-5",
      name: "Marie Laurent",
      company: "Growth Marketing Agency",
      role: "Consultante Marketing Digital",
      industry: "marketing",
      bio: "Spécialiste en marketing digital et stratégies de croissance pour startups et scale-ups.",
      email: "marie@growthmarketing.fr",
      phone: "+33 6 56 78 90 12",
      website: "https://growthmarketing.fr",
      linkedin: "https://linkedin.com/in/marielaurent",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: false
    },
    {
      id: "member-6",
      name: "Pierre Moreau",
      company: "FinTech Innovations",
      role: "Analyste Financier",
      industry: "finance",
      bio: "Analyste financier spécialisé dans les technologies financières et les investissements dans les startups.",
      email: "pierre@fintechinnovations.com",
      phone: "+33 6 67 89 01 23",
      website: "https://fintechinnovations.com",
      linkedin: "https://linkedin.com/in/pierremoreau",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: true
    },
    {
      id: "member-7",
      name: "Camille Petit",
      company: "EduTech Academy",
      role: "Responsable Pédagogique",
      industry: "education",
      bio: "Experte en pédagogie numérique et développement de programmes de formation en ligne.",
      email: "camille@edutechacademy.fr",
      phone: "+33 6 78 90 12 34",
      website: "https://edutechacademy.fr",
      linkedin: "https://linkedin.com/in/camillepetit",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: true
    },
    {
      id: "member-8",
      name: "Lucas Bernard",
      company: "Wellness Hub",
      role: "Coach bien-être",
      industry: "health",
      bio: "Coach spécialisé dans le bien-être au travail et la gestion du stress pour les professionnels.",
      email: "lucas@wellnesshub.fr",
      phone: "+33 6 89 01 23 45",
      website: "https://wellnesshub.fr",
      linkedin: "https://linkedin.com/in/lucasbernard",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      isPublic: false
    }
  ];

  const filteredMembers = members
    .filter(member => member.isPublic)
    .filter(member => {
      if (searchQuery) {
        return (
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.bio.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter(member => {
      if (industryFilter) {
        return member.industry === industryFilter;
      }
      return true;
    });

  return (
    <Layout 
      title="Annuaire des Membres | NOVIS Coworking"
      description="Découvrez et connectez-vous avec les membres de la communauté NOVIS Coworking."
    >
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary tracking-wide uppercase">Annuaire</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Annuaire des membres
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Découvrez et connectez-vous avec les membres de la communauté NOVIS Coworking.
            </p>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un membre ou une entreprise..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par industrie" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.id} value={industry.id}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <Tabs defaultValue="public" className="w-full">
            <TabsList className="flex justify-center mb-8">
              <TabsTrigger value="public">Annuaire public</TabsTrigger>
              <TabsTrigger value="private">Annuaire privé</TabsTrigger>
            </TabsList>
            
            <TabsContent value="public">
              {filteredMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                            <p className="text-sm font-medium text-primary">{member.company}</p>
                            <Badge variant="outline" className="mt-2">
                              {industries.find(i => i.id === member.industry)?.name}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="mt-4 text-sm text-gray-500">{member.bio}</p>
                        
                        <div className="mt-6 space-y-2">
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 text-primary mr-2" />
                            <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-primary">
                              {member.email}
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 text-primary mr-2" />
                            <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-primary">
                              {member.phone}
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <Globe className="h-4 w-4 text-primary mr-2" />
                            <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                              {member.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-primary mr-2" />
                            <span className="text-gray-600">{member.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4 mr-2" />
                              Voir le profil LinkedIn
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucun membre trouvé pour votre recherche.</p>
                  <p className="mt-2 text-gray-500">Essayez avec d'autres termes ou filtres.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="private">
              <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto text-center">
                <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accès réservé aux membres</h3>
                <p className="text-gray-500 mb-6">
                  L'annuaire privé est réservé aux membres de NOVIS Coworking. Connectez-vous pour accéder à l'ensemble des profils et entrer en contact avec notre communauté.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild>
                    <Link href="/auth/login">Se connecter</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/register">Devenir membre</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Rejoignez notre communauté
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Devenez membre de NOVIS Coworking et connectez-vous avec des professionnels partageant les mêmes valeurs.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/pricing">
              <Button size="lg">
                Découvrir nos offres
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
