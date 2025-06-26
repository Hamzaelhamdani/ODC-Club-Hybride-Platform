import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GLOBAL_STATS, ALL_COUNTRIES, COUNTRIES_BY_CONTINENT } from '../constants/orange-countries';
import { 
  ArrowRight, 
  Users, 
  Lightbulb, 
  Rocket, 
  Trophy, 
  MapPin, 
  Calendar, 
  Clock,
  Target,
  Building,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Zap,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle,
  Award,
  TrendingUp,
  BookOpen,
  Code,
  Palette,
  Brain,
  Network,
  Handshake
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onExplore: () => void;
  onStudentOnboarding?: () => void;
  onUniversityOnboarding?: () => void;
  onMentorOnboarding?: () => void;
}

// Updated mock data reflecting global Orange network
const featuredStartups = [
  {
    id: 1,
    title: 'GreenTech Solutions',
    university: 'Université Hassan II',
    description: 'Smart irrigation system reducing water consumption by 40%',
    club: 'ODC Club Casablanca',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    tags: ['AgriTech', 'Sustainability']
  },
  {
    id: 2,
    title: 'EduConnect MENA',
    university: 'University of Tunis',
    description: 'AI-powered platform connecting students with mentors across Africa',
    club: 'ODC Club Tunis',
    country: 'Tunisia',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
    tags: ['EdTech', 'AI']
  },
  {
    id: 3,
    title: 'HealthTracker Pro',
    university: 'Cairo University',
    description: 'Mobile health monitoring for rural communities',
    club: 'ODC Club Cairo',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    tags: ['HealthTech', 'Mobile']
  },
  {
    id: 4,
    title: 'FinanceFlow Europe',
    university: 'Sorbonne University',
    description: 'Micro-lending platform for young entrepreneurs in Europe',
    club: 'ODC Club Sorbonne',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
    tags: ['FinTech', 'Social Impact']
  },
  {
    id: 5,
    title: 'Smart Cities Dakar',
    university: 'Université Cheikh Anta Diop',
    description: 'IoT solutions for urban planning in West Africa',
    club: 'ODC Club UCAD',
    country: 'Senegal',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=300&h=200&fit=crop',
    tags: ['IoT', 'Smart Cities']
  },
  {
    id: 6,
    title: 'BlockChain Polonia',
    university: 'University of Warsaw',
    description: 'Decentralized supply chain management for Eastern Europe',
    club: 'ODC Club Warsaw',
    country: 'Poland',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&h=200&fit=crop',
    tags: ['Blockchain', 'Supply Chain']
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Orange Innovation Summit 2025',
    date: 'July 12-14, 2025',
    location: 'Paris, France',
    type: 'Global Summit',
    description: 'Annual gathering of all ODC Clubs across the Orange network',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Africa Innovation Week',
    date: 'August 15-22, 2025',
    location: 'Multiple African Cities',
    type: 'Continental Event',
    description: 'Week-long celebration of African innovation and entrepreneurship',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'European Tech Challenge',
    date: 'September 30 - October 1, 2025',
    location: 'Barcelona, Spain',
    type: 'Competition',
    description: 'Regional technology competition for European ODC Clubs',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop'
  }
];

// Sample of key Orange locations with realistic club counts
const globalLocations = [
  // Africa
  { name: 'Morocco', continent: 'Africa', clubs: 24, coordinates: { lat: 31.7917, lng: -7.0926 } },
  { name: 'Egypt', continent: 'Africa', clubs: 18, coordinates: { lat: 26.8206, lng: 30.8025 } },
  { name: 'Tunisia', continent: 'Africa', clubs: 12, coordinates: { lat: 33.8869, lng: 9.5375 } },
  { name: 'Senegal', continent: 'Africa', clubs: 15, coordinates: { lat: 14.7167, lng: -17.4677 } },
  { name: 'Côte d\'Ivoire', continent: 'Africa', clubs: 16, coordinates: { lat: 7.5400, lng: -5.5471 } },
  { name: 'Cameroon', continent: 'Africa', clubs: 14, coordinates: { lat: 7.3697, lng: 12.3547 } },
  { name: 'Mali', continent: 'Africa', clubs: 10, coordinates: { lat: 17.5707, lng: -3.9962 } },
  { name: 'Burkina Faso', continent: 'Africa', clubs: 8, coordinates: { lat: 12.2383, lng: -1.5616 } },
  
  // Europe
  { name: 'France', continent: 'Europe', clubs: 45, coordinates: { lat: 46.6034, lng: 1.8883 } },
  { name: 'Spain', continent: 'Europe', clubs: 32, coordinates: { lat: 40.4637, lng: -3.7492 } },
  { name: 'Belgium', continent: 'Europe', clubs: 18, coordinates: { lat: 50.5039, lng: 4.4699 } },
  { name: 'Poland', continent: 'Europe', clubs: 22, coordinates: { lat: 51.9194, lng: 19.1451 } },
  { name: 'Romania', continent: 'Europe', clubs: 16, coordinates: { lat: 45.9432, lng: 24.9668 } },
  
  // Middle East
  { name: 'Jordan', continent: 'Middle East', clubs: 8, coordinates: { lat: 30.5852, lng: 36.2384 } }
];

const faqItems = [
  {
    question: 'How do I start an ODC Club at my university?',
    answer: 'Starting an ODC Club is simple! Submit an application through our platform, gather at least 10 interested students, identify a faculty advisor, and complete our online orientation. Our local Orange team will guide you through the entire process and provide all necessary resources.'
  },
  {
    question: 'Do I need a technical background to participate?',
    answer: 'Not at all! ODC Clubs welcome students from all disciplines across our global network. We believe the best startups combine technical innovation with business acumen, design thinking, and domain expertise. Our programs are designed to help you learn and grow regardless of your starting point.'
  },
  {
    question: 'Can students from different Orange countries collaborate?',
    answer: 'Absolutely! One of the unique advantages of ODC Club Hybride is the ability to collaborate across our global network spanning Africa, Europe, and the Middle East. We regularly organize cross-border hackathons, exchange programs, and joint projects between clubs in different countries.'
  },
  {
    question: 'What support do ODC Clubs receive?',
    answer: 'ODC Clubs receive comprehensive support from Orange Digital Centers including mentorship from industry experts, access to Orange\'s global network and resources, funding opportunities, training programs, networking events, and technical infrastructure. Support is tailored to each region\'s specific needs and opportunities.'
  },
  {
    question: 'How are projects selected for international competitions?',
    answer: 'Projects are evaluated at local, national, and international levels based on innovation, impact potential, feasibility, team strength, and alignment with Orange\'s values. Our selection includes regional experts, successful entrepreneurs, and Orange leadership across our global network.'
  },
  {
    question: 'What happens after graduation?',
    answer: 'ODC Club alumni become part of Orange\'s global innovation ecosystem. Many continue their startups with ongoing support, others join Orange as employees, become mentors, or start their own ventures. We maintain lifelong connections across our international network and provide continued access to Orange\'s global resources.'
  }
];

export function LandingPage({ 
  onGetStarted, 
  onExplore, 
  onStudentOnboarding, 
  onUniversityOnboarding, 
  onMentorOnboarding 
}: LandingPageProps) {
  const [currentStartup, setCurrentStartup] = useState(0);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>('All');

  const nextStartup = () => {
    setCurrentStartup((prev) => (prev + 1) % featuredStartups.length);
  };

  const prevStartup = () => {
    setCurrentStartup((prev) => (prev - 1 + featuredStartups.length) % featuredStartups.length);
  };

  const getFilteredLocations = () => {
    if (selectedContinent === 'All') return globalLocations;
    return globalLocations.filter(location => location.continent === selectedContinent);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-odc-orange rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-medium text-odc-black">ODC Club Hybride</span>
              <Badge variant="secondary" className="hidden md:inline-flex">Global Network</Badge>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#mission" className="text-gray-600 hover:text-odc-orange transition-colors">About</a>
              <a href="#events" className="text-gray-600 hover:text-odc-orange transition-colors">Events</a>
              <a href="#network" className="text-gray-600 hover:text-odc-orange transition-colors">Global Network</a>
              <a href="#faq" className="text-gray-600 hover:text-odc-orange transition-colors">FAQ</a>
              <Button className="bg-odc-orange hover:bg-odc-orange/90" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-odc-orange/10 via-orange-50 to-gray-100">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Badge variant="outline" className="border-odc-orange text-odc-orange">
                <Globe className="w-3 h-3 mr-1" />
                {ALL_COUNTRIES.length} Countries
              </Badge>
              <Badge variant="outline" className="border-odc-orange text-odc-orange">
                <Users className="w-3 h-3 mr-1" />
                {GLOBAL_STATS.estimatedMembers.toLocaleString()}+ Students
              </Badge>
              <Badge variant="outline" className="border-odc-orange text-odc-orange">
                <Building className="w-3 h-3 mr-1" />
                {GLOBAL_STATS.estimatedClubs}+ Clubs
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-odc-black mb-6 leading-tight">
              Where Student Innovation Meets <span className="text-odc-orange">Global Impact</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              ODC Club Hybride empowers students across Africa, Europe, and the Middle East to transform ideas into startups — backed by Orange's global innovation ecosystem.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                size="lg" 
                className="bg-odc-orange hover:bg-odc-orange/90 text-white px-8 py-4 text-lg"
                onClick={onGetStarted}
              >
                Start a Club
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-odc-orange text-odc-orange hover:bg-odc-orange hover:text-white px-8 py-4 text-lg"
                onClick={onExplore}
              >
                <Play className="w-5 h-5 mr-2" />
                Explore the Global Network
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-odc-orange rounded-full flex justify-center">
            <div className="w-1 h-3 bg-odc-orange rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-odc-black mb-6">Our Global Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                ODC Club Hybride is Orange's university-based program designed to support students across our global network in building real startups with impact, backed by the expertise, tools and network of Orange Digital Centers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We believe every student has the potential to create meaningful change. Through our comprehensive ecosystem spanning {ALL_COUNTRIES.length} countries, we transform innovative ideas into successful ventures that address real-world challenges.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{COUNTRIES_BY_CONTINENT.Africa.length}</p>
                  <p className="text-sm text-gray-600">African Countries</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{COUNTRIES_BY_CONTINENT.Europe.length}</p>
                  <p className="text-sm text-gray-600">European Countries</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-odc-orange/5 rounded-xl">
                <div className="w-16 h-16 bg-odc-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-odc-orange" />
                </div>
                <h3 className="text-lg font-medium text-odc-black mb-2">Empower</h3>
                <p className="text-sm text-gray-600">Enable students globally to turn ideas into viable businesses</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-odc-black mb-2">Prototype</h3>
                <p className="text-sm text-gray-600">Build and test solutions with real users across markets</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-odc-black mb-2">Connect</h3>
                <p className="text-sm text-gray-600">Access Orange's global network of mentors and experts</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-odc-black mb-2">Scale</h3>
                <p className="text-sm text-gray-600">Grow across Orange's international markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in Numbers Section */}
      <section className="py-20 bg-gradient-to-r from-odc-orange to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Orange's Global Innovation Network</h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Building the largest network of student innovators across Orange's international markets
            </p>
          </div>
          
          <div className="grid md:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {ALL_COUNTRIES.length}
                </div>
                <div className="text-orange-100">Countries</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {GLOBAL_STATS.estimatedClubs}+
                </div>
                <div className="text-orange-100">Active Clubs</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {(GLOBAL_STATS.estimatedMembers / 1000).toFixed(1)}K+
                </div>
                <div className="text-orange-100">Student Innovators</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {GLOBAL_STATS.estimatedProjects}+
                </div>
                <div className="text-orange-100">Active Projects</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  3
                </div>
                <div className="text-orange-100">Continents</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  150+
                </div>
                <div className="text-orange-100">Universities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Startups & Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-odc-black mb-4">From Campus to Global Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories of students who transformed their ideas into impactful ventures across the Orange network
            </p>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevStartup}
                className="border-odc-orange text-odc-orange hover:bg-odc-orange hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex space-x-2">
                {featuredStartups.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${index === currentStartup ? 'bg-odc-orange' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={nextStartup}
                className="border-odc-orange text-odc-orange hover:bg-odc-orange hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStartups.map((startup, index) => (
                <Card 
                  key={startup.id} 
                  className={`border-0 shadow-lg transition-all duration-300 ${
                    index === currentStartup ? 'scale-105 shadow-xl' : ''
                  }`}
                >
                  <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <ImageWithFallback 
                      src={startup.image}
                      alt={startup.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-odc-orange text-white">
                        {startup.country}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">
                        {startup.club}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium text-odc-black mb-2">{startup.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{startup.university}</p>
                    <p className="text-gray-600 mb-4">{startup.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {startup.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Map Section */}
      <section id="network" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-odc-black mb-4">Orange Global Network</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover active ODC Clubs across Orange's international markets
            </p>
          </div>
          
          <div className="mb-8 flex justify-center">
            <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
              <Button
                variant={selectedContinent === 'All' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedContinent('All')}
                className={selectedContinent === 'All' ? 'bg-odc-orange hover:bg-odc-orange/90' : ''}
              >
                All Regions
              </Button>
              {Object.keys(COUNTRIES_BY_CONTINENT).map((continent) => (
                <Button
                  key={continent}
                  variant={selectedContinent === continent ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedContinent(continent)}
                  className={selectedContinent === continent ? 'bg-odc-orange hover:bg-odc-orange/90' : ''}
                >
                  {continent}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg h-96">
                <CardContent className="p-0 h-full">
                  <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-odc-orange mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-odc-black mb-2">Interactive Global Map</h3>
                      <p className="text-gray-600">
                        Explore ODC Club locations across {selectedContinent === 'All' ? ALL_COUNTRIES.length : COUNTRIES_BY_CONTINENT[selectedContinent as keyof typeof COUNTRIES_BY_CONTINENT]?.length || 0} countries
                      </p>
                    </div>
                    
                    <div className="absolute inset-0">
                      {getFilteredLocations().map((location, index) => (
                        <div 
                          key={index}
                          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${20 + (index * 12)}%`,
                            top: `${30 + (index % 3) * 20}%`
                          }}
                          onMouseEnter={() => setHoveredLocation(index)}
                          onMouseLeave={() => setHoveredLocation(null)}
                        >
                          <div className="relative">
                            <MapPin className="w-6 h-6 text-odc-orange hover:scale-125 transition-transform" />
                            {hoveredLocation === index && (
                              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                                <div className="font-medium">{location.name}</div>
                                <div className="text-xs text-gray-300">{location.clubs} clubs</div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-odc-black mb-4">
                Active Locations {selectedContinent !== 'All' && `(${selectedContinent})`}
              </h3>
              <div className="max-h-80 overflow-y-auto space-y-2">
                {getFilteredLocations().map((location, index) => (
                  <Card 
                    key={index} 
                    className={`border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                      hoveredLocation === index ? 'shadow-lg border-odc-orange' : ''
                    }`}
                    onMouseEnter={() => setHoveredLocation(index)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-odc-black flex items-center space-x-2">
                            <span>{location.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {location.continent}
                            </Badge>
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-odc-orange">{location.clubs}</div>
                          <div className="text-xs text-gray-600">clubs</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-odc-black mb-4">Why Be Part of Orange's Global Innovation Network?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a community that spans continents and accelerates your journey from student to global innovator
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-odc-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-odc-orange" />
                </div>
                <h3 className="text-xl font-medium text-odc-black mb-4">For Students</h3>
                <p className="text-gray-600 mb-6">
                  Learn by doing, join international projects, pitch globally. Transform your ideas into real businesses with support from Orange's worldwide network.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Global entrepreneurship experience
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Access to Orange's international network
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Cross-border collaboration opportunities
                  </li>
                </ul>
                <Button 
                  className="bg-odc-orange hover:bg-odc-orange/90 w-full"
                  onClick={onStudentOnboarding}
                >
                  Get Involved
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-odc-black mb-4">For Universities</h3>
                <p className="text-gray-600 mb-6">
                  Join Orange's global education network. Connect your students to international opportunities and enhance your institution's innovation profile.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Global partnership with Orange
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    International student exchanges
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Access to global resources
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full"
                  onClick={onUniversityOnboarding}
                >
                  Get Involved
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-odc-black mb-4">For Mentors/Experts</h3>
                <p className="text-gray-600 mb-6">
                  Support the next generation across Orange's global markets. Share your expertise and help shape international innovation.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Global impact and reach
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Access to emerging markets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Orange's international network
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full"
                  onClick={onMentorOnboarding}
                >
                  Get Involved
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-odc-black mb-4">Global Events & Opportunities</h2>
              <p className="text-lg text-gray-600">
                Join international events and be part of Orange's global innovation community
              </p>
            </div>
            <Button variant="outline" className="border-odc-orange text-odc-orange hover:bg-odc-orange hover:text-white">
              See All Events
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <ImageWithFallback 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-odc-orange text-white">
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium text-odc-black mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Button className="w-full bg-odc-orange hover:bg-odc-orange/90">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-odc-black mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about joining Orange's global innovation network
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:text-odc-orange">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-odc-orange to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Orange's Global Innovation Network
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Connect with students, mentors, and innovators across {ALL_COUNTRIES.length} countries. Start building the future today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-odc-orange hover:bg-gray-100 px-12 py-4 text-lg font-medium"
              onClick={onGetStarted}
            >
              Create My Club
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-odc-orange px-12 py-4 text-lg font-medium"
              onClick={onExplore}
            >
              <Globe className="w-5 h-5 mr-2" />
              Explore Network
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-odc-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-odc-orange rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-medium">ODC Club Hybride</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering the next generation of innovators across Orange's global network spanning Africa, Europe, and the Middle East.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-odc-orange transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-odc-orange transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-odc-orange transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Network</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#mission" className="hover:text-odc-orange transition-colors">Global Mission</a></li>
                <li><a href="#network" className="hover:text-odc-orange transition-colors">Find Clubs</a></li>
                <li><a href="#events" className="hover:text-odc-orange transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-odc-orange transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:clubs@orange.com" className="hover:text-odc-orange transition-colors">
                    clubs@orange.com
                  </a>
                </li>
                <li><a href="#faq" className="hover:text-odc-orange transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-odc-orange transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-odc-orange transition-colors">Contact Local Team</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 Orange. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-odc-orange text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-odc-orange text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-odc-orange text-sm transition-colors">Orange.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}