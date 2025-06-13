import { createContext, useContext, useState, useEffect } from "react";

interface LanguageContextType {
  language: "fr" | "en";
  setLanguage: (lang: "fr" | "en") => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.spaces": "Espaces",
    "nav.events": "Événements",
    "nav.blog":"Blog",
    "nav.pricing": "Tarifs",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.dashboard": "Tableau de bord",
    "nav.reserve":"Reservez",
    "nav.admin": "Administration",
    
    // Dashboard
    "dashboard.reservations": "Mes Réservations",
    "dashboard.events": "Événements",
    "dashboard.messages": "Messages",
    "dashboard.profile": "Mon Profil",
    
    // Reservations
    "reservations.title": "Mes Réservations",
    "reservations.subtitle": "Gérez vos réservations d'espaces de coworking",
    "reservations.new": "Nouvelle Réservation",
    "reservations.search": "Rechercher une réservation...",
    "reservations.status.confirmed": "Confirmée",
    "reservations.status.pending": "En attente",
    "reservations.status.cancelled": "Annulée",
    "reservations.type.hourly": "À l'heure",
    "reservations.type.daily": "À la journée",
    "reservations.type.weekly": "À la semaine",
    "reservations.type.monthly": "Au mois",
    
    // Spaces
    "spaces.private_office": "Bureau Privé",
    "spaces.meeting_room": "Salle de Réunion",
    "spaces.open_space": "Open Space",
    "spaces.conference_room": "Salle de Conférence",
    "spaces.subtype.standard": "Standard",
    "spaces.subtype.premium": "Premium",
    "spaces.subtype.executive": "Exécutif",
    
    // Common
    "common.cancel": "Annuler",
    "common.save": "Sauvegarder",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.details": "Détails",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.all": "Tous",
    "common.price": "Prix",
    "common.total": "Total",
    "common.currency": "CFA"
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.spaces": "Spaces",
    "nav.events": "Events",
    "nav.blog":"Blog",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.reserve":"Book",
    "nav.admin": "Admin",
    
    // Dashboard
    "dashboard.reservations": "My Reservations",
    "dashboard.events": "Events",
    "dashboard.messages": "Messages",
    "dashboard.profile": "My Profile",
    
    // Reservations
    "reservations.title": "My Reservations",
    "reservations.subtitle": "Manage your coworking space reservations",
    "reservations.new": "New Reservation",
    "reservations.search": "Search reservation...",
    "reservations.status.confirmed": "Confirmed",
    "reservations.status.pending": "Pending",
    "reservations.status.cancelled": "Cancelled",
    "reservations.type.hourly": "Hourly",
    "reservations.type.daily": "Daily",
    "reservations.type.weekly": "Weekly",
    "reservations.type.monthly": "Monthly",
    
    // Spaces
    "spaces.private_office": "Private Office",
    "spaces.meeting_room": "Meeting Room",
    "spaces.open_space": "Open Space",
    "spaces.conference_room": "Conference Room",
    "spaces.subtype.standard": "Standard",
    "spaces.subtype.premium": "Premium",
    "spaces.subtype.executive": "Executive",
    
    // Common
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.details": "Details",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",
    "common.price": "Price",
    "common.total": "Total",
    "common.currency": "CFA"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key: string) => key
});

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"fr" | "en">("fr");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "fr" | "en";
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: "fr" | "en") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);