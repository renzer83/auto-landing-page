export interface FooterSettings {
  companyName?: string;
  logo?: string;
  links?: {
    title: string;
    url: string;
  }[];
  socialLinks?: {
    icon: string;
    url: string;
  }[];
  copyright?: string;
  disclaimer?: string;
  backgroundColor?: string;
  textColor?: string;
  columns?: FooterColumn[];
}

export interface FooterColumn {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
export interface LandingPageData {
  title: string;
  subtitle?: string;
  hero?: HeroSection;
  stats?: Stat[];
  features?: FeatureCard[];
  pricing?: PricingPlan[];
  team?: TeamMember[];
  testimonials?: Testimonial[];
  bonuses?: Bonus[];
  faqs?: FAQ[];
  videos?: Video[];
  socialProof?: SocialProofItem[];
  beforeAfter?: BeforeAfterItem[];
  countdown?: CountdownSettings;
  footer?: FooterSettings;
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
  buttonText?: string;
  buttonLink?: string;
  logo?: string;
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
  image?: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
  discount?: {
    originalPrice: number;
    discountedPrice: number;
  };
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
  video?: string;
  image?: string;
}

export interface Bonus {
  title: string;
  description: string;
  image: string;
  originalPrice?: number;
  currentPrice?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Video {
  url: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

export interface SocialProofItem {
  icon: string;
  value: string;
  label: string;
}

export interface BeforeAfterItem {
  before: {
    image: string;
    title: string;
    description?: string;
  };
  after: {
    image: string;
    title: string;
    description?: string;
  };
}

export interface CountdownSettings {
  title?: string;
  endTime?: string;
  hoursToAdd?: number;
}

export interface Section {
  type: 'text' | 'image' | 'button' | 'hero' | 'stats' | 'features' | 'pricing' | 
        'team' | 'testimonials' | 'newsletter' | 'contact' | 'bonuses' | 'faqs' | 
        'video' | 'html' | 'guarantee' | 'checkout' | 'social-proof' | 'before-after' | 
        'countdown' | 'footer';
  content?: string;
  url?: string;
  alt?: string;
  text?: string;
  link?: string;
  videoUrl?: string;
  htmlContent?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  title?: string;
  
  // Propriedades para checkout
  originalPrice?: number;
  price?: number;
  installments?: string;
  paymentMethods?: string[];
  securityBadgeUrl?: string;
  
  // Propriedades para guarantee
  days?: number;
  guaranteeImage?: string;
}
