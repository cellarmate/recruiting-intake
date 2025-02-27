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
      
      <!-- Add more sections as needed -->
      
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
 * Print the form data
 * @param data Form data to print
 */
export const printForm = (data: BusinessPlanningFormData): void => {
  const html = generatePrintHTML(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for resources to load before printing
    printWindow.onload = () => {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  } else {
    alert('Please allow pop-ups to print the form.');
  }
};