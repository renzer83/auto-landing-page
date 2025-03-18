import React from 'react';
import { useParams } from 'react-router-dom';
import { TextSection } from './sections/TextSection';
import { ImageSection } from './sections/ImageSection';
import { ButtonSection } from './sections/ButtonSection';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { StatsSection } from './sections/StatsSection';
import { PricingSection } from './sections/PricingSection';
import { TeamSection } from './sections/TeamSection';
import { NewsletterSection } from './sections/NewsletterSection';
import { ContactSection } from './sections/ContactSection';
import { LandingPageData, Section } from '../types/landing';
import { Loader2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<LandingPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo purposes, we're using mock data
        let mockData: LandingPageData;

        // Nutrition product mock data
        if (id === 'protein') {
          mockData = {
            title: "Premium Plant-Based Protein",
            subtitle: "Fuel Your Body. Transform Your Life.",
            hero: {
              backgroundImage: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d",
              title: "The Future of Nutrition",
              subtitle: "Clean. Pure. Powerful.",
              video: "https://example.com/protein-intro.mp4"
            },
            colors: {
              primary: "#2DD4BF",
              secondary: "#059669",
              accent: "#F59E0B",
              background: "#F8FAFC"
            },
            stats: [
              { label: "Protein per Serving", value: "25g", icon: "activity" },
              { label: "Natural Ingredients", value: "100%", icon: "database" },
              { label: "Happy Customers", value: "50K+", icon: "users" },
              { label: "Countries Served", value: "30+", icon: "globe" }
            ],
            features: [
              {
                icon: "https://api.iconify.design/lucide:leaf.svg",
                title: "Plant-Based Formula",
                description: "Made from premium pea protein and organic ingredients for maximum bioavailability."
              },
              {
                icon: "https://api.iconify.design/lucide:dumbbell.svg",
                title: "Enhanced Recovery",
                description: "Optimal amino acid profile to support muscle recovery and growth."
              },
              {
                icon: "https://api.iconify.design/lucide:heart.svg",
                title: "Heart Healthy",
                description: "Zero cholesterol and low in saturated fats for cardiovascular health."
              },
              {
                icon: "https://api.iconify.design/lucide:sparkles.svg",
                title: "Great Taste",
                description: "Delicious natural flavors with no artificial sweeteners."
              }
            ],
            pricing: [
              {
                name: "Starter Pack",
                price: 39.99,
                features: [
                  "1 bag (30 servings)",
                  "Free Shaker",
                  "Digital Recipe Guide",
                  "Standard Shipping"
                ]
              },
              {
                name: "Value Pack",
                price: 99.99,
                features: [
                  "3 bags (90 servings)",
                  "Premium Shaker",
                  "Digital Recipe Guide",
                  "Workout Program",
                  "Free Priority Shipping"
                ],
                recommended: true
              },
              {
                name: "Bulk Pack",
                price: 179.99,
                features: [
                  "6 bags (180 servings)",
                  "Limited Edition Shaker",
                  "Complete Nutrition Guide",
                  "Personal Coach Session",
                  "Free Priority Shipping"
                ]
              }
            ],
            team: [
              {
                name: "Dr. Emily Chen",
                role: "Chief Nutritionist",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                linkedin: "https://linkedin.com/example"
              },
              {
                name: "Mark Thompson",
                role: "Product Development",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                linkedin: "https://linkedin.com/example"
              },
              {
                name: "Sarah Williams",
                role: "Quality Assurance",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                linkedin: "https://linkedin.com/example"
              }
            ],
            testimonials: [
              {
                quote: "This protein powder has transformed my post-workout recovery. The taste is amazing, and I love that it's all-natural!",
                author: "Alex Rivera",
                role: "Professional Athlete",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                company: {
                  name: "Elite Athletics",
                  logo: "https://example.com/elite.svg"
                }
              },
              {
                quote: "Finally, a plant-based protein that actually tastes good! It's become an essential part of my daily nutrition.",
                author: "Lisa Chen",
                role: "Fitness Instructor",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                company: {
                  name: "FitLife Studio",
                  logo: "https://example.com/fitlife.svg"
                }
              }
            ],
            sections: [
              { type: "hero" },
              { type: "stats" },
              { type: "features" },
              {
                type: "text",
                content: "Our premium plant-based protein is crafted from the finest organic ingredients, delivering optimal nutrition for your active lifestyle. Each serving packs 25g of complete protein, essential amino acids, and natural nutrients to support your fitness journey."
              },
              { type: "pricing" },
              { type: "team" },
              { type: "testimonials" },
              { type: "newsletter" },
              { type: "contact" },
              {
                type: "button",
                text: "Shop Now",
                link: "https://example.com/shop"
              }
            ]
          };
        } else {
          // Use the existing course data as default
          mockData = {
            title: "Master the Art of Digital Marketing",
            subtitle: "Exclusive Course to Elevate Your Skills",
            hero: {
              backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
              title: "Revolutionize Your Enterprise",
              subtitle: "Harness the power of AI and cloud technology",
              video: "https://example.com/background.mp4"
            },
            colors: {
              primary: "#0F172A",
              secondary: "#3B82F6",
              accent: "#10B981",
              background: "#F8FAFC"
            },
            stats: [
              { label: "Active Users", value: "100K+", icon: "users" },
              { label: "Data Processed", value: "500TB", icon: "database" },
              { label: "Uptime", value: "99.99%", icon: "activity" },
              { label: "Global Locations", value: "25+", icon: "globe" }
            ],
            features: [
              {
                icon: "https://api.iconify.design/lucide:cpu.svg",
                title: "AI-Powered Analytics",
                description: "Advanced machine learning algorithms process your data in real-time."
              },
              {
                icon: "https://api.iconify.design/lucide:cloud.svg",
                title: "Cloud Infrastructure",
                description: "Scalable cloud solutions that grow with your business needs."
              },
              {
                icon: "https://api.iconify.design/lucide:shield.svg",
                title: "Enterprise Security",
                description: "Military-grade encryption and security protocols protect your data."
              }
            ],
            pricing: [
              {
                name: "Starter",
                price: 49,
                features: [
                  "Basic Analytics",
                  "5 Team Members",
                  "10GB Storage",
                  "Email Support"
                ]
              },
              {
                name: "Professional",
                price: 99,
                features: [
                  "Advanced Analytics",
                  "25 Team Members",
                  "100GB Storage",
                  "24/7 Support"
                ],
                recommended: true
              },
              {
                name: "Enterprise",
                price: 299,
                features: [
                  "Custom Analytics",
                  "Unlimited Team Members",
                  "1TB Storage",
                  "Dedicated Support"
                ]
              }
            ],
            team: [
              {
                name: "Dr. Sarah Chen",
                role: "Chief AI Officer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                linkedin: "https://linkedin.com/example"
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Engineering",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                linkedin: "https://linkedin.com/example"
              },
              {
                name: "Emily Thompson",
                role: "Product Director",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                linkedin: "https://linkedin.com/example"
              }
            ],
            testimonials: [
              {
                quote: "This platform has transformed our data analytics capabilities. We've seen a 300% increase in processing efficiency.",
                author: "James Wilson",
                role: "CTO, TechGlobal",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                company: {
                  name: "TechGlobal",
                  logo: "https://example.com/techglobal.svg"
                }
              },
              {
                quote: "The AI-powered insights have revolutionized our decision-making process. A game-changer for our enterprise.",
                author: "Lisa Chen",
                role: "Director of Innovation, FutureCorp",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                company: {
                  name: "FutureCorp",
                  logo: "https://example.com/futurecorp.svg"
                }
              }
            ],
            sections: [
              { type: "hero" },
              { type: "stats" },
              { type: "features" },
              {
                type: "text",
                content: "Experience the future of enterprise solutions with our cutting-edge platform. Powered by advanced AI and machine learning, we deliver unprecedented insights and efficiency."
              },
              { type: "pricing" },
              { type: "team" },
              { type: "testimonials" },
              { type: "newsletter" },
              { type: "contact" },
              {
                type: "button",
                text: "Schedule a Demo",
                link: "https://example.com/demo"
              }
            ]
          };
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load landing page data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || 'Failed to load content'}</p>
      </div>
    );
  }

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return data.hero && <HeroSection data={data.hero} />;
      case 'stats':
        return data.stats && <StatsSection stats={data.stats} />;
      case 'features':
        return data.features && <FeaturesSection features={data.features} />;
      case 'pricing':
        return data.pricing && <PricingSection plans={data.pricing} colors={data.colors} />;
      case 'team':
        return data.team && <TeamSection team={data.team} />;
      case 'testimonials':
        return data.testimonials && <TestimonialsSection testimonials={data.testimonials} />;
      case 'newsletter':
        return <NewsletterSection />;
      case 'contact':
        return <ContactSection />;
      case 'text':
        return section.content && <TextSection content={section.content} />;
      case 'image':
        return section.url && section.alt && (
          <ImageSection url={section.url} alt={section.alt} />
        );
      case 'button':
        return section.text && section.link && (
          <ButtonSection
            text={section.text}
            link={section.link}
            colors={data.colors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: data.colors.background || '#ffffff' }}
    >
      {data.sections.map((section, index) => (
        <div key={index} className="scroll-mt-20" id={section.type}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
};