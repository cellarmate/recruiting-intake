import React, { useState, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BusinessPlanningFormData } from '../types/formTypes';
import { saveFormData, loadFormData, clearFormData, hasFormData } from '../utils/localStorage';
import { printForm } from '../utils/printForm';
import ProgressIndicator from './ProgressIndicator';
import {
  FormContainer,
  FormHeader,
  FormSection,
  SectionTitle,
  SectionSubtitle,
  FormRow,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  CheckboxContainer,
  Checkbox,
  RadioContainer,
  RadioOption,
  Radio,
  Button,
  ButtonGroup,
  Divider,
  NumberedList,
  NumberedItem,
  NumberBadge,
  SectionNavigation,
  SectionIndicator,
  FormFooter,
} from './FormElements';

const BusinessPlanningForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BusinessPlanningFormData>();
  const [currentSection, setCurrentSection] = useState(1);
  const [hasSavedData, setHasSavedData] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  // Total number of sections in the form
  const totalSections = 12;
  
  // Load saved form data on component mount
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      reset(savedData);
      setHasSavedData(true);
    }
  }, [reset]);
  
  // Watch for form changes and save to localStorage
  const formValues = watch();
  useEffect(() => {
    if (Object.keys(formValues).length > 0) {
      saveFormData(formValues);
      setHasSavedData(true);
    }
  }, [formValues]);

  // Handle navigation between sections
  const goToNextSection = useCallback(() => {
    if (currentSection < totalSections) {
      setAnimate(false);
      setTimeout(() => {
        setCurrentSection(prev => prev + 1);
        setAnimate(true);
      }, 50);
    }
  }, [currentSection, totalSections]);

  const goToPrevSection = useCallback(() => {
    if (currentSection > 1) {
      setAnimate(false);
      setTimeout(() => {
        setCurrentSection(prev => prev - 1);
        setAnimate(true);
      }, 50);
    }
  }, [currentSection]);
  
  const onSubmit: SubmitHandler<BusinessPlanningFormData> = (data) => {
    console.log(data)
;
  
 // Save the final data
    saveFormData(data);
    // Show success message
    alert('Form submitted successfully!');
    // Print the form
    printForm(data);
  };
  
  // Handle clearing the form data
  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      clearFormData();
      reset({});
    setHasSavedData(false);
    }
  };

  // Handle printing the form
  const handlePrintForm = () => {
    printForm(formValues);
  };
  
  return (
    <FormContainer>
      <FormHeader>
        <img src={`${process.env.PUBLIC_URL}/logos/UMortgage_Logo.png`} alt="UMortgage Logo" className="logo" />
        <h1>Business Planning Form</h1>
        <p>Complete this form to develop your business strategy and share it with your coach.</p>
        {hasSavedData && <p style={{ color: '#7B68EE', marginTop: '10px' }}>Your progress is automatically saved as you fill out the form.</p>}
      </FormHeader>
      
      <ProgressIndicator currentSection={currentSection} totalSections={totalSections} />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <FormRow>
          <FormGroup width="1">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              {...register('name', { required: 'Name is required' })} 
              placeholder="Your full name"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </FormGroup>
          
          <FormGroup width="1">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date" 
              {...register('date', { required: 'Date is required' })} 
            />
            {errors.date && <p>{errors.date.message}</p>}
          </FormGroup>
        </FormRow>
        
        <Divider />
        
        {/* Section 1: Critical Review */}
        <FormSection>
          <SectionTitle>1. Critical Review of Your Business and Behaviors</SectionTitle>
          
          <SectionSubtitle>What's working?</SectionSubtitle>
          <FormGroup>
            <Label htmlFor="workingItems1">1.</Label>
            <Input 
              id="workingItems1" 
              {...register('workingItems.0')} 
              placeholder="What's working well in your business?"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="workingItems2">2.</Label>
            <Input 
              id="workingItems2" 
              {...register('workingItems.1')} 
              placeholder="Another thing that's working well"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="workingItems3">3.</Label>
            <Input 
              id="workingItems3" 
              {...register('workingItems.2')} 
              placeholder="One more thing that's working well"
            />
          </FormGroup>
          
          <SectionSubtitle>What's not working?</SectionSubtitle>
          <FormGroup>
            <Label htmlFor="notWorkingItems1">1.</Label>
            <Input 
              id="notWorkingItems1" 
              {...register('notWorkingItems.0')} 
              placeholder="What's not working in your business?"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="notWorkingItems2">2.</Label>
            <Input 
              id="notWorkingItems2" 
              {...register('notWorkingItems.1')} 
              placeholder="Another thing that's not working"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="notWorkingItems3">3.</Label>
            <Input 
              id="notWorkingItems3" 
              {...register('notWorkingItems.2')} 
              placeholder="One more thing that's not working"
            />
          </FormGroup>
          
          <SectionSubtitle>What do I need to add?</SectionSubtitle>
          <FormGroup>
            <Label htmlFor="addItems1">1.</Label>
            <Input 
              id="addItems1" 
              {...register('addItems.0')} 
              placeholder="What do you need to add to your business?"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="addItems2">2.</Label>
            <Input 
              id="addItems2" 
              {...register('addItems.1')} 
              placeholder="Another thing you need to add"
            />
          </FormGroup>
          
          <SectionSubtitle>What should I stop doing?</SectionSubtitle>
          <FormGroup>
            <Label htmlFor="stopItems1">1.</Label>
            <Input 
              id="stopItems1" 
              {...register('stopItems.0')} 
              placeholder="What should you stop doing?"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="stopItems2">2.</Label>
            <Input 
              id="stopItems2" 
              {...register('stopItems.1')} 
              placeholder="Another thing you should stop doing"
            />
          </FormGroup>
          
          <SectionSubtitle>What do I need to learn?</SectionSubtitle>
          <FormGroup>
            <Label htmlFor="learnItems1">1.</Label>
            <Input 
              id="learnItems1" 
              {...register('learnItems.0')} 
              placeholder="What do you need to learn?"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="learnItems2">2.</Label>
            <Input 
              id="learnItems2" 
              {...register('learnItems.1')} 
              placeholder="Another thing you need to learn"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 2: Lead Generation */}
        <FormSection>
          <SectionTitle>2. Lead Generation</SectionTitle>
          
          <SectionSubtitle>Define how your company generates leads either department, personal or as a team.</SectionSubtitle>
          
          <SectionSubtitle>How many leads do you generate?</SectionSubtitle>
          <FormRow>
            <FormGroup>
              <Label htmlFor="leadsPerDay">Per Day:</Label>
              <Input 
                id="leadsPerDay" 
                type="number" 
                {...register('leadsPerDay')} 
                placeholder="0"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="leadsPerWeek">Per Week:</Label>
              <Input 
                id="leadsPerWeek" 
                type="number" 
                {...register('leadsPerWeek')} 
                placeholder="0"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="leadsPerMonth">Per Month:</Label>
              <Input 
                id="leadsPerMonth" 
                type="number" 
                {...register('leadsPerMonth')} 
                placeholder="0"
              />
            </FormGroup>
          </FormRow>
          
          <SectionSubtitle>What methods do you use to generate leads?</SectionSubtitle>
          <FormGroup>
            <CheckboxContainer>
              <Checkbox id="coldCalling" {...register('leadMethods.coldCalling')} />
              <Label htmlFor="coldCalling">Cold Calling</Label>
            </CheckboxContainer>
            
            <CheckboxContainer>
              <Checkbox id="emailCampaigns" {...register('leadMethods.emailCampaigns')} />
              <Label htmlFor="emailCampaigns">Email Campaigns</Label>
            </CheckboxContainer>
            
            <CheckboxContainer>
              <Checkbox id="socialMedia" {...register('leadMethods.socialMedia')} />
              <Label htmlFor="socialMedia">Social Media Outreach</Label>
            </CheckboxContainer>
            
            <CheckboxContainer>
              <Checkbox id="referrals" {...register('leadMethods.referrals')} />
              <Label htmlFor="referrals">Referrals</Label>
            </CheckboxContainer>
            
            <CheckboxContainer>
              <Checkbox id="networkingEvents" {...register('leadMethods.networkingEvents')} />
              <Label htmlFor="networkingEvents">Networking Events</Label>
            </CheckboxContainer>
            
            <CheckboxContainer>
              <Checkbox id="other" {...register('leadMethods.other')} />
              <Label htmlFor="other">Other</Label>
            </CheckboxContainer>
            
            <FormGroup>
              <Label htmlFor="otherSpecify">Please specify:</Label>
              <Input 
                id="otherSpecify" 
                {...register('leadMethods.otherSpecify')} 
                placeholder="Other lead generation methods"
              />
            </FormGroup>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="mostEffectiveLeadMethod">Which lead generation method has been most effective for you?</Label>
            <Input 
              id="mostEffectiveLeadMethod" 
              {...register('mostEffectiveLeadMethod')} 
              placeholder="Most effective lead generation method"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="leadAreaFocus">What area needs the most focus?</Label>
            <Input 
              id="leadAreaFocus" 
              {...register('leadAreaFocus')} 
              placeholder="Area that needs the most focus"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 3: Outbound Contacts */}
        <FormSection>
          <SectionTitle>3. Outbound Contacts</SectionTitle>
          
          <SectionSubtitle>How many outbound contacts do you make?</SectionSubtitle>
          <FormRow>
            <FormGroup>
              <Label htmlFor="contactsPerDay">Per Day:</Label>
              <Input 
                id="contactsPerDay" 
                type="number" 
                {...register('contactsPerDay')} 
                placeholder="0"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="contactsPerWeek">Per Week:</Label>
              <Input 
                id="contactsPerWeek" 
                type="number" 
                {...register('contactsPerWeek')} 
                placeholder="0"
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <Label htmlFor="contactChallenges">What challenges do you face in making outbound contacts?</Label>
            <TextArea 
              id="contactChallenges" 
              {...register('contactChallenges')} 
              placeholder="Describe the challenges you face"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="appointmentObjection">What is your number one objection to an appointment?</Label>
            <Input 
              id="appointmentObjection" 
              {...register('appointmentObjection')} 
              placeholder="Number one objection"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="appointmentHook">What is your bait (hook) for securing an appointment?</Label>
            <Input 
              id="appointmentHook" 
              {...register('appointmentHook')} 
              placeholder="Your hook for securing appointments"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 4: Sales Conversion */}
        <FormSection>
          <SectionTitle>4. Sales Conversion</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="conversionRatio">What is your current conversion ratio (leads converted to sales)?</Label>
            <Input 
              id="conversionRatio" 
              {...register('conversionRatio')} 
              placeholder="e.g., 25%"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="conversionObstacles">What obstacles do you encounter during the conversion process?</Label>
            <TextArea 
              id="conversionObstacles" 
              {...register('conversionObstacles')} 
              placeholder="Describe the obstacles you encounter"
            />
          </FormGroup>
          
          <SectionSubtitle>What strategies do you use to improve your conversion rate?</SectionSubtitle>
          <FormGroup>
            <Label htmlFor="conversionStrategies1">1.</Label>
            <Input 
              id="conversionStrategies1" 
              {...register('conversionStrategies.0')} 
              placeholder="Strategy 1"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="conversionStrategies2">2.</Label>
            <Input 
              id="conversionStrategies2" 
              {...register('conversionStrategies.1')} 
              placeholder="Strategy 2"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="conversionStrategies3">3.</Label>
            <Input 
              id="conversionStrategies3" 
              {...register('conversionStrategies.2')} 
              placeholder="Strategy 3"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 5: Commission/Sales Structure */}
        <FormSection>
          <SectionTitle>5. Commission/Sales Structure</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="averageCommission">What is your average commission/revenue generated per sale or transaction?</Label>
            <Input 
              id="averageCommission" 
              {...register('averageCommission')} 
              placeholder="e.g., $1,000"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="highestTransactionSource">Where do your highest transaction values come from?</Label>
            <Input 
              id="highestTransactionSource" 
              {...register('highestTransactionSource')} 
              placeholder="Source of highest transaction values"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="increaseCommissionStrategy">Strategically, what can you do to increase your average commission?</Label>
            <TextArea 
              id="increaseCommissionStrategy" 
              {...register('increaseCommissionStrategy')} 
              placeholder="Strategies to increase average commission"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="unprofitableSegments">Which segments of your book of business are unprofitable or challenging, and should be reconsidered or stopped?</Label>
            <TextArea 
              id="unprofitableSegments" 
              {...register('unprofitableSegments')} 
              placeholder="Unprofitable or challenging segments"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 6: Work Hours */}
        <FormSection>
          <SectionTitle>6. Work Hours</SectionTitle>
          
          <FormGroup>
            <Label>How many hours do you work on average per week?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="workHours1" 
                  value="1-20 hours" 
                  {...register('workHoursRange')} 
                />
                <Label htmlFor="workHours1">1-20 hours</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="workHours2" 
                  value="21-40 hours" 
                  {...register('workHoursRange')} 
                />
                <Label htmlFor="workHours2">21-40 hours</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="workHours3" 
                  value="41-60 hours" 
                  {...register('workHoursRange')} 
                />
                <Label htmlFor="workHours3">41-60 hours</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="workHours4" 
                  value="61+ hours" 
                  {...register('workHoursRange')} 
                />
                <Label htmlFor="workHours4">61+ hours</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="effectiveHoursPercentage">What percentage of your work hours are highly effective?</Label>
            <Input 
              id="effectiveHoursPercentage" 
              type="number" 
              min="0" 
              max="100" 
              {...register('effectiveHoursPercentage')} 
              placeholder="e.g., 75"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Do you feel your current work schedule allows for an optimal work-life balance?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="workLifeBalanceYes" 
                  value="Yes" 
                  {...register('workLifeBalance')} 
                />
                <Label htmlFor="workLifeBalanceYes">Yes</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="workLifeBalanceNo" 
                  value="No" 
                  {...register('workLifeBalance')} 
                />
                <Label htmlFor="workLifeBalanceNo">No</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="workLifeBalanceChanges">If not, what changes would help you achieve a better balance?</Label>
            <TextArea 
              id="workLifeBalanceChanges" 
              {...register('workLifeBalanceChanges')} 
              placeholder="Changes to improve work-life balance"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 7: Sales Tools & Resources */}
        <FormSection>
          <SectionTitle>7. Sales Tools & Resources</SectionTitle>
          
          <FormGroup>
            <Label>Do you use a CRM system for tracking leads and managing customer interactions?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="usesCRMYes" 
                  value="Yes" 
                  {...register('usesCRM')} 
                />
                <Label htmlFor="usesCRMYes">Yes</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="usesCRMNo" 
                  value="No" 
                  {...register('usesCRM')} 
                />
                <Label htmlFor="usesCRMNo">No</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>How effective is the CRM system in helping you manage your sales process?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="crmEffectiveness1" 
                  value="Very Effective" 
                  {...register('crmEffectiveness')} 
                />
                <Label htmlFor="crmEffectiveness1">Very Effective</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="crmEffectiveness2" 
                  value="Somewhat Effective" 
                  {...register('crmEffectiveness')} 
                />
                <Label htmlFor="crmEffectiveness2">Somewhat Effective</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="crmEffectiveness3" 
                  value="Neutral" 
                  {...register('crmEffectiveness')} 
                />
                <Label htmlFor="crmEffectiveness3">Neutral</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="crmEffectiveness4" 
                  value="Somewhat Ineffective" 
                  {...register('crmEffectiveness')} 
                />
                <Label htmlFor="crmEffectiveness4">Somewhat Ineffective</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="crmEffectiveness5" 
                  value="Very Ineffective" 
                  {...register('crmEffectiveness')} 
                />
                <Label htmlFor="crmEffectiveness5">Very Ineffective</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="additionalTools">What additional tools or resources would help you improve your sales performance?</Label>
            <TextArea 
              id="additionalTools" 
              {...register('additionalTools')} 
              placeholder="Additional tools or resources needed"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 8: Training & Development */}
        <FormSection>
          <SectionTitle>8. Training & Development</SectionTitle>
          
          <FormGroup>
            <Label>How often do you participate in sales training programs?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="trainingFrequency1" 
                  value="Never" 
                  {...register('trainingFrequency')} 
                />
                <Label htmlFor="trainingFrequency1">Never</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="trainingFrequency2" 
                  value="Rarely (1-2 times per year)" 
                  {...register('trainingFrequency')} 
                />
                <Label htmlFor="trainingFrequency2">Rarely (1-2 times per year)</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="trainingFrequency3" 
                  value="Occasionally (3-5 times per year)" 
                  {...register('trainingFrequency')} 
                />
                <Label htmlFor="trainingFrequency3">Occasionally (3-5 times per year)</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="trainingFrequency4" 
                  value="Regularly (6+ times per year)" 
                  {...register('trainingFrequency')} 
                />
                <Label htmlFor="trainingFrequency4">Regularly (6+ times per year)</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>How much time per week do you work on your business, not in your business?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="businessWorkHours1" 
                  value="0 hours" 
                  {...register('businessWorkHours')} 
                />
                <Label htmlFor="businessWorkHours1">0 hours</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="businessWorkHours2" 
                  value="1-2 hours" 
                  {...register('businessWorkHours')} 
                />
                <Label htmlFor="businessWorkHours2">1-2 hours</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="businessWorkHours3" 
                  value="3-5 hours" 
                  {...register('businessWorkHours')} 
                />
                <Label htmlFor="businessWorkHours3">3-5 hours</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="businessWorkHours4" 
                  value="6-9 hours" 
                  {...register('businessWorkHours')} 
                />
                <Label htmlFor="businessWorkHours4">6-9 hours</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="trainingFocusArea">What specific area of your business do you need to focus on and receive more training on moving forward?</Label>
            <TextArea 
              id="trainingFocusArea" 
              {...register('trainingFocusArea')} 
              placeholder="Area needing focus and training"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Do you review your scorecard weekly, and is it in your calendar?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="reviewsScorecardYes" 
                  value="Yes" 
                  {...register('reviewsScorecard')} 
                />
                <Label htmlFor="reviewsScorecardYes">Yes</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="reviewsScorecardNo" 
                  value="No" 
                  {...register('reviewsScorecard')} 
                />
                <Label htmlFor="reviewsScorecardNo">No</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>Do you have a monthly review of goals and key objectives in your calendar?</Label>
            <RadioContainer>
              <RadioOption>
                <Radio 
                  id="monthlyGoalReviewYes" 
                  value="Yes" 
                  {...register('monthlyGoalReview')} 
                />
                <Label htmlFor="monthlyGoalReviewYes">Yes</Label>
              </RadioOption>
              
              <RadioOption>
                <Radio 
                  id="monthlyGoalReviewNo" 
                  value="No" 
                  {...register('monthlyGoalReview')} 
                />
                <Label htmlFor="monthlyGoalReviewNo">No</Label>
              </RadioOption>
            </RadioContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="hasTeam">Do you have a team?</Label>
            <Input 
              id="hasTeam" 
              {...register('hasTeam')} 
              placeholder="Yes/No"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="teamChanges">If so, do you have any hires you need to make or any restructuring that needs to happen? If not, is it time to hire and if so what is the metric to measure when to do so?</Label>
            <TextArea 
              id="teamChanges" 
              {...register('teamChanges')} 
              placeholder="Team changes or hiring plans"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 9: Income and Savings Goals */}
        <FormSection>
          <SectionTitle>9. Income and Savings Goals</SectionTitle>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="incomeGoal">Income Goal (Low):</Label>
              <Input 
                id="incomeGoal" 
                {...register('incomeGoal')} 
                placeholder="$"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="revenueGoal">Gross Revenue Goal (Low):</Label>
              <Input 
                id="revenueGoal" 
                {...register('revenueGoal')} 
                placeholder="$"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="unitsRequired">Units Required:</Label>
              <Input 
                id="unitsRequired" 
                {...register('unitsRequired')} 
                placeholder="#"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="leadsRequired">Leads Required:</Label>
              <Input 
                id="leadsRequired" 
                {...register('leadsRequired')} 
                placeholder="#"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="contactsRequired">Contacts Required:</Label>
              <Input 
                id="contactsRequired" 
                {...register('contactsRequired')} 
                placeholder="#"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="conversionPercentage">Conversion Percentage:</Label>
              <Input 
                id="conversionPercentage" 
                {...register('conversionPercentage')} 
                placeholder="%"
              />
            </FormGroup>
          </FormRow>
          
          <SectionSubtitle>Total Expenses:</SectionSubtitle>
          <FormRow>
            <FormGroup>
              <Label htmlFor="expensePeople">People:</Label>
              <Input 
                id="expensePeople" 
                {...register('expensePeople')} 
                placeholder="$"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="expenseRent">Rent:</Label>
              <Input 
                id="expenseRent" 
                {...register('expenseRent')} 
                placeholder="$"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="expenseMarketing">Marketing:</Label>
              <Input 
                id="expenseMarketing" 
                {...register('expenseMarketing')} 
                placeholder="$"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="expenseCompliance">Compliance:</Label>
              <Input 
                id="expenseCompliance" 
                {...register('expenseCompliance')} 
                placeholder="$"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="expenseOther">Other:</Label>
              <Input 
                id="expenseOther" 
                {...register('expenseOther')} 
                placeholder="$"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="grossRevenue">Gross Revenue (Make on its own):</Label>
              <Input 
                id="grossRevenue" 
                {...register('grossRevenue')} 
                placeholder="$"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="profit">Minus Expenses Equals Profit:</Label>
              <Input 
                id="profit" 
                {...register('profit')} 
                placeholder="$"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="savingsGoal">Savings Goal:</Label>
              <Input 
                id="savingsGoal" 
                {...register('savingsGoal')} 
                placeholder="$"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="hoursWorkedGoal">Hours Worked Goal:</Label>
              <Input 
                id="hoursWorkedGoal" 
                {...register('hoursWorkedGoal')} 
                placeholder="#"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="familyGoal">Family/Relationship Goal:</Label>
              <Input 
                id="familyGoal" 
                {...register('familyGoal')} 
                placeholder="Your goal"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="givingGoal">Giving Goal:</Label>
              <Input 
                id="givingGoal" 
                {...register('givingGoal')} 
                placeholder="Your goal"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="vacationGoal">Vacation Goal:</Label>
              <Input 
                id="vacationGoal" 
                {...register('vacationGoal')} 
                placeholder="Your goal"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="readingGoal">Reading Goal:</Label>
              <Input 
                id="readingGoal" 
                {...register('readingGoal')} 
                placeholder="Your goal"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="physicalGoal">Physical Goal:</Label>
              <Input 
                id="physicalGoal" 
                {...register('physicalGoal')} 
                placeholder="Your goal"
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <Divider />
        
        {/* Section 10: Goals Recap */}
        <FormSection>
          <SectionTitle>10. Goals Recap</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="goalsImportance">Why are these goals important to you?</Label>
            <TextArea 
              id="goalsImportance" 
              {...register('goalsImportance')} 
              placeholder="Explain why these goals matter to you"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="goalsAccomplishmentEffect">What would accomplishing these goals do for you and your family?</Label>
            <TextArea 
              id="goalsAccomplishmentEffect" 
              {...register('goalsAccomplishmentEffect')} 
              placeholder="Describe the impact of achieving these goals"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="workWorthIt">Is the work worth it?</Label>
            <Input 
              id="workW
orthIt" 
              {...register('workWorthIt')} 
              placeholder="Yes/No"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="workPreventionFactors">What would prevent you from doing the work?</Label>
            <TextArea 
              id="workPreventionFactors" 
              {...register('workPreventionFactors')} 
              placeholder="Factors that might prevent you from doing the work"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="accountabilityMeasures">What habits or accountability can you put in place to stay on track?</Label>
            <TextArea 
              id="accountabilityMeasures" 
              {...register('accountabilityMeasures')} 
              placeholder="Habits or accountability measures"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="ninetyDayCommitment">Can you commit to the work required for the next 90 days?</Label>
            <Input 
              id="ninetyDayCommitment" 
              {...register('ninetyDayCommitment')} 
              placeholder="Yes/No"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="goalsBelief">Do you believe it's possible?</Label>
            <Input 
              id="goalsBelief" 
              {...register('goalsBelief')} 
              placeholder="Yes/No"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="goalsToChange">If not what goals or objectives do you need to change?</Label>
            <TextArea 
              id="goalsToChange" 
              {...register('goalsToChange')} 
              placeholder="Goals or objectives that need to be changed"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 11: Short Term Goals */}
        <FormSection>
          <SectionTitle>11. Define Specific Short Term Goals</SectionTitle>
          <SectionSubtitle>Top 3 measurable goals for next quarter with action for each</SectionSubtitle>
          
          <FormGroup>
            <Label htmlFor="shortTermGoals1">1.</Label>
            <Input 
              id="shortTermGoals1" 
              {...register('shortTermGoals.0.goal')} 
              placeholder="Goal 1"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="shortTermGoals1Action">Action to take and measure:</Label>
            <TextArea 
              id="shortTermGoals1Action" 
              {...register('shortTermGoals.0.action')} 
              placeholder="Action for Goal 1"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="shortTermGoals2">2.</Label>
            <Input 
              id="shortTermGoals2" 
              {...register('shortTermGoals.1.goal')} 
              placeholder="Goal 2"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="shortTermGoals2Action">Action to take and measure:</Label>
            <TextArea 
              id="shortTermGoals2Action" 
              {...register('shortTermGoals.1.action')} 
              placeholder="Action for Goal 2"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="shortTermGoals3">3.</Label>
            <Input 
              id="shortTermGoals3" 
              {...register('shortTermGoals.2.goal')} 
              placeholder="Goal 3"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="shortTermGoals3Action">Action to take and measure:</Label>
            <TextArea 
              id="shortTermGoals3Action" 
              {...register('shortTermGoals.2.action')} 
              placeholder="Action for Goal 3"
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Section 12: Vision */}
        <FormSection>
          <SectionTitle>12. Vision</SectionTitle>
          <SectionSubtitle>Write out your 3 year and 5 year vision in paragraph form. Include who will be a part of it, how you will feel when you accomplish it and what about this vision and life matters to you in 3 and 5 years.</SectionSubtitle>
          
          <FormGroup>
            <Label htmlFor="threeYearVision">3 year vision</Label>
            <TextArea 
              id="threeYearVision" 
              {...register('threeYearVision')} 
              placeholder="Your 3 year vision"
              rows={6}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="fiveYearVision">5 year vision</Label>
            <TextArea 
              id="fiveYearVision" 
              {...register('fiveYearVision')} 
              placeholder="Your 5 year vision"
              rows={6}
            />
          </FormGroup>
        </FormSection>
        
        <Divider />
        
        {/* Implementation Items */}
        <FormSection>
          <SectionTitle>TOP 10 ITEMS TO IMPLEMENT</SectionTitle>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Item</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Speed of Implementation (Scale of 1-10)</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Scale of Impact On Business</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Total Score</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Priority Order</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <Input {...register(`implementationItems.${index}.item`)} placeholder={`Item ${index + 1}`} />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <Input type="number" min="1" max="10" {...register(`implementationItems.${index}.speedScore`)} />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <Input type="number" min="1" max="10" {...register(`implementationItems.${index}.impactScore`)} />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <Input {...register(`implementationItems.${index}.totalScore`)} />
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    <Input type="number" min="1" max="10" {...register(`implementationItems.${index}.priority`)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FormSection>
        
        <ButtonGroup>
          <Button type="submit">Submit Form</Button>
          <Button type="button" variant="outline" onClick={handleClearForm}>Clear Form</Button>
          <Button type="button" variant="secondary" onClick={handlePrintForm}>Print Form</Button>
          <Button type="reset" variant="outline">Reset Changes</Button>
        </ButtonGroup>
      </form>
      
      <FormFooter>
        <img src={`${process.env.PUBLIC_URL}/logos/UMortgage_Bug.png`} alt="UMortgage" />
        <p>© 2025 UMortgage Business Planning Form. All information submitted is confidential.</p>
      </FormFooter>
    </FormContainer>
  );
};

export default BusinessPlanningForm;
