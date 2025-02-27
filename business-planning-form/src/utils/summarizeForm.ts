import { BusinessPlanningFormData } from '../types/formTypes';
import { logTokenUsageInBrowser } from './tokenCounter';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

/**
 * Converts form data to a string representation for the AI to process
 */
const formatFormDataForAI = (data: BusinessPlanningFormData): string => {
  return `
Name: ${data.name || 'N/A'}
Date: ${data.date || 'N/A'}

SECTION 1: CRITICAL REVIEW
What's working: ${data.workingItems?.filter(Boolean).join(', ') || 'N/A'}
What's not working: ${data.notWorkingItems?.filter(Boolean).join(', ') || 'N/A'}
What to add: ${data.addItems?.filter(Boolean).join(', ') || 'N/A'}
What to stop: ${data.stopItems?.filter(Boolean).join(', ') || 'N/A'}
What to learn: ${data.learnItems?.filter(Boolean).join(', ') || 'N/A'}

SECTION 2: LEAD GENERATION
Leads per day: ${data.leadsPerDay || 'N/A'}
Leads per week: ${data.leadsPerWeek || 'N/A'}
Leads per month: ${data.leadsPerMonth || 'N/A'}
Methods: ${Object.entries(data.leadMethods || {})
  .filter(([key, value]) => value && key !== 'otherSpecify')
  .map(([key]) => key)
  .join(', ') || 'N/A'}
Most effective method: ${data.mostEffectiveLeadMethod || 'N/A'}
Focus area: ${data.leadAreaFocus || 'N/A'}

SECTION 3: OUTBOUND CONTACTS
Contacts per day: ${data.contactsPerDay || 'N/A'}
Contacts per week: ${data.contactsPerWeek || 'N/A'}
Challenges: ${data.contactChallenges || 'N/A'}
Main objection: ${data.appointmentObjection || 'N/A'}
Appointment hook: ${data.appointmentHook || 'N/A'}

SECTION 4: SALES CONVERSION
Conversion ratio: ${data.conversionRatio || 'N/A'}
Obstacles: ${data.conversionObstacles || 'N/A'}
Strategies: ${data.conversionStrategies?.filter(Boolean).join(', ') || 'N/A'}

SECTION 5: COMMISSION/SALES STRUCTURE
Average commission: ${data.averageCommission || 'N/A'}
Highest transaction source: ${data.highestTransactionSource || 'N/A'}
Strategy to increase commission: ${data.increaseCommissionStrategy || 'N/A'}
Unprofitable segments: ${data.unprofitableSegments || 'N/A'}

SECTION 6: WORK HOURS
Hours worked per week: ${data.workHoursRange || 'N/A'}
Effective hours percentage: ${data.effectiveHoursPercentage || 'N/A'}
Work-life balance: ${data.workLifeBalance || 'N/A'}
Balance improvement: ${data.workLifeBalanceChanges || 'N/A'}

SECTION 7: SALES TOOLS & RESOURCES
Uses CRM: ${data.usesCRM || 'N/A'}
CRM effectiveness: ${data.crmEffectiveness || 'N/A'}
Additional tools needed: ${data.additionalTools || 'N/A'}

SECTION 8: TRAINING & DEVELOPMENT
Training frequency: ${data.trainingFrequency || 'N/A'}
Hours working on business: ${data.businessWorkHours || 'N/A'}
Focus area for training: ${data.trainingFocusArea || 'N/A'}
Weekly scorecard review: ${data.reviewsScorecard || 'N/A'}
Monthly goal review: ${data.monthlyGoalReview || 'N/A'}
Has team: ${data.hasTeam || 'N/A'}
Team changes: ${data.teamChanges || 'N/A'}

SECTION 9: INCOME AND SAVINGS GOALS
Income goal: ${data.incomeGoal || 'N/A'}
Revenue goal: ${data.revenueGoal || 'N/A'}
Units required: ${data.unitsRequired || 'N/A'}
Leads required: ${data.leadsRequired || 'N/A'}
Contacts required: ${data.contactsRequired || 'N/A'}
Conversion percentage: ${data.conversionPercentage || 'N/A'}
Expenses - People: ${data.expensePeople || 'N/A'}
Expenses - Rent: ${data.expenseRent || 'N/A'}
Expenses - Marketing: ${data.expenseMarketing || 'N/A'}
Expenses - Compliance: ${data.expenseCompliance || 'N/A'}
Expenses - Other: ${data.expenseOther || 'N/A'}
Gross revenue: ${data.grossRevenue || 'N/A'}
Profit: ${data.profit || 'N/A'}
Savings goal: ${data.savingsGoal || 'N/A'}
Hours worked goal: ${data.hoursWorkedGoal || 'N/A'}
Family/relationship goal: ${data.familyGoal || 'N/A'}
Giving goal: ${data.givingGoal || 'N/A'}
Vacation goal: ${data.vacationGoal || 'N/A'}
Reading goal: ${data.readingGoal || 'N/A'}
Physical goal: ${data.physicalGoal || 'N/A'}

SECTION 10: GOALS RECAP
Goals importance: ${data.goalsImportance || 'N/A'}
Impact of accomplishing goals: ${data.goalsAccomplishmentEffect || 'N/A'}
Is the work worth it: ${data.workWorthIt || 'N/A'}
Prevention factors: ${data.workPreventionFactors || 'N/A'}
Accountability measures: ${data.accountabilityMeasures || 'N/A'}
90-day commitment: ${data.ninetyDayCommitment || 'N/A'}
Belief in possibility: ${data.goalsBelief || 'N/A'}
Goals to change: ${data.goalsToChange || 'N/A'}

SECTION 11: SHORT TERM GOALS
Goal 1: ${data.shortTermGoals?.[0]?.goal || 'N/A'}
Action 1: ${data.shortTermGoals?.[0]?.action || 'N/A'}
Goal 2: ${data.shortTermGoals?.[1]?.goal || 'N/A'}
Action 2: ${data.shortTermGoals?.[1]?.action || 'N/A'}
Goal 3: ${data.shortTermGoals?.[2]?.goal || 'N/A'}
Action 3: ${data.shortTermGoals?.[2]?.action || 'N/A'}

SECTION 12: VISION
3-year vision: ${data.threeYearVision || 'N/A'}
5-year vision: ${data.fiveYearVision || 'N/A'}

SECTION 13: IMPLEMENTATION ITEMS
${data.implementationItems
  ?.filter(item => item?.item)
  ?.map((item, i) => `${i + 1}. ${item.item} (Speed: ${item.speedScore || 'N/A'}, Impact: ${item.impactScore || 'N/A'}, Total: ${item.totalScore || 'N/A'}, Priority: ${item.priority || 'N/A'})`)
  ?.join('\n') || 'N/A'}
`;
};

/**
 * Send form data to OpenAI for summarization
 * @param data The business planning form data
 * @param transcript Optional meeting transcript to include in the analysis
 */
export const summarizeFormWithAI = async (
  data: BusinessPlanningFormData,
  transcript?: string
): Promise<string> => {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error('OpenAI API key is not configured. Please check your environment variables.');
  }

  // Format the data for AI processing
  const formattedData = formatFormDataForAI(data);
  
  // Include meeting transcript in the prompt if provided
  const transcriptSection = transcript ?
    `\n\nMEETING TRANSCRIPT:\n${transcript}\n` : '';
  
  // Log token usage for tracking purposes
  logTokenUsageInBrowser(formattedData, transcript);
  
  // Make the API request to OpenAI
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a business coach specializing in helping mortgage professionals analyze their business plans. Your task is to review the submitted business planning form and provide a concise but comprehensive summary and analysis. Include key insights, strengths, areas for improvement, and actionable recommendations. Focus on identifying patterns, inconsistencies, and opportunities for growth. Your summary should be structured, professional, and provide valuable strategic guidance.'
        },
        {
          role: 'user',
          content: `Please analyze and summarize the following business planning form data:${transcript ? ' Also review the included meeting transcript and incorporate relevant insights from it into your analysis.' : ''}\n\n${formattedData}${transcriptSection}`
        }
      ]
    })
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error?.message || 'Failed to get summary from OpenAI');
  }
  
  return responseData.choices[0].message.content;
};