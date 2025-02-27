/**
 * Interface for the Business Planning Form data
 */
export interface BusinessPlanningFormData {
  // Personal Info
  name: string;
  date: string;
  
  // Section 1: Critical Review
  workingItems?: string[];
  notWorkingItems?: string[];
  addItems?: string[];
  stopItems?: string[];
  learnItems?: string[];
  
  // Section 2: Lead Generation
  leadsPerDay?: string;
  leadsPerWeek?: string;
  leadsPerMonth?: string;
  leadMethods?: {
    coldCalling?: boolean;
    emailCampaigns?: boolean;
    socialMedia?: boolean;
    referrals?: boolean;
    networkingEvents?: boolean;
    other?: boolean;
    otherSpecify?: string;
  };
  mostEffectiveLeadMethod?: string;
  leadAreaFocus?: string;
  
  // Section 3: Outbound Contacts
  contactsPerDay?: string;
  contactsPerWeek?: string;
  contactChallenges?: string;
  appointmentObjection?: string;
  appointmentHook?: string;
  
  // Section 4: Sales Conversion
  conversionRatio?: string;
  conversionObstacles?: string;
  conversionStrategies?: string[];
  
  // Section 5: Commission/Sales Structure
  averageCommission?: string;
  highestTransactionSource?: string;
  increaseCommissionStrategy?: string;
  unprofitableSegments?: string;
  
  // Section 6: Work Hours
  workHoursRange?: string;
  effectiveHoursPercentage?: string;
  workLifeBalance?: string;
  workLifeBalanceChanges?: string;
  
  // Section 7: Sales Tools & Resources
  usesCRM?: string;
  crmEffectiveness?: string;
  additionalTools?: string;
  
  // Section 8: Training & Development
  trainingFrequency?: string;
  businessWorkHours?: string;
  trainingFocusArea?: string;
  reviewsScorecard?: string;
  monthlyGoalReview?: string;
  hasTeam?: string;
  teamChanges?: string;
  
  // Section 9: Income and Savings Goals
  incomeGoal?: string;
  revenueGoal?: string;
  unitsRequired?: string;
  leadsRequired?: string;
  contactsRequired?: string;
  conversionPercentage?: string;
  totalExpenses?: string;
  expensePeople?: string;
  expenseRent?: string;
  expenseMarketing?: string;
  expenseCompliance?: string;
  expenseOther?: string;
  grossRevenue?: string;
  profit?: string;
  savingsGoal?: string;
  hoursWorkedGoal?: string;
  familyGoal?: string;
  givingGoal?: string;
  vacationGoal?: string;
  readingGoal?: string;
  physicalGoal?: string;
  
  // Section 10: Goals Recap
  goalsImportance?: string;
  goalsAccomplishmentEffect?: string;
  workWorthIt?: string;
  workPreventionFactors?: string;
  accountabilityMeasures?: string;
  ninetyDayCommitment?: string;
  goalsBelief?: string;
  goalsToChange?: string;
  
  // Section 11: Short Term Goals
  shortTermGoals?: {
    goal: string;
    action: string;
  }[];
  
  // Section 12: Vision
  threeYearVision?: string;
  fiveYearVision?: string;
  
  // Implementation Items
  implementationItems?: {
    item: string;
    speedScore: string;
    impactScore: string;
    totalScore: string;
    priority: string;
  }[];
}