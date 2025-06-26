import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Users,
  Briefcase,
  Trophy,
  TrendingUp,
  Star,
  Globe,
  School,
  Calendar,
  Eye,
  ExternalLink,
  Play,
  Award,
  Target
} from 'lucide-react';

interface NetworkExplorerProps {
  onBack: () => void;
  onJoinClub: () => void;
}

const networkStats = {
  totalClubs: 156,
  totalMembers: 8945,
  totalProjects: 643,
  totalCountries: 12,
  activeCompetitions: 8,
  successfulStartups: 34
};

const featuredClubs = [
  {
    id: 1,
    name: 'ODC Tunis Innovation Hub',
    university: 'University of Tunis',
    country: 'Tunisia',
    city: 'Tunis',
    members: 52,
    projects: 15,
    founded: '2023',
    status: 'Very Active',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
    specialties: ['AI/ML', 'IoT', 'Sustainability'],
    recentWin: 'MENA Tech Challenge 2024 Winner',
    engagement: 95
  },
  {
    id: 2,
    name: 'ODC Cairo Tech Leaders',
    university: 'Cairo University',
    country: 'Egypt',
    city: 'Cairo',
    members: 48,
    projects: 13,
    founded: '2023',
    status: 'Very Active',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop',
    specialties: ['FinTech', 'HealthTech', 'EdTech'],
    recentWin: 'Egypt Innovation Award 2024',
    engagement: 92
  },
  {
    id: 3,
    name: 'ODC Casablanca Innovators',
    university: 'Hassan II University',
    country: 'Morocco',
    city: 'Casablanca',
    members: 45,
    projects: 12,
    founded: '2023',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=250&fit=crop',
    specialties: ['AgriTech', 'Smart Cities', 'Renewable Energy'],
    recentWin: 'Morocco Green Tech Prize',
    engagement: 88
  }
];

const successStories = [
  {
    id: 1,
    title: 'GreenHarvest',
    description: 'AI-powered precision agriculture platform reducing water usage by 40%',
    club: 'ODC Club Rabat',
    founder: 'Amina Belkacem',
    funding: '$250K',
    stage: 'Series A',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop',
    impact: '500+ farms using the platform'
  },
  {
    id: 2,
    title: 'EduConnect MENA',
    description: 'Digital learning platform connecting students with expert mentors',
    club: 'ODC Club Tunis',
    founder: 'Omar Hadj Ali',
    funding: '$180K',
    stage: 'Seed',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
    impact: '10K+ students mentored'
  },
  {
    id: 3,
    title: 'HealthTracker Pro',
    description: 'Mobile health monitoring for rural and underserved communities',
    club: 'ODC Club Cairo',
    founder: 'Sara Mahmoud',
    funding: '$320K',
    stage: 'Series A',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
    impact: '50K+ patients monitored'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'MENA Innovation Summit 2025',
    date: 'March 15-17, 2025',
    location: 'Dubai, UAE',
    type: 'Summit',
    participants: '500+ expected',
    clubs: 'All regional clubs invited',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'ODC Global Demo Day',
    date: 'April 22, 2025',
    location: 'Virtual & Physical Hubs',
    type: 'Demo Day',
    participants: '200+ startups',
    clubs: 'Network-wide participation',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'Sustainability Challenge',
    date: 'May 1-31, 2025',
    location: 'All Clubs',
    type: 'Competition',
    participants: 'Open to all members',
    clubs: 'Inter-club competition',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
  }
];

const impactMetrics = [
  { label: 'Jobs Created', value: '1,200+', icon: Users },
  { label: 'Investment Raised', value: '$4.8M', icon: TrendingUp },
  { label: 'Patents Filed', value: '89', icon: Award },
  { label: 'Social Impact Projects', value: '156', icon: Target }
];

export function NetworkExplorer({ onBack, onJoinClub }: NetworkExplorerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Explore ODC Network</h1>
                <p className="text-muted-foreground">Discover clubs, projects, and impact across Africa & MENA</p>
              </div>
            </div>
            <Button className="bg-odc-orange hover:bg-odc-orange/90" onClick={onJoinClub}>
              Join a Club
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Network Overview Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Network at a Glance</h2>
          <div className="grid md:grid-cols-6 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <School className="w-8 h-8 text-odc-orange mx-auto mb-2" />
                <p className="text-2xl font-bold text-odc-orange">{networkStats.totalClubs}</p>
                <p className="text-sm text-muted-foreground">Active Clubs</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{networkStats.totalMembers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Student Members</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{networkStats.totalProjects}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{networkStats.totalCountries}</p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">{networkStats.activeCompetitions}</p>
                <p className="text-sm text-muted-foreground">Competitions</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{networkStats.successfulStartups}</p>
                <p className="text-sm text-muted-foreground">Startups</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="overview">Featured Clubs</TabsTrigger>
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          {/* Featured Clubs Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Clubs</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search clubs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="morocco">Morocco</SelectItem>
                    <SelectItem value="tunisia">Tunisia</SelectItem>
                    <SelectItem value="egypt">Egypt</SelectItem>
                    <SelectItem value="algeria">Algeria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredClubs.map((club) => (
                <Card key={club.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback 
                      src={club.image}
                      alt={club.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        {club.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">
                        Founded {club.founded}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{club.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{club.university}, {club.city}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-odc-orange">{club.members}</p>
                        <p className="text-xs text-muted-foreground">Members</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-600">{club.projects}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">{club.engagement}%</p>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {club.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <p className="text-sm font-medium text-yellow-800">Recent Achievement</p>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">{club.recentWin}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button className="flex-1 bg-odc-orange hover:bg-odc-orange/90">
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From university projects to successful startups - see how ODC Club members are making real impact
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback 
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        {story.stage}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{story.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Founder:</span>
                        <span className="font-medium">{story.founder}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Origin Club:</span>
                        <span className="font-medium">{story.club}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Funding Raised:</span>
                        <span className="font-medium text-green-600">{story.funding}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium text-blue-900">Impact</p>
                      <p className="text-sm text-blue-800">{story.impact}</p>
                    </div>

                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Upcoming Network Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join events that connect clubs across the network and provide opportunities for collaboration
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-48">
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
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium text-purple-900">Network Participation</p>
                      <p className="text-sm text-purple-800">{event.clubs}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-odc-orange hover:bg-odc-orange/90">
                        Register
                      </Button>
                      <Button variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Network Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Measuring the real-world impact of ODC Club innovations and entrepreneurship
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {impactMetrics.map((metric, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <metric.icon className="w-12 h-12 text-odc-orange mx-auto mb-4" />
                    <p className="text-3xl font-bold text-odc-orange mb-2">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Impact Categories */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Impact</CardTitle>
                  <CardDescription>Job creation and investment generated by club startups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Direct Jobs Created</span>
                    <span className="font-bold">1,200+</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Investment Attracted</span>
                    <span className="font-bold">$4.8M</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Revenue Generated</span>
                    <span className="font-bold">$12.3M</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Impact</CardTitle>
                  <CardDescription>Communities and lives improved by club projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>People Directly Served</span>
                    <span className="font-bold">45,000+</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Communities Reached</span>
                    <span className="font-bold">250+</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Social Innovation Projects</span>
                    <span className="font-bold">156</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-odc-orange to-orange-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Make Your Impact?</h3>
                <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                  Join thousands of students who are building the future through innovation and entrepreneurship
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button 
                    className="bg-white text-odc-orange hover:bg-gray-100"
                    onClick={onJoinClub}
                  >
                    Join a Club Today
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-odc-orange"
                    onClick={onBack}
                  >
                    Start Your Own Club
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}