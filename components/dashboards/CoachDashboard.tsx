import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp, 
  Bell, 
  MessageSquare, 
  Users, 
  Send, 
  Paperclip, 
  Search,
  Filter,
  MoreVertical,
  Bookmark,
  StickyNote,
  Lightbulb,
  Target,
  Calendar,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Crown,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share2,
  Pin,
  Plus,
  X,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Flag,
  Clock,
  Users2,
  BookOpen,
  Rocket,
  Gift,
  Flame,
  Eye,
  Download
} from 'lucide-react';

// Mock data for badges and achievements
const badges = [
  {
    id: 1,
    name: 'First Project Submitted',
    description: 'Successfully submitted your first project',
    icon: Rocket,
    color: 'bg-blue-500',
    earned: true,
    earnedDate: '2024-12-15',
    rarity: 'common'
  },
  {
    id: 2,
    name: 'Regional Champion',
    description: 'Won first place in regional competition',
    icon: Crown,
    color: 'bg-yellow-500',
    earned: true,
    earnedDate: '2024-12-20',
    rarity: 'legendary'
  },
  {
    id: 3,
    name: 'Most Active Club',
    description: 'Led the most active club in your region',
    icon: Flame,
    color: 'bg-orange-500',
    earned: true,
    earnedDate: '2024-12-22',
    rarity: 'epic'
  },
  {
    id: 4,
    name: 'Team Builder',
    description: 'Successfully built and managed 5+ teams',
    icon: Users2,
    color: 'bg-green-500',
    earned: true,
    earnedDate: '2024-12-10',
    rarity: 'rare'
  },
  {
    id: 5,
    name: 'Innovation Master',
    description: 'Complete 10 innovative projects',
    icon: Lightbulb,
    color: 'bg-purple-500',
    earned: false,
    progress: 7,
    total: 10,
    rarity: 'epic'
  },
  {
    id: 6,
    name: 'Mentor Excellence',
    description: 'Receive 50+ positive mentorship reviews',
    icon: Heart,
    color: 'bg-pink-500',
    earned: false,
    progress: 42,
    total: 50,
    rarity: 'rare'
  }
];

// Mock leaderboard data
const leaderboard = [
  { rank: 1, name: 'Mohamed Ali', club: 'ODC Tunis', score: 2847, avatar: '/api/placeholder/32/32', trend: 'up' },
  { rank: 2, name: 'Sarah Ahmed', club: 'ODC Cairo', score: 2756, avatar: '/api/placeholder/32/32', trend: 'stable' },
  { rank: 3, name: 'You', club: 'ODC Casablanca', score: 2689, avatar: '/api/placeholder/32/32', trend: 'up', isUser: true },
  { rank: 4, name: 'Khalid Ben', club: 'ODC Rabat', score: 2634, avatar: '/api/placeholder/32/32', trend: 'down' },
  { rank: 5, name: 'Fatima Zahra', club: 'ODC Algiers', score: 2598, avatar: '/api/placeholder/32/32', trend: 'up' }
];

// Mock notifications
const notifications = [
  {
    id: 1,
    type: 'achievement',
    title: 'New Badge Earned!',
    message: 'Congratulations! You earned the "Most Active Club" badge',
    time: '2 hours ago',
    read: false,
    icon: Trophy,
    color: 'text-yellow-500'
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message from Admin',
    message: 'Monthly performance review is now available',
    time: '4 hours ago',
    read: false,
    icon: MessageSquare,
    color: 'text-blue-500'
  },
  {
    id: 3,
    type: 'system',
    title: 'Weekly Report Ready',
    message: 'Your team performance report for this week is ready to view',
    time: '1 day ago',
    read: true,
    icon: Bell,
    color: 'text-gray-500'
  },
  {
    id: 4,
    type: 'mentorship',
    title: 'Mentorship Request',
    message: 'Ahmed Hassan requested mentorship for his AI project',
    time: '2 days ago',
    read: true,
    icon: Users,
    color: 'text-green-500'
  }
];

// Mock chat conversations
const conversations = [
  {
    id: 1,
    type: 'team',
    name: 'Innovation Team Alpha',
    lastMessage: 'Great work on the prototype demo!',
    time: '5 min ago',
    unread: 3,
    avatar: '/api/placeholder/40/40',
    members: 8
  },
  {
    id: 2,
    type: 'mentorship',
    name: 'Ahmed Hassan',
    lastMessage: 'Thanks for the feedback on my project',
    time: '1 hour ago',
    unread: 0,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    type: 'admin',
    name: 'ODC Administration',
    lastMessage: 'Monthly coaching guidelines updated',
    time: '3 hours ago',
    unread: 1,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 4,
    type: '1-to-1',
    name: 'Sarah Alami',
    lastMessage: 'When can we schedule our next session?',
    time: '1 day ago',
    unread: 0,
    avatar: '/api/placeholder/40/40'
  }
];

// Mock bookmarks
const bookmarks = [
  { id: 1, title: 'Project Management Best Practices', url: '#', type: 'article' },
  { id: 2, title: 'Startup Pitch Deck Template', url: '#', type: 'resource' },
  { id: 3, title: 'Innovation Workshop Video', url: '#', type: 'video' },
  { id: 4, title: 'Team Building Exercise Guide', url: '#', type: 'guide' }
];

// Mock notes
const initialNotes = [
  { id: 1, content: 'Review Ahmed\'s project proposal by Friday', createdAt: '2024-12-20' },
  { id: 2, content: 'Prepare presentation for next month\'s demo day', createdAt: '2024-12-19' },
  { id: 3, content: 'Follow up with Cairo team about collaboration opportunity', createdAt: '2024-12-18' }
];

export function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const userScore = 2689;
  const userRank = 3;
  const weeklyIncrease = 12;

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: notes.length + 1,
        content: newNote,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setShowNoteInput(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 bg-yellow-50';
      case 'epic': return 'border-purple-400 bg-purple-50';
      case 'rare': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Badge className="bg-yellow-500 text-white">Legendary</Badge>;
      case 'epic': return <Badge className="bg-purple-500 text-white">Epic</Badge>;
      case 'rare': return <Badge className="bg-blue-500 text-white">Rare</Badge>;
      default: return <Badge variant="secondary">Common</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6 mr-80">
          {/* Next Steps Banner */}
          <Card className="mb-6 bg-gradient-to-r from-odc-orange to-orange-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Your Next Milestone</h3>
                    <p className="text-orange-100">Complete 3 more projects to unlock the "Innovation Master" badge</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold">7/10</p>
                    <p className="text-sm text-orange-100">Projects</p>
                  </div>
                  <Button className="bg-white text-odc-orange hover:bg-orange-50">
                    View Projects <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              <Progress value={70} className="mt-4 h-2 bg-white/20" />
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-orange-200/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Medal className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <Star className="w-4 h-4 mr-2" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-odc-orange data-[state=active]:text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Performance Summary */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Your Rank</p>
                        <p className="text-3xl font-bold">#{userRank}</p>
                      </div>
                      <Crown className="w-8 h-8 text-blue-200" />
                    </div>
                    <p className="text-sm text-blue-100 mt-2">National Leaderboard</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Total Score</p>
                        <p className="text-3xl font-bold">{userScore.toLocaleString()}</p>
                      </div>
                      <Zap className="w-8 h-8 text-green-200" />
                    </div>
                    <p className="text-sm text-green-100 mt-2">Points Earned</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Weekly Growth</p>
                        <p className="text-3xl font-bold">+{weeklyIncrease}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-purple-200" />
                    </div>
                    <p className="text-sm text-purple-100 mt-2">Points This Week</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Badges Earned</p>
                        <p className="text-3xl font-bold">{badges.filter(b => b.earned).length}</p>
                      </div>
                      <Award className="w-8 h-8 text-orange-200" />
                    </div>
                    <p className="text-sm text-orange-100 mt-2">Out of {badges.length} Total</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Achievements & Activity */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-odc-orange" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {badges.filter(b => b.earned).slice(0, 3).map((badge) => {
                        const IconComponent = badge.icon;
                        return (
                          <div key={badge.id} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                            <div className={`w-10 h-10 ${badge.color} rounded-full flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{badge.name}</h4>
                              <p className="text-sm text-muted-foreground">Earned {badge.earnedDate}</p>
                            </div>
                            {getRarityBadge(badge.rarity)}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-odc-orange" />
                      <span>Recent Notifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.slice(0, 4).map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div key={notification.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                            notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'
                          }`}>
                            <IconComponent className={`w-5 h-5 mt-0.5 ${notification.color}`} />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <p className="text-xs text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {badges.map((badge) => {
                  const IconComponent = badge.icon;
                  return (
                    <Card key={badge.id} className={`border-2 ${getRarityColor(badge.rarity)} hover:shadow-lg transition-all duration-300 ${
                      badge.earned ? 'transform hover:scale-105' : 'opacity-75'
                    }`}>
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4 ${
                          badge.earned ? 'shadow-lg' : 'grayscale opacity-50'
                        }`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className="font-bold mb-2">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                        
                        {badge.earned ? (
                          <div className="space-y-2">
                            {getRarityBadge(badge.rarity)}
                            <p className="text-xs text-green-600 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Earned {badge.earnedDate}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {getRarityBadge(badge.rarity)}
                            <Progress value={(badge.progress! / badge.total!) * 100} className="h-2" />
                            <p className="text-xs text-muted-foreground">{badge.progress}/{badge.total} Progress</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Achievement Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Achievement Progress</CardTitle>
                  <CardDescription>Track your journey to unlock all badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-odc-orange">{badges.filter(b => b.earned).length}</p>
                      <p className="text-sm text-muted-foreground">Badges Earned</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-500">{badges.filter(b => b.rarity === 'legendary' && b.earned).length}</p>
                      <p className="text-sm text-muted-foreground">Legendary Badges</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-500">{badges.filter(b => b.rarity === 'epic' && b.earned).length}</p>
                      <p className="text-sm text-muted-foreground">Epic Badges</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500">{Math.round((badges.filter(b => b.earned).length / badges.length) * 100)}%</p>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-odc-orange" />
                    <span>National Leaderboard</span>
                  </CardTitle>
                  <CardDescription>Top performing coaches across all regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div key={user.rank} className={`flex items-center justify-between p-4 rounded-lg ${
                        user.isUser ? 'bg-odc-orange/10 border border-odc-orange' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-amber-600 text-white' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {user.rank}
                          </div>
                          
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h4 className={`font-medium ${user.isUser ? 'text-odc-orange' : ''}`}>
                              {user.name} {user.isUser && <Badge className="ml-2 bg-odc-orange text-white">You</Badge>}
                            </h4>
                            <p className="text-sm text-muted-foreground">{user.club}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-lg font-bold">{user.score.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Points</p>
                          </div>
                          {user.trend === 'up' && <ChevronUp className="w-4 h-4 text-green-500" />}
                          {user.trend === 'down' && <ChevronDown className="w-4 h-4 text-red-500" />}
                          {user.trend === 'stable' && <div className="w-4 h-1 bg-gray-400 rounded"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Performance Insights */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span>Weekly Performance Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-green-500">+{weeklyIncrease}</p>
                      <p className="text-sm text-muted-foreground">Points This Week</p>
                      <p className="text-xs text-green-600 mt-1">↗️ +15% from last week</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-blue-500">2</p>
                      <p className="text-sm text-muted-foreground">Rank Positions Up</p>
                      <p className="text-xs text-blue-600 mt-1">🚀 Great progress!</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <p className="text-2xl font-bold text-purple-500">87%</p>
                      <p className="text-sm text-muted-foreground">Activity Score</p>
                      <p className="text-xs text-purple-600 mt-1">📈 Above average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Conversations List */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Conversations</CardTitle>
                      <Button size="sm" className="bg-odc-orange hover:bg-odc-orange/90">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Search conversations..." className="pl-10" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-96">
                      {conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedConversation === conversation.id ? 'bg-odc-orange/10 border-l-4 border-odc-orange' : ''
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={conversation.avatar} />
                                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {conversation.type === 'team' && (
                                <Badge className="absolute -top-1 -right-1 bg-green-500 text-white px-1 py-0 text-xs">
                                  {conversation.members}
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium truncate">{conversation.name}</h4>
                                <span className="text-xs text-muted-foreground">{conversation.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                              <div className="flex items-center justify-between mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {conversation.type}
                                </Badge>
                                {conversation.unread > 0 && (
                                  <Badge className="bg-odc-orange text-white px-2 py-0 text-xs">
                                    {conversation.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Chat Interface */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-lg h-full">
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/api/placeholder/40/40" />
                            <AvatarFallback>IT</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">Innovation Team Alpha</h3>
                            <p className="text-sm text-muted-foreground">8 members • Online</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <ScrollArea className="h-96 p-4">
                      <div className="space-y-4">
                        {/* Sample messages */}
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>AH</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">Ahmed Hassan</span>
                              <span className="text-xs text-muted-foreground">2:30 PM</span>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3 mt-1">
                              <p className="text-sm">Great work on the prototype demo! The AI integration is impressive.</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 justify-end">
                          <div className="flex-1 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <span className="text-xs text-muted-foreground">2:35 PM</span>
                              <span className="font-medium text-sm">You</span>
                            </div>
                            <div className="bg-odc-orange text-white rounded-lg p-3 mt-1 inline-block">
                              <p className="text-sm">Thanks! Let's schedule a follow-up session to discuss the next steps.</p>
                            </div>
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </ScrollArea>

                    <div className="border-t p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button className="bg-odc-orange hover:bg-odc-orange/90">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Sidebar */}
        <div className="fixed right-6 top-20 w-72 space-y-4 h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Quick Notes */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <StickyNote className="w-5 h-5 text-yellow-500" />
                  <span>Quick Notes</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNoteInput(!showNoteInput)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {showNoteInput && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a quick note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={addNote} className="bg-odc-orange hover:bg-odc-orange/90">
                      Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowNoteInput(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm">{note.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{note.createdAt}</span>
                      <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bookmarked Resources */}
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-blue-500" />
                <span>Bookmarks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium truncate">{bookmark.title}</h4>
                    <Badge variant="outline" className="text-xs mt-1">{bookmark.type}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-green-500" />
                <span>Club Quick Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <h4 className="font-medium text-sm text-green-700">💡 Team Motivation</h4>
                <p className="text-xs text-green-600 mt-1">Celebrate small wins to keep team morale high during long projects.</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-medium text-sm text-blue-700">🎯 Goal Setting</h4>
                <p className="text-xs text-blue-600 mt-1">Break large projects into weekly milestones for better tracking.</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <h4 className="font-medium text-sm text-purple-700">🤝 Mentorship</h4>
                <p className="text-xs text-purple-600 mt-1">Schedule regular 1-on-1s to provide personalized guidance.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}