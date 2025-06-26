import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Target,
  Calendar,
  Award,
  Star,
  ChevronRight,
  Bell,
  MessageSquare,
  Heart,
  Share2,
  Clock,
  MapPin,
  Code,
  Lightbulb,
  GraduationCap,
  HeartHandshake,
  Zap,
  Coffee,
  Briefcase,
  FileText,
  Video,
  Play,
  CheckCircle,
  AlertCircle,
  Timer,
  Flame,
  Medal,
  Brain,
  Rocket,
  Globe,
  UserPlus,
  Plus,
  ArrowRight,
  ExternalLink,
  Download,
  BookOpenCheck,
  TrendingDown
} from 'lucide-react';

interface StudentDashboardProps {
  currentPage: string;
}

// Mock data for the student dashboard
const studentProfile = {
  name: 'Amira Hassan',
  avatar: '',
  university: 'University of Tunis',
  club: 'ODC Tunis Innovation Hub',
  level: 'Intermediate Developer',
  joinDate: '2023-09-15',
  streak: 12,
  totalPoints: 2847,
  rank: '#23',
  completedCourses: 8,
  activeProjects: 3,
  achievements: 15,
  connections: 47
};

const recentActivity = [
  {
    id: '1',
    type: 'achievement',
    title: 'Completed React Fundamentals',
    description: 'Earned React Developer badge',
    timestamp: '2 hours ago',
    icon: Trophy,
    color: 'text-yellow-500'
  },
  {
    id: '2',
    type: 'project',
    title: 'Smart Campus IoT - New Update',
    description: 'Added sensor integration module',
    timestamp: '5 hours ago',
    icon: Code,
    color: 'text-blue-500'
  },
  {
    id: '3',
    type: 'social',
    title: 'Joined Study Group',
    description: 'AI/ML Fundamentals study group',
    timestamp: '1 day ago',
    icon: Users,
    color: 'text-green-500'
  },
  {
    id: '4',
    type: 'learning',
    title: 'Started New Course',
    description: 'Advanced JavaScript Patterns',
    timestamp: '2 days ago',
    icon: BookOpen,
    color: 'text-purple-500'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'React Workshop: Building Modern UIs',
    date: '2025-01-28',
    time: '14:00',
    location: 'ODC Tunis Innovation Hub',
    type: 'workshop',
    registeredCount: 24,
    maxCapacity: 30,
    instructor: 'Sarah Benali'
  },
  {
    id: '2',
    title: 'AI/ML Project Showcase',
    date: '2025-02-05',
    time: '16:00',
    location: 'University of Tunis - Tech Center',
    type: 'showcase',
    registeredCount: 67,
    maxCapacity: 100,
    instructor: 'Dr. Ahmed Mansouri'
  },
  {
    id: '3',
    title: 'Networking Meetup',
    date: '2025-02-12',
    time: '18:30',
    location: 'Tunis Tech Hub',
    type: 'networking',
    registeredCount: 15,
    maxCapacity: 25,
    instructor: 'Community Team'
  }
];

const currentCourses = [
  {
    id: '1',
    title: 'Advanced JavaScript Patterns',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    instructor: 'Mark Johnson',
    nextLesson: 'Async/Await Deep Dive',
    timeRemaining: '2 weeks',
    difficulty: 'Advanced',
    rating: 4.8
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    progress: 40,
    totalLessons: 18,
    completedLessons: 7,
    instructor: 'Lisa Chen',
    nextLesson: 'Color Theory and Psychology',
    timeRemaining: '3 weeks',
    difficulty: 'Beginner',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    progress: 80,
    totalLessons: 30,
    completedLessons: 24,
    instructor: 'Dr. Rahman Ali',
    nextLesson: 'Graph Algorithms',
    timeRemaining: '1 week',
    difficulty: 'Intermediate',
    rating: 4.7
  }
];

const activeProjects = [
  {
    id: '1',
    title: 'Smart Campus IoT',
    description: 'IoT sensors for campus monitoring',
    club: 'ODC Tunis Innovation Hub',
    progress: 75,
    teamSize: 4,
    deadline: '2025-03-15',
    status: 'On Track',
    technologies: ['React', 'Node.js', 'IoT', 'MongoDB'],
    lastUpdate: '2 days ago'
  },
  {
    id: '2',
    title: 'AI Learning Assistant',
    description: 'Personal AI tutor for students',
    club: 'Personal Project',
    progress: 45,
    teamSize: 1,
    deadline: '2025-04-20',
    status: 'Behind',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    lastUpdate: '1 week ago'
  },
  {
    id: '3',
    title: 'Community Event Platform',
    description: 'Platform for organizing tech events',
    club: 'ODC Tunis Innovation Hub',
    progress: 30,
    teamSize: 6,
    deadline: '2025-05-10',
    status: 'Planning',
    technologies: ['Vue.js', 'Express.js', 'PostgreSQL'],
    lastUpdate: '3 days ago'
  }
];

const achievements = [
  { id: '1', title: 'First Steps', description: 'Completed your first course', icon: GraduationCap, earned: true, rarity: 'common' },
  { id: '2', title: 'Code Warrior', description: 'Submitted 10 coding challenges', icon: Code, earned: true, rarity: 'uncommon' },
  { id: '3', title: 'Team Player', description: 'Collaborated on 3 projects', icon: Users, earned: true, rarity: 'common' },
  { id: '4', title: 'Innovation Leader', description: 'Led a successful project', icon: Lightbulb, earned: false, rarity: 'rare' },
  { id: '5', title: 'Mentor', description: 'Helped 5 other students', icon: HeartHandshake, earned: true, rarity: 'uncommon' },
  { id: '6', title: 'Streak Master', description: '30-day learning streak', icon: Flame, earned: false, rarity: 'epic' }
];

const studyGroups = [
  {
    id: '1',
    name: 'AI/ML Fundamentals',
    members: 12,
    nextSession: '2025-01-27 19:00',
    topic: 'Neural Networks Basics',
    level: 'Beginner',
    isJoined: true
  },
  {
    id: '2',
    name: 'React Advanced Patterns',
    members: 8,
    nextSession: '2025-01-29 18:00',
    topic: 'Context API & State Management',
    level: 'Advanced',
    isJoined: false
  },
  {
    id: '3',
    name: 'System Design Study Group',
    members: 15,
    nextSession: '2025-01-30 20:00',
    topic: 'Scalability Patterns',
    level: 'Intermediate',
    isJoined: true
  }
];

const mentorshipOpportunities = [
  {
    id: '1',
    mentor: 'Dr. Fatima Zahra',
    role: 'Senior Software Engineer at Google',
    expertise: ['Machine Learning', 'Python', 'Data Science'],
    rating: 4.9,
    sessions: 156,
    available: 'Weekends',
    price: 'Free for ODC members'
  },
  {
    id: '2',
    mentor: 'Ahmed Ben Salem',
    role: 'Tech Lead at Spotify',
    expertise: ['React', 'Node.js', 'System Design'],
    rating: 4.8,
    sessions: 89,
    available: 'Evenings',
    price: 'Free for ODC members'
  }
];

export function StudentDashboard({ currentPage }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (currentPage === 'projects') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium mb-2">My Projects</h1>
              <p className="text-muted-foreground">Track your active projects and contributions</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Project Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-blue-600">{activeProjects.length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-green-600">7</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-purple-600">23</p>
                <p className="text-sm text-muted-foreground">Collaborators</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Trophy className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-yellow-600">3</p>
                <p className="text-sm text-muted-foreground">Awards Won</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Projects */}
          <div className="grid lg:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge className={
                      project.status === 'On Track' ? 'bg-green-100 text-green-700' :
                      project.status === 'Behind' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{project.teamSize} members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{project.deadline}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-muted-foreground">
                      Last updated: {project.lastUpdate}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium mb-2">Learning Hub</h1>
              <p className="text-muted-foreground">Expand your skills with courses and resources</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </div>

          {/* Learning Stats */}
          <div className="grid md:grid-cols-5 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <BookOpenCheck className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-green-600">{studentProfile.completedCourses}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-blue-600">{currentCourses.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Flame className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-orange-600">{studentProfile.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Target className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-purple-600">89%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Timer className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-red-600">47h</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Courses */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Current Courses</CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                  <Card key={course.id} className="border border-gray-200 hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={
                          course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {course.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {course.completedLessons} of {course.totalLessons} lessons
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Next Lesson:</p>
                          <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-xs text-muted-foreground">
                            {course.timeRemaining} remaining
                          </span>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Groups */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Study Groups</CardTitle>
              <CardDescription>Join collaborative learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studyGroups.map((group) => (
                  <Card key={group.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{group.name}</h4>
                        <Badge variant="outline">{group.level}</Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{group.nextSession}</span>
                        </div>
                        <p className="font-medium text-foreground">Topic: {group.topic}</p>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className={`w-full mt-4 ${group.isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {group.isJoined ? 'Joined' : 'Join Group'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default student overview
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 border-4 border-white/20">
                  <AvatarFallback className="bg-white/20 text-white text-xl">
                    {studentProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {studentProfile.name}!</h1>
                  <p className="text-blue-100">{studentProfile.level} • {studentProfile.club}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-orange-300" />
                      <span className="text-blue-100">{studentProfile.streak} day streak</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-300" />
                      <span className="text-blue-100">Rank {studentProfile.rank}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{studentProfile.totalPoints.toLocaleString()}</p>
                <p className="text-blue-100">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-blue-600">{studentProfile.activeProjects}</p>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <div className="mt-2">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-green-600">{currentCourses.length}</p>
              <p className="text-sm text-muted-foreground">Courses in Progress</p>
              <div className="mt-2">
                <Button variant="ghost" size="sm" className="text-green-600">
                  Continue Learning <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-yellow-600">{studentProfile.achievements}</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
              <div className="mt-2">
                <Button variant="ghost" size="sm" className="text-yellow-600">
                  View Badges <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-purple-600">{studentProfile.connections}</p>
              <p className="text-sm text-muted-foreground">Connections</p>
              <div className="mt-2">
                <Button variant="ghost" size="sm" className="text-purple-600">
                  Network <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Current Courses Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span>Course Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCourses.slice(0, 2).map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{course.title}</h4>
                        <Badge className={
                          course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{event.registeredCount}/{event.maxCapacity} registered</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-2 bg-orange-600 hover:bg-orange-700">
                        Register
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Medal className="w-5 h-5 text-yellow-600" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Mentorship */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HeartHandshake className="w-5 h-5 text-pink-600" />
                  <span>Find a Mentor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mentorshipOpportunities.slice(0, 1).map((mentor) => (
                    <div key={mentor.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">{mentor.mentor}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{mentor.role}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {mentor.expertise.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{mentor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{mentor.sessions} sessions</span>
                      </div>
                      <Button size="sm" className="w-full mt-2 bg-pink-600 hover:bg-pink-700">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}