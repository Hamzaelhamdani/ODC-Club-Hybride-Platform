import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft,
  ArrowRight,
  Users,
  GraduationCap,
  Building,
  Handshake,
  CheckCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  Target,
  Calendar,
  FileText
} from 'lucide-react';

interface OnboardingFlowProps {
  onBack: () => void;
  onComplete: () => void;
  userType?: 'student' | 'university' | 'mentor';
}

type OnboardingStep = 'selection' | 'details' | 'preferences' | 'confirmation';

const userTypes = [
  {
    key: 'student' as const,
    title: 'Student',
    description: 'Join or create a club, work on projects, compete',
    icon: GraduationCap,
    color: 'bg-odc-orange',
    benefits: [
      'Access to mentorship and resources',
      'Real-world project experience',
      'Network with peers globally',
      'Competition opportunities',
      'Skill development programs'
    ]
  },
  {
    key: 'university' as const,
    title: 'University',
    description: 'Partner with ODC to establish clubs on campus',
    icon: Building,
    color: 'bg-blue-600',
    benefits: [
      'Enhanced student engagement',
      'Industry partnerships',
      'Innovation ecosystem development',
      'International recognition',
      'Faculty development programs'
    ]
  },
  {
    key: 'mentor' as const,
    title: 'Mentor/Expert',
    description: 'Guide and support the next generation',
    icon: Handshake,
    color: 'bg-green-600',
    benefits: [
      'Give back to the community',
      'Discover emerging talent',
      'Expand professional network',
      'Shape future innovations',
      'Flexible engagement options'
    ]
  }
];

const interestAreas = [
  'Artificial Intelligence & Machine Learning',
  'Fintech & Blockchain',
  'Healthcare & Biotechnology',
  'Sustainability & Green Tech',
  'Education Technology',
  'IoT & Smart Cities',
  'Mobile & Web Development',
  'Design & User Experience',
  'Business Development',
  'Social Innovation'
];

const availabilityOptions = [
  '1-2 hours per week',
  '3-5 hours per week',
  '6-10 hours per week',
  '10+ hours per week'
];

export function OnboardingFlow({ onBack, onComplete, userType: initialUserType }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialUserType ? 'details' : 'selection');
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'university' | 'mentor' | null>(initialUserType || null);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Student specific
    university: '',
    major: '',
    year: '',
    hasClub: '',
    
    // University specific
    institutionName: '',
    position: '',
    department: '',
    studentsCount: '',
    
    // Mentor specific
    company: '',
    jobTitle: '',
    experience: '',
    expertise: [] as string[],
    
    // Common
    interests: [] as string[],
    availability: '',
    goals: '',
    hearAbout: '',
    agreeTerms: false,
    agreeUpdates: false
  });

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    const steps: OnboardingStep[] = ['selection', 'details', 'preferences', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: OnboardingStep[] = ['selection', 'details', 'preferences', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Submitting onboarding data:', { selectedUserType, formData });
    onComplete();
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">How do you want to get involved?</h2>
        <p className="text-muted-foreground">Choose the role that best describes you</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {userTypes.map((type) => (
          <Card 
            key={type.key}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedUserType === type.key ? 'ring-2 ring-odc-orange shadow-lg' : ''
            }`}
            onClick={() => setSelectedUserType(type.key)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <type.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-2">{type.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
              
              <div className="space-y-2">
                {type.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-xs text-left">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPersonalDetails = () => {
    if (!selectedUserType) return null;

    const userTypeData = userTypes.find(type => type.key === selectedUserType)!;

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 ${userTypeData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <userTypeData.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
          <p className="text-muted-foreground">Help us personalize your ODC experience</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name</label>
              <Input
                placeholder="Your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name</label>
              <Input
                placeholder="Your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number</label>
              <Input
                placeholder="+XX XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Role-specific fields */}
          {selectedUserType === 'student' && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-medium">Academic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">University</label>
                  <Input
                    placeholder="Your university name"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Major/Field of Study</label>
                  <Input
                    placeholder="Computer Science, Business, etc."
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Academic Year</label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                      <SelectItem value="graduate">Graduate Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Does your university have an ODC Club?</label>
                  <Select value={formData.hasClub} onValueChange={(value) => handleInputChange('hasClub', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, and I want to join</SelectItem>
                      <SelectItem value="no">No, I want to start one</SelectItem>
                      <SelectItem value="unsure">I'm not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {selectedUserType === 'university' && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-medium">Institution Information</h3>
              <div>
                <label className="text-sm font-medium mb-2 block">Institution Name</label>
                <Input
                  placeholder="University/College name"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange('institutionName', e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Position</label>
                  <Input
                    placeholder="Dean, Professor, Admin, etc."
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Department</label>
                  <Input
                    placeholder="Computer Science, Engineering, etc."
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Approximate Student Count</label>
                <Select value={formData.studentsCount} onValueChange={(value) => handleInputChange('studentsCount', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1000">Less than 1,000</SelectItem>
                    <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                    <SelectItem value="5000-10000">5,000 - 10,000</SelectItem>
                    <SelectItem value="10000+">More than 10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedUserType === 'mentor' && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-medium">Professional Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company/Organization</label>
                  <Input
                    placeholder="Your current company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Title</label>
                  <Input
                    placeholder="Your current position"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Years of Experience</label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="4-7">4-7 years</SelectItem>
                    <SelectItem value="8-15">8-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Interests & Preferences</h2>
        <p className="text-muted-foreground">Help us match you with relevant opportunities</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="text-sm font-medium mb-4 block">Areas of Interest (select all that apply):</label>
          <div className="grid md:grid-cols-2 gap-3">
            {interestAreas.map((interest) => (
              <div 
                key={interest}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.interests.includes(interest)
                    ? 'border-odc-orange bg-odc-orange/5'
                    : 'border-gray-200 hover:border-odc-orange/50'
                }`}
                onClick={() => handleInterestToggle(interest)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={formData.interests.includes(interest)}
                    onChange={() => {}}
                  />
                  <span className="text-sm">{interest}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Availability</label>
          <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
            <SelectTrigger>
              <SelectValue placeholder="How much time can you commit?" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Goals & Expectations</label>
          <Textarea
            placeholder="What do you hope to achieve through ODC Club Hybride? What are your main goals?"
            value={formData.goals}
            onChange={(e) => handleInputChange('goals', e.target.value)}
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">How did you hear about ODC Club Hybride?</label>
          <Select value={formData.hearAbout} onValueChange={(value) => handleInputChange('hearAbout', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">ODC Website</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="university">University Event</SelectItem>
              <SelectItem value="friend">Friend/Colleague</SelectItem>
              <SelectItem value="mentor">Mentor/Teacher</SelectItem>
              <SelectItem value="competition">Competition/Event</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Almost Done!</h2>
        <p className="text-muted-foreground">Review your information and complete your registration</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>
                <p className="text-muted-foreground">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p className="text-muted-foreground">{formData.email}</p>
              </div>
              <div>
                <span className="font-medium">Role:</span>
                <p className="text-muted-foreground">
                  {userTypes.find(type => type.key === selectedUserType)?.title}
                </p>
              </div>
              <div>
                <span className="font-medium">Availability:</span>
                <p className="text-muted-foreground">{formData.availability}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-sm">Interests:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.interests.slice(0, 3).map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {formData.interests.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{formData.interests.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
              />
              <div className="text-sm">
                <p className="font-medium">Terms and Conditions</p>
                <p className="text-muted-foreground">
                  I agree to the ODC Club Hybride terms of service and privacy policy.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                checked={formData.agreeUpdates}
                onCheckedChange={(checked) => handleInputChange('agreeUpdates', checked as boolean)}
              />
              <div className="text-sm">
                <p className="font-medium">Communication Preferences</p>
                <p className="text-muted-foreground">
                  I'd like to receive updates about events, opportunities, and news from ODC Club Hybride.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• You'll receive a welcome email with next steps</li>
            <li>• We'll match you with relevant opportunities</li>
            <li>• Access to ODC resources and community</li>
            <li>• Invitation to upcoming events and programs</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-odc-orange rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">Get Involved</span>
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {currentStep === 'selection' && renderUserTypeSelection()}
            {currentStep === 'details' && renderPersonalDetails()}
            {currentStep === 'preferences' && renderPreferences()}
            {currentStep === 'confirmation' && renderConfirmation()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 'selection' || (currentStep === 'details' && initialUserType)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === 'confirmation' ? (
            <Button 
              className="bg-odc-orange hover:bg-odc-orange/90"
              onClick={handleSubmit}
              disabled={!formData.agreeTerms}
            >
              Complete Registration
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              className="bg-odc-orange hover:bg-odc-orange/90"
              onClick={nextStep}
              disabled={!selectedUserType}
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}