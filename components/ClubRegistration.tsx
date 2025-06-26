import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { ALL_COUNTRIES, COUNTRIES_BY_CONTINENT, getUniversitiesForCountry, getRegionsForCountry } from '../constants/orange-countries';
import { 
  ArrowRight, 
  ArrowLeft,
  Users, 
  School, 
  MapPin, 
  User,
  Mail,
  Phone,
  CheckCircle,
  FileText,
  Clock,
  Calendar,
  Lightbulb,
  Rocket,
  Flag,
  Globe
} from 'lucide-react';

interface ClubRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

type RegistrationStep = 'basic' | 'university' | 'team' | 'goals' | 'review' | 'submitted';

const focusAreas = [
  'Technology & Innovation',
  'Artificial Intelligence & Machine Learning',
  'Sustainability & Environment',
  'Healthcare & Biotechnology',
  'Education & Learning',
  'Financial Technology',
  'Social Impact',
  'Creative Industries',
  'Agriculture & Food Technology',
  'Smart Cities & IoT',
  'Cybersecurity',
  'Mobile Development',
  'Web Development',
  'Data Science & Analytics',
  'Blockchain & Cryptocurrency',
  'Renewable Energy',
  'Digital Marketing',
  'E-commerce',
  'Gaming & Entertainment',
  'Space Technology'
];

export function ClubRegistration({ onBack, onComplete }: ClubRegistrationProps) {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('basic');
  const [formData, setFormData] = useState({
    // Basic Info
    clubName: '',
    continent: '',
    country: '',
    region: '',
    city: '',
    
    // University Info
    university: '',
    customUniversity: '',
    facultyAdvisor: '',
    advisorEmail: '',
    advisorPhone: '',
    
    // Team Info
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    coLeaderName: '',
    coLeaderEmail: '',
    expectedMembers: '',
    
    // Goals & Focus
    focusAreas: [] as string[],
    description: '',
    goals: '',
    
    // Agreement
    agreeTerms: false,
    agreeCommitment: false,
    agreeSupport: false
  });

  const steps: { key: RegistrationStep; title: string; description: string }[] = [
    { key: 'basic', title: 'Basic Information', description: 'Tell us about your club location' },
    { key: 'university', title: 'University Details', description: 'University and faculty advisor information' },
    { key: 'team', title: 'Team Leadership', description: 'Club leadership and team details' },
    { key: 'goals', title: 'Goals & Focus', description: 'Your club\'s mission and focus areas' },
    { key: 'review', title: 'Review & Submit', description: 'Review your application before submission' }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocusAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleSubmit = () => {
    setCurrentStep('submitted');
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const getCountriesForContinent = (continent: string) => {
    return COUNTRIES_BY_CONTINENT[continent as keyof typeof COUNTRIES_BY_CONTINENT] || [];
  };

  const getAvailableUniversities = () => {
    if (!formData.country) return [];
    return getUniversitiesForCountry(formData.country);
  };

  const getAvailableRegions = () => {
    if (!formData.country) return [];
    return getRegionsForCountry(formData.country);
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Club Name</label>
        <Input
          placeholder="e.g., ODC Club - Your University"
          value={formData.clubName}
          onChange={(e) => handleInputChange('clubName', e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          We recommend including "ODC Club" and your university name
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Continent</label>
          <Select 
            value={formData.continent} 
            onValueChange={(value) => {
              handleInputChange('continent', value);
              handleInputChange('country', ''); // Reset country when continent changes
              handleInputChange('region', ''); // Reset region when continent changes
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your continent" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(COUNTRIES_BY_CONTINENT).map(([continent, countries]) => (
                <SelectItem key={continent} value={continent}>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>{continent} ({countries.length} countries)</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Country</label>
          <Select 
            value={formData.country} 
            onValueChange={(value) => {
              handleInputChange('country', value);
              handleInputChange('region', ''); // Reset region when country changes
            }}
            disabled={!formData.continent}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {getCountriesForContinent(formData.continent).map((country) => (
                <SelectItem key={country} value={country}>
                  <div className="flex items-center space-x-2">
                    <Flag className="w-4 h-4" />
                    <span>{country}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!formData.continent && (
            <p className="text-xs text-muted-foreground mt-1">Please select a continent first</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Region/State</label>
          <Select 
            value={formData.region} 
            onValueChange={(value) => handleInputChange('region', value)}
            disabled={!formData.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableRegions().map((region) => (
                <SelectItem key={region} value={region}>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{region}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!formData.country && (
            <p className="text-xs text-muted-foreground mt-1">Please select a country first</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">City</label>
          <Input
            placeholder="Your city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>
      </div>

      {formData.country && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Welcome to Orange {formData.country}! 🎉</h3>
          <p className="text-sm text-blue-800">
            You're joining the Orange Digital Center network in {formData.country}. 
            Our teams will connect you with local ODC resources and mentors.
          </p>
        </div>
      )}
    </div>
  );

  const renderUniversityInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">University</label>
        <Select 
          value={formData.university} 
          onValueChange={(value) => handleInputChange('university', value)}
          disabled={!formData.country}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your university" />
          </SelectTrigger>
          <SelectContent>
            {getAvailableUniversities().map((uni) => (
              <SelectItem key={uni} value={uni}>
                <div className="flex items-center space-x-2">
                  <School className="w-4 h-4" />
                  <span>{uni}</span>
                </div>
              </SelectItem>
            ))}
            <SelectItem value="other">Other (Please specify)</SelectItem>
          </SelectContent>
        </Select>
        
        {formData.university === 'other' && (
          <Input
            className="mt-2"
            placeholder="Enter your university name"
            value={formData.customUniversity}
            onChange={(e) => handleInputChange('customUniversity', e.target.value)}
          />
        )}

        {!formData.country && (
          <p className="text-xs text-muted-foreground mt-1">Please complete location information first</p>
        )}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Faculty Advisor Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          A faculty advisor is required to support and guide your ODC Club activities.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Faculty Advisor Name</label>
            <Input
              placeholder="Professor/Dr. Full Name"
              value={formData.facultyAdvisor}
              onChange={(e) => handleInputChange('facultyAdvisor', e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="advisor@university.edu"
                value={formData.advisorEmail}
                onChange={(e) => handleInputChange('advisorEmail', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number</label>
              <Input
                placeholder="+XX XXX XXX XXX"
                value={formData.advisorPhone}
                onChange={(e) => handleInputChange('advisorPhone', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamInfo = () => (
    <div className="space-y-6">
      <div className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">Club Leader Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Full Name</label>
            <Input
              placeholder="Your full name"
              value={formData.leaderName}
              onChange={(e) => handleInputChange('leaderName', e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="your.email@student.university.edu"
                value={formData.leaderEmail}
                onChange={(e) => handleInputChange('leaderEmail', e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number</label>
              <Input
                placeholder="+XX XXX XXX XXX"
                value={formData.leaderPhone}
                onChange={(e) => handleInputChange('leaderPhone', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h3 className="text-lg font-medium mb-4">Co-Leader Information (Optional)</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Co-Leader Name</label>
            <Input
              placeholder="Co-leader full name (optional)"
              value={formData.coLeaderName}
              onChange={(e) => handleInputChange('coLeaderName', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Co-Leader Email</label>
            <Input
              type="email"
              placeholder="co-leader@student.university.edu"
              value={formData.coLeaderEmail}
              onChange={(e) => handleInputChange('coLeaderEmail', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Expected Number of Members</label>
        <Select 
          value={formData.expectedMembers} 
          onValueChange={(value) => handleInputChange('expectedMembers', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="How many students do you expect to join?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10-20">10-20 members</SelectItem>
            <SelectItem value="21-30">21-30 members</SelectItem>
            <SelectItem value="31-50">31-50 members</SelectItem>
            <SelectItem value="50+">50+ members</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderGoalsAndFocus = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Focus Areas</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the areas your club will focus on (choose up to 5):
        </p>
        
        <div className="grid md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
          {focusAreas.map((area) => (
            <div 
              key={area}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.focusAreas.includes(area)
                  ? 'border-odc-orange bg-odc-orange/5'
                  : 'border-gray-200 hover:border-odc-orange/50'
              } ${formData.focusAreas.length >= 5 && !formData.focusAreas.includes(area) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (formData.focusAreas.length < 5 || formData.focusAreas.includes(area)) {
                  handleFocusAreaToggle(area);
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={formData.focusAreas.includes(area)}
                  onChange={() => {}}
                />
                <span className="text-sm font-medium">{area}</span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Selected: {formData.focusAreas.length}/5 areas
        </p>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Club Description</label>
        <Textarea
          placeholder="Describe your club's mission and what makes it unique..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Goals for First Year</label>
        <Textarea
          placeholder="What do you hope to achieve in your first year? (e.g., number of projects, events, partnerships)"
          value={formData.goals}
          onChange={(e) => handleInputChange('goals', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Club Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm font-medium">Name:</span>
              <p className="text-sm text-muted-foreground">{formData.clubName}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Location:</span>
              <p className="text-sm text-muted-foreground">
                {formData.city}, {formData.region}, {formData.country}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium">University:</span>
              <p className="text-sm text-muted-foreground">
                {formData.university === 'other' ? formData.customUniversity : formData.university}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leadership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm font-medium">Club Leader:</span>
              <p className="text-sm text-muted-foreground">{formData.leaderName}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Faculty Advisor:</span>
              <p className="text-sm text-muted-foreground">{formData.facultyAdvisor}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Expected Members:</span>
              <p className="text-sm text-muted-foreground">{formData.expectedMembers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Focus Areas & Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-sm font-medium">Focus Areas:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.focusAreas.map((area) => (
                <Badge key={area} variant="secondary">{area}</Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Description:</span>
            <p className="text-sm text-muted-foreground mt-1">{formData.description}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agreements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleInputChange('agreeTerms', checked as boolean)}
            />
            <div className="text-sm">
              <p className="font-medium">Terms and Conditions</p>
              <p className="text-muted-foreground">
                I agree to the ODC Club Hybride terms and conditions and community guidelines.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={formData.agreeCommitment}
              onCheckedChange={(checked) => handleInputChange('agreeCommitment', checked as boolean)}
            />
            <div className="text-sm">
              <p className="font-medium">Commitment Agreement</p>
              <p className="text-muted-foreground">
                I commit to actively managing this club for at least one academic year and organizing regular activities.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={formData.agreeSupport}
              onCheckedChange={(checked) => handleInputChange('agreeSupport', checked as boolean)}
            />
            <div className="text-sm">
              <p className="font-medium">Support Agreement</p>
              <p className="text-muted-foreground">
                I understand that Orange Digital Center will provide support, resources, and mentorship to help our club succeed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubmitted = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Thank you for your interest in starting an ODC Club in {formData.country}. 
        We'll review your application and get back to you within 5-7 business days.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
        <h3 className="font-medium text-blue-900 mb-2">What's Next?</h3>
        <ul className="text-sm text-blue-800 space-y-1 text-left">
          <li>• Review by Orange {formData.country} team (3-5 days)</li>
          <li>• Introduction call with your regional advisor</li>
          <li>• Access to Orange Digital Center resources</li>
          <li>• Onboarding session with other club leaders</li>
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        Redirecting to dashboard in a moment...
      </p>
    </div>
  );

  if (currentStep === 'submitted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          {renderSubmitted()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Start Your ODC Club</h1>
              <p className="text-muted-foreground">Join the global Orange Digital Center network</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-odc-orange rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">ODC Club Hybride</span>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">{steps[currentStepIndex].title}</h2>
              <span className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">{steps[currentStepIndex].description}</p>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {currentStep === 'basic' && renderBasicInfo()}
            {currentStep === 'university' && renderUniversityInfo()}
            {currentStep === 'team' && renderTeamInfo()}
            {currentStep === 'goals' && renderGoalsAndFocus()}
            {currentStep === 'review' && renderReview()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === 'review' ? (
            <Button 
              className="bg-odc-orange hover:bg-odc-orange/90"
              onClick={handleSubmit}
              disabled={!formData.agreeTerms || !formData.agreeCommitment || !formData.agreeSupport}
            >
              Submit Application
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              className="bg-odc-orange hover:bg-odc-orange/90"
              onClick={nextStep}
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