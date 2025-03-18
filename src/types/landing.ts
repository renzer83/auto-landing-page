export interface LandingPageData {
  title: string;
  subtitle?: string;
  hero?: HeroSection;
  stats?: Stat[];
  features?: FeatureCard[];
  pricing?: PricingPlan[];
  team?: TeamMember[];
  testimonials?: Testimonial[];
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background?: string;
  };
  sections: Section[];
}

export interface HeroSection {
  backgroundImage: string;
  title: string;
  subtitle: string;
  video?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface Company {
  name: string;
  logo: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  company?: Company;
}

export interface Section {
  type: 'text' | 'image' | 'button' | 'hero' | 'stats' | 'features' | 'pricing' | 'team' | 'testimonials' | 'newsletter' | 'contact';
  content?: string;
  url?: string;
  alt?: string;
  text?: string;
  link?: string;
}