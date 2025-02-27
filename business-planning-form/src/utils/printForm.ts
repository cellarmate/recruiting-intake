import { BusinessPlanningFormData } from '../types/formTypes';

/**
 * Format a form section for printing
 * @param title Section title
 * @param content Section content HTML
 * @returns Formatted HTML for the section
 */
const formatSection = (title: string, content: string): string => {
  return `
    <div class="print-section">
      <h2>${title}</h2>
      ${content}
    </div>
  `;
};

/**
 * Generate HTML for printing the form data
 * @param data Form data to print
 * @returns HTML string for printing
 */
export const generatePrintHTML = (data: BusinessPlanningFormData): string => {
  // Create the HTML content for printing
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Business Planning Form - ${data.name || 'Unnamed'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #000A35;
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 3px solid #7549EA;
        }
        h2 {
          color: #000A35;
          margin-top: 30px;
          padding-bottom: 5px;
          border-bottom: 2px solid #7549EA;
        }
        h3 {
          color: #000A35;
          margin-top: 20px;
        }
        .print-section {
          margin-bottom: 30px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .field-value {
          padding: 5px 0;
        }
        .footer {
          margin-top: 50px;
          text-align: center;
          font-size: 0.9em;
          color: #666;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <h1>Business Planning Form</h1>
      
      <div class="print-section">
        <div class="field">
          <div class="field-label">Name:</div>
          <div class="field-value">${data.name || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="field-label">Date:</div>
          <div class="field-value">${data.date || 'N/A'}</div>
        </div>
      </div>
      
      ${formatSection('1. Critical Review of Your Business and Behaviors', `
        <h3>What's working?</h3>
        <div class="field">
          <div class="field-value">1. ${data.workingItems?.[0] || 'N/A'}</div>
          <div class="field-value">2. ${data.workingItems?.[1] || 'N/A'}</div>
          <div class="field-value">3. ${data.workingItems?.[2] || 'N/A'}</div>
        </div>
        
        <h3>What's not working?</h3>
        <div class="field">
          <div class="field-value">1. ${data.notWorkingItems?.[0] || 'N/A'}</div>
          <div class="field-value">2. ${data.notWorkingItems?.[1] || 'N/A'}</div>
          <div class="field-value">3. ${data.notWorkingItems?.[2] || 'N/A'}</div>
        </div>
        
        <h3>What do I need to add?</h3>
        <div class="field">
          <div class="field-value">1. ${data.addItems?.[0] || 'N/A'}</div>
          <div class="field-value">2. ${data.addItems?.[1] || 'N/A'}</div>
        </div>
        
        <h3>What should I stop doing?</h3>
        <div class="field">
          <div class="field-value">1. ${data.stopItems?.[0] || 'N/A'}</div>
          <div class="field-value">2. ${data.stopItems?.[1] || 'N/A'}</div>
        </div>
        
        <h3>What do I need to learn?</h3>
        <div class="field">
          <div class="field-value">1. ${data.learnItems?.[0] || 'N/A'}</div>
          <div class="field-value">2. ${data.learnItems?.[1] || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('2. Lead Generation', `
        <h3>How many leads do you generate?</h3>
        <div class="field">
          <div class="field-value">Per Day: ${data.leadsPerDay || 'N/A'}</div>
          <div class="field-value">Per Week: ${data.leadsPerWeek || 'N/A'}</div>
          <div class="field-value">Per Month: ${data.leadsPerMonth || 'N/A'}</div>
        </div>
        
        <h3>What methods do you use to generate leads?</h3>
        <div class="field">
          <div class="field-value">
            ${data.leadMethods?.coldCalling ? '✓ Cold Calling<br>' : ''}
            ${data.leadMethods?.emailCampaigns ? '✓ Email Campaigns<br>' : ''}
            ${data.leadMethods?.socialMedia ? '✓ Social Media Outreach<br>' : ''}
            ${data.leadMethods?.referrals ? '✓ Referrals<br>' : ''}
            ${data.leadMethods?.networkingEvents ? '✓ Networking Events<br>' : ''}
            ${data.leadMethods?.other ? `✓ Other: ${data.leadMethods.otherSpecify || ''}` : ''}
          </div>
        </div>
        
        <h3>Which lead generation method has been most effective for you?</h3>
        <div class="field">
          <div class="field-value">${data.mostEffectiveLeadMethod || 'N/A'}</div>
        </div>
        
        <h3>What area needs the most focus?</h3>
        <div class="field">
          <div class="field-value">${data.leadAreaFocus || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('3. Outbound Contacts', `
        <h3>How many outbound contacts do you make?</h3>
        <div class="field">
          <div class="field-value">Per Day: ${data.contactsPerDay || 'N/A'}</div>
          <div class="field-value">Per Week: ${data.contactsPerWeek || 'N/A'}</div>
        </div>
        
        <h3>What challenges do you face in making outbound contacts?</h3>
        <div class="field">
          <div class="field-value">${data.contactChallenges || 'N/A'}</div>
        </div>
        
        <h3>What is your number one objection to an appointment?</h3>
        <div class="field">
          <div class="field-value">${data.appointmentObjection || 'N/A'}</div>
        </div>
        
        <h3>What is your bait (hook) for securing an appointment?</h3>
        <div class="field">
          <div class="field-value">${data.appointmentHook || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('4. Sales Conversion', `
        <h3>What is your current conversion ratio?</h3>
        <div class="field">
          <div class="field-value">${data.conversionRatio || 'N/A'}</div>
        </div>
        
        <h3>What obstacles do you encounter during the conversion process?</h3>
        <div class="field">
          <div class="field-value">${data.conversionObstacles || 'N/A'}</div>
        </div>
        
        <h3>What strategies do you use to improve your conversion rate?</h3>
        <div class="field">
          <div class="field-value">1. ${data.conversionStrategies?.[0] || 'N/A'}</div>
          <div class="field-value">2. ${data.conversionStrategies?.[1] || 'N/A'}</div>
          <div class="field-value">3. ${data.conversionStrategies?.[2] || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('5. Commission/Sales Structure', `
        <h3>Average commission/revenue per sale:</h3>
        <div class="field">
          <div class="field-value">${data.averageCommission || 'N/A'}</div>
        </div>
        
        <h3>Source of highest transaction values:</h3>
        <div class="field">
          <div class="field-value">${data.highestTransactionSource || 'N/A'}</div>
        </div>
        
        <h3>Strategy to increase average commission:</h3>
        <div class="field">
          <div class="field-value">${data.increaseCommissionStrategy || 'N/A'}</div>
        </div>
        
        <h3>Unprofitable segments to reconsider:</h3>
        <div class="field">
          <div class="field-value">${data.unprofitableSegments || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('6. Work Hours', `
        <h3>Average hours worked per week:</h3>
        <div class="field">
          <div class="field-value">${data.workHoursRange || 'N/A'}</div>
        </div>
        
        <h3>Percentage of highly effective work hours:</h3>
        <div class="field">
          <div class="field-value">${data.effectiveHoursPercentage ? `${data.effectiveHoursPercentage}%` : 'N/A'}</div>
        </div>
        
        <h3>Optimal work-life balance:</h3>
        <div class="field">
          <div class="field-value">${data.workLifeBalance || 'N/A'}</div>
        </div>
        
        <h3>Changes for better work-life balance:</h3>
        <div class="field">
          <div class="field-value">${data.workLifeBalanceChanges || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('7. Sales Tools & Resources', `
        <h3>Uses CRM system:</h3>
        <div class="field">
          <div class="field-value">${data.usesCRM || 'N/A'}</div>
        </div>
        
        <h3>CRM system effectiveness:</h3>
        <div class="field">
          <div class="field-value">${data.crmEffectiveness || 'N/A'}</div>
        </div>
        
        <h3>Additional tools or resources needed:</h3>
        <div class="field">
          <div class="field-value">${data.additionalTools || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('8. Training & Development', `
        <h3>Frequency of sales training:</h3>
        <div class="field">
          <div class="field-value">${data.trainingFrequency || 'N/A'}</div>
        </div>
        
        <h3>Hours per week working on business:</h3>
        <div class="field">
          <div class="field-value">${data.businessWorkHours || 'N/A'}</div>
        </div>
        
        <h3>Area needing focus and training:</h3>
        <div class="field">
          <div class="field-value">${data.trainingFocusArea || 'N/A'}</div>
        </div>
        
        <h3>Reviews scorecard weekly:</h3>
        <div class="field">
          <div class="field-value">${data.reviewsScorecard || 'N/A'}</div>
        </div>
        
        <h3>Monthly review of goals:</h3>
        <div class="field">
          <div class="field-value">${data.monthlyGoalReview || 'N/A'}</div>
        </div>
        
        <h3>Has team:</h3>
        <div class="field">
          <div class="field-value">${data.hasTeam || 'N/A'}</div>
        </div>
        
        <h3>Team changes or hiring plans:</h3>
        <div class="field">
          <div class="field-value">${data.teamChanges || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('9. Income and Savings Goals', `
        <h3>Income and Revenue Goals:</h3>
        <div class="field">
          <div class="field-value">Income Goal (Low): ${data.incomeGoal || 'N/A'}</div>
          <div class="field-value">Gross Revenue Goal (Low): ${data.revenueGoal || 'N/A'}</div>
          <div class="field-value">Units Required: ${data.unitsRequired || 'N/A'}</div>
          <div class="field-value">Leads Required: ${data.leadsRequired || 'N/A'}</div>
          <div class="field-value">Contacts Required: ${data.contactsRequired || 'N/A'}</div>
          <div class="field-value">Conversion Percentage: ${data.conversionPercentage || 'N/A'}</div>
        </div>
        
        <h3>Total Expenses:</h3>
        <div class="field">
          <div class="field-value">People: ${data.expensePeople || 'N/A'}</div>
          <div class="field-value">Rent: ${data.expenseRent || 'N/A'}</div>
          <div class="field-value">Marketing: ${data.expenseMarketing || 'N/A'}</div>
          <div class="field-value">Compliance: ${data.expenseCompliance || 'N/A'}</div>
          <div class="field-value">Other: ${data.expenseOther || 'N/A'}</div>
        </div>
        
        <h3>Revenue and Profit:</h3>
        <div class="field">
          <div class="field-value">Gross Revenue: ${data.grossRevenue || 'N/A'}</div>
          <div class="field-value">Profit: ${data.profit || 'N/A'}</div>
        </div>
        
        <h3>Other Goals:</h3>
        <div class="field">
          <div class="field-value">Savings Goal: ${data.savingsGoal || 'N/A'}</div>
          <div class="field-value">Hours Worked Goal: ${data.hoursWorkedGoal || 'N/A'}</div>
          <div class="field-value">Family/Relationship Goal: ${data.familyGoal || 'N/A'}</div>
          <div class="field-value">Giving Goal: ${data.givingGoal || 'N/A'}</div>
          <div class="field-value">Vacation Goal: ${data.vacationGoal || 'N/A'}</div>
          <div class="field-value">Reading Goal: ${data.readingGoal || 'N/A'}</div>
          <div class="field-value">Physical Goal: ${data.physicalGoal || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('10. Goals Recap', `
        <h3>Why are these goals important to you?</h3>
        <div class="field">
          <div class="field-value">${data.goalsImportance || 'N/A'}</div>
        </div>
        
        <h3>What would accomplishing these goals do for you and your family?</h3>
        <div class="field">
          <div class="field-value">${data.goalsAccomplishmentEffect || 'N/A'}</div>
        </div>
        
        <h3>Is the work worth it?</h3>
        <div class="field">
          <div class="field-value">${data.workWorthIt || 'N/A'}</div>
        </div>
        
        <h3>What would prevent you from doing the work?</h3>
        <div class="field">
          <div class="field-value">${data.workPreventionFactors || 'N/A'}</div>
        </div>
        
        <h3>Habits or accountability measures:</h3>
        <div class="field">
          <div class="field-value">${data.accountabilityMeasures || 'N/A'}</div>
        </div>
        
        <h3>Commitment to 90-day work:</h3>
        <div class="field">
          <div class="field-value">${data.ninetyDayCommitment || 'N/A'}</div>
        </div>
        
        <h3>Do you believe it's possible?</h3>
        <div class="field">
          <div class="field-value">${data.goalsBelief || 'N/A'}</div>
        </div>
        
        <h3>Goals or objectives that need to be changed:</h3>
        <div class="field">
          <div class="field-value">${data.goalsToChange || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('11. Short Term Goals', `
        <h3>Top 3 measurable goals for next quarter:</h3>
        <div class="field">
          <div class="field-label">Goal 1:</div>
          <div class="field-value">${data.shortTermGoals?.[0]?.goal || 'N/A'}</div>
          <div class="field-label">Action:</div>
          <div class="field-value">${data.shortTermGoals?.[0]?.action || 'N/A'}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Goal 2:</div>
          <div class="field-value">${data.shortTermGoals?.[1]?.goal || 'N/A'}</div>
          <div class="field-label">Action:</div>
          <div class="field-value">${data.shortTermGoals?.[1]?.action || 'N/A'}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Goal 3:</div>
          <div class="field-value">${data.shortTermGoals?.[2]?.goal || 'N/A'}</div>
          <div class="field-label">Action:</div>
          <div class="field-value">${data.shortTermGoals?.[2]?.action || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('12. Vision', `
        <h3>3 year vision:</h3>
        <div class="field">
          <div class="field-value">${data.threeYearVision || 'N/A'}</div>
        </div>
        
        <h3>5 year vision:</h3>
        <div class="field">
          <div class="field-value">${data.fiveYearVision || 'N/A'}</div>
        </div>
      `)}
      
      ${formatSection('13. TOP 10 ITEMS TO IMPLEMENT', `
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
              <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Speed (1-10)</th>
              <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Impact (1-10)</th>
              <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Total Score</th>
              <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Priority</th>
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: 10 }).map((_, i) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.implementationItems?.[i]?.item || 'N/A'}</td>
                <td style="text-align: center; padding: 8px; border-bottom: 1px solid #eee;">${data.implementationItems?.[i]?.speedScore || 'N/A'}</td>
                <td style="text-align: center; padding: 8px; border-bottom: 1px solid #eee;">${data.implementationItems?.[i]?.impactScore || 'N/A'}</td>
                <td style="text-align: center; padding: 8px; border-bottom: 1px solid #eee;">${data.implementationItems?.[i]?.totalScore || 'N/A'}</td>
                <td style="text-align: center; padding: 8px; border-bottom: 1px solid #eee;">${data.implementationItems?.[i]?.priority || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `)}
      
      <div class="footer">
        <p>© 2025 Business Planning Form. All information is confidential.</p>
      </div>
      
      <div class="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print()">Print Form</button>
        <button onclick="window.close()">Close</button>
      </div>
    </body>
    </html>
  `;
  
  return html;
};

/**
 * Get the form data as HTML content
 * @param data Form data to format for printing
 * @returns The HTML content as a string
 */
export const printForm = (data: BusinessPlanningFormData): string => {
  return generatePrintHTML(data);
};

/**
 * Create a download link for the form data (to be added to the DOM)
 * @param data Form data to print
 * @returns An HTML anchor element that can be clicked to download the form
 */
export const createFormDownloadLink = (data: BusinessPlanningFormData): HTMLAnchorElement => {
  const html = generatePrintHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `business-plan-${data.name || 'unnamed'}.html`;
  downloadLink.textContent = 'Download Business Plan';
  downloadLink.style.display = 'none';
  
  return downloadLink;
};