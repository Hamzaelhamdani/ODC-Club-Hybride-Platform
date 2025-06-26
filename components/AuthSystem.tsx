import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ALL_COUNTRIES, COUNTRIES_BY_CONTINENT } from '../constants/orange-countries';
import { 
  ArrowLeft, 
  Crown, 
  Flag, 
  MapPin, 
  Building, 
  Users, 
  GraduationCap, 
  Star, 
  User,
  Eye,
  EyeOff
} from 'lucide-react';

export type UserRole = 'super_admin' | 'country_admin' | 'regional_admin' | 'club_manager' | 'expert' | 'student';

interface AuthSystemProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  country?: string;
  region?: string;
  university?: string;
  club?: string;
  adminLevel?: 'super' | 'country' | 'regional';
  isDemo?: boolean;
}

// Demo users representing the global Orange network
const demoUsers: User[] = [
  // Super Admin (Global)
  {
    id: '1',
    email: 'global.admin@orange.com',
    name: 'Sarah Al-Mansouri',
    role: 'super_admin',
    adminLevel: 'super',
    isDemo: true
  },

  // Country Admins across regions
  {
    id: '2',
    email: 'morocco.admin@orange.ma',
    name: 'Ahmed Benali',
    role: 'country_admin',
    country: 'Morocco',
    adminLevel: 'country',
    isDemo: true
  },
  {
    id: '3',
    email: 'france.admin@orange.fr',
    name: 'Marie Dubois',
    role: 'country_admin',
    country: 'France',
    adminLevel: 'country',
    isDemo: true
  },
  {
    id: '4',
    email: 'senegal.admin@orange.sn',
    name: 'Amadou Diallo',
    role: 'country_admin',
    country: 'Senegal',
    adminLevel: 'country',
    isDemo: true
  },
  {
    id: '5',
    email: 'egypt.admin@orange.eg',
    name: 'Omar Hassan',
    role: 'country_admin',
    country: 'Egypt',
    adminLevel: 'country',
    isDemo: true
  },

  // Regional Admins
  {
    id: '6',
    email: 'casablanca.admin@orange.ma',
    name: 'Fatima Zahra El Idrissi',
    role: 'regional_admin',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    adminLevel: 'regional',
    isDemo: true
  },
  {
    id: '7',
    email: 'paris.admin@orange.fr',
    name: 'Jean-Baptiste Martin',
    role: 'regional_admin',
    country: 'France',
    region: 'Île-de-France (Paris)',
    adminLevel: 'regional',
    isDemo: true
  },
  {
    id: '8',
    email: 'dakar.admin@orange.sn',
    name: 'Aïssatou Ba',
    role: 'regional_admin',
    country: 'Senegal',
    region: 'Dakar',
    adminLevel: 'regional',
    isDemo: true
  },
  {
    id: '9',
    email: 'cairo.admin@orange.eg',
    name: 'Nour El-Din Mohamed',
    role: 'regional_admin',
    country: 'Egypt',
    region: 'Cairo',
    adminLevel: 'regional',
    isDemo: true
  },
  {
    id: '10',
    email: 'madrid.admin@orange.es',
    name: 'Carlos Rodríguez',
    role: 'regional_admin',
    country: 'Spain',
    region: 'Madrid',
    adminLevel: 'regional',
    isDemo: true
  },

  // Club Managers
  {
    id: '11',
    email: 'club.hassan2@orange.ma',
    name: 'Amina Belkacem',
    role: 'club_manager',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    university: 'Université Hassan II Casablanca',
    club: 'ODC Club Hassan II',
    isDemo: true
  },
  {
    id: '12',
    email: 'club.sorbonne@orange.fr',
    name: 'Alexandre Leroy',
    role: 'club_manager',
    country: 'France',
    region: 'Île-de-France (Paris)',
    university: 'Sorbonne University',
    club: 'ODC Club Sorbonne',
    isDemo: true
  },
  {
    id: '13',
    email: 'club.cheikhdanta@orange.sn',
    name: 'Momar Seck',
    role: 'club_manager',
    country: 'Senegal',
    region: 'Dakar',
    university: 'Université Cheikh Anta Diop',
    club: 'ODC Club UCAD',
    isDemo: true
  },
  {
    id: '14',
    email: 'club.cairo@orange.eg',
    name: 'Yasmin Farid',
    role: 'club_manager',
    country: 'Egypt',
    region: 'Cairo',
    university: 'Cairo University',
    club: 'ODC Club Cairo University',
    isDemo: true
  },
  {
    id: '15',
    email: 'club.jordan@orange.jo',
    name: 'Layla Ahmad',
    role: 'club_manager',
    country: 'Jordan',
    region: 'Amman',
    university: 'University of Jordan',
    club: 'ODC Club Jordan University',
    isDemo: true
  },

  // Experts and Coaches
  {
    id: '16',
    email: 'expert.tech@orange.ma',
    name: 'Youssef Alami',
    role: 'expert',
    country: 'Morocco',
    isDemo: true
  },
  {
    id: '17',
    email: 'coach.startup@orange.fr',
    name: 'Sophie Moreau',
    role: 'coach',
    country: 'France',
    region: 'Provence-Alpes-Côte d\'Azur',
    isDemo: true
  },
  {
    id: '18',
    email: 'expert.ai@orange.sn',
    name: 'Ibrahima Fall',
    role: 'expert',
    country: 'Senegal',
    isDemo: true
  },

  // Students
  {
    id: '19',
    email: 'student.hassan@orange.ma',
    name: 'Hassan Radi',
    role: 'student',
    country: 'Morocco',
    region: 'Casablanca-Settat',
    university: 'Université Hassan II Casablanca',
    club: 'ODC Club Hassan II',
    isDemo: true
  },
  {
    id: '20',
    email: 'student.sorbonne@orange.fr',
    name: 'Emma Rousseau',
    role: 'student',
    country: 'France',
    region: 'Île-de-France (Paris)',
    university: 'Sorbonne University',
    club: 'ODC Club Sorbonne',
    isDemo: true
  },
  {
    id: '21',
    email: 'student.tunis@orange.tn',
    name: 'Nadia Trabelsi',
    role: 'student',
    country: 'Tunisia',
    region: 'Tunis',
    university: 'University of Tunis',
    club: 'ODC Club Tunis',
    isDemo: true
  },
  {
    id: '22',
    email: 'student.madrid@orange.es',
    name: 'Pablo García',
    role: 'student',
    country: 'Spain',
    region: 'Madrid',
    university: 'Complutense University of Madrid',
    club: 'ODC Club Complutense',
    isDemo: true
  }
];

const roleInfo = {
  super_admin: {
    title: 'Super Admin (Global)',
    description: 'Global Orange network oversight across all countries',
    icon: Crown,
    color: 'bg-purple-600',
    responsibilities: ['Global network management', 'Country admin assignment', 'International competitions', 'Global analytics']
  },
  country_admin: {
    title: 'Country Admin',
    description: 'National-level management and coordination',
    icon: Flag,
    color: 'bg-blue-600',
    responsibilities: ['Add/manage regional admins', 'Create national events', 'Country-wide oversight', 'National competitions']
  },
  regional_admin: {
    title: 'Regional Admin',
    description: 'Regional zone management within country',
    icon: MapPin,
    color: 'bg-green-600',
    responsibilities: ['Add club managers & teams', 'Validate experts & mentors', 'Regional competitions', 'Zone oversight']
  },
  club_manager: {
    title: 'Club Manager',
    description: 'University club leadership and project management',
    icon: Building,
    color: 'bg-odc-orange',
    responsibilities: ['Club member management', 'Project oversight', 'Event organization', 'Mentor coordination']
  },
  expert: {
    title: 'Expert/Mentor',
    description: 'Technical guidance and project mentorship',
    icon: Star,
    color: 'bg-yellow-600',
    responsibilities: ['Project mentoring', 'Technical guidance', 'Skill development', 'Knowledge sharing']
  },
  student: {
    title: 'Student',
    description: 'Learn, build, and innovate through club participation',
    icon: GraduationCap,
    color: 'bg-emerald-600',
    responsibilities: ['Project participation', 'Skill learning', 'Innovation development', 'Competition entry']
  }
};

export function AuthSystem({ onLogin, onBack }: AuthSystemProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (isLogin) {
        // Find demo user by email
        const demoUser = demoUsers.find(user => user.email === email);
        if (demoUser) {
          onLogin(demoUser);
        } else {
          // Default login
          onLogin({
            id: '999',
            email,
            name: email.split('@')[0],
            role: selectedRole,
            adminLevel: selectedRole.includes('admin') ? 
              (selectedRole === 'super_admin' ? 'super' : 
               selectedRole === 'country_admin' ? 'country' : 'regional') : undefined,
            country: selectedRole !== 'super_admin' ? selectedCountry || 'Morocco' : undefined,
          });
        }
      } else {
        // Registration flow - create new user
        onLogin({
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          role: selectedRole,
          adminLevel: selectedRole.includes('admin') ? 
            (selectedRole === 'super_admin' ? 'super' : 
             selectedRole === 'country_admin' ? 'country' : 'regional') : undefined,
          country: selectedRole !== 'super_admin' ? selectedCountry || 'Morocco' : undefined,
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (user: User) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(user);
      setIsLoading(false);
    }, 500);
  };

  const getCountriesForContinent = (continent: string) => {
    return COUNTRIES_BY_CONTINENT[continent as keyof typeof COUNTRIES_BY_CONTINENT] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-odc-orange rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">ODC Club Hybride • Global Network</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Users Panel */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Demo Users - Global Orange Network</CardTitle>
              <CardDescription>
                Try different roles across {ALL_COUNTRIES.length} Orange countries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              {/* Group users by continent */}
              {Object.entries(COUNTRIES_BY_CONTINENT).map(([continent, countries]) => {
                const continentUsers = demoUsers.filter(user => 
                  !user.country || countries.includes(user.country) || user.role === 'super_admin'
                );

                if (continentUsers.length === 0) return null;

                return (
                  <div key={continent} className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500 border-b pb-1">
                      {continent} {continent !== 'Global' && `(${countries.length} countries)`}
                    </h3>
                    {continentUsers.map((user) => {
                      const role = roleInfo[user.role];
                      const RoleIcon = role.icon;
                      
                      return (
                        <Card 
                          key={user.id} 
                          className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-odc-orange"
                          onClick={() => handleDemoLogin(user)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                              <RoleIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{user.name}</h4>
                                <Badge variant="secondary" className="text-xs">Demo</Badge>
                              </div>
                              <p className="text-sm font-medium text-odc-orange">{role.title}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                              {user.country && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  📍 {user.region ? `${user.region}, ${user.country}` : user.country}
                                </p>
                              )}
                              {user.university && (
                                <p className="text-xs text-blue-600">🎓 {user.university}</p>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Login/Register Form */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">
                {isLogin ? 'Sign In' : 'Create Account'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Access your ODC Club dashboard' 
                  : 'Join the global Orange Digital Center network'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Role</label>
                      <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(roleInfo).map(([key, role]) => {
                            const RoleIcon = role.icon;
                            return (
                              <SelectItem key={key} value={key as UserRole}>
                                <div className="flex items-center space-x-2">
                                  <RoleIcon className="w-4 h-4" />
                                  <span>{role.title}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedRole !== 'super_admin' && (
                      <>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Continent</label>
                          <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select continent" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(COUNTRIES_BY_CONTINENT).map((continent) => (
                                <SelectItem key={continent} value={continent}>
                                  {continent} ({COUNTRIES_BY_CONTINENT[continent as keyof typeof COUNTRIES_BY_CONTINENT].length} countries)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedContinent && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Country</label>
                            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                              <SelectContent>
                                {getCountriesForContinent(selectedContinent).map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-odc-orange hover:bg-odc-orange/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"
                    }
                  </Button>
                </div>
              </form>

              {!isLogin && selectedRole && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Role: {roleInfo[selectedRole].title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {roleInfo[selectedRole].description}
                  </p>
                  <div>
                    <p className="text-sm font-medium mb-2">Responsibilities:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {roleInfo[selectedRole].responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-odc-orange rounded-full mr-2"></div>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Global Orange Network</h4>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="font-bold text-blue-700">{ALL_COUNTRIES.length}</p>
                    <p className="text-blue-600">Countries</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-700">3</p>
                    <p className="text-blue-600">Continents</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-700">340+</p>
                    <p className="text-blue-600">Clubs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}