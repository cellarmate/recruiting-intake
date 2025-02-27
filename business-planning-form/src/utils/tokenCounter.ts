/**
 * Simple utility to count and log tokens for OpenAI API submissions (browser-only version)
 */

interface TokenLogEntry {
  timestamp: string;
  formDataSize: number;
  transcriptSize?: number;
  totalTokensEstimate: number;
}

/**
 * Estimates the number of tokens in a string using a simple ratio
 * (This is a rough approximation - OpenAI uses tiktoken for accurate counting)
 */
export const estimateTokens = (text: string): number => {
  // Average English token is ~4 characters
  return Math.ceil(text.length / 4);
};

/**
 * Browser-compatible version that uses localStorage instead of fs
 */
export const logTokenUsageInBrowser = (formData: string, transcript?: string): void => {
  try {
    const formDataTokens = estimateTokens(formData);
    const transcriptTokens = transcript ? estimateTokens(transcript) : 0;
    const totalTokens = formDataTokens + transcriptTokens;
    
    const logEntry: TokenLogEntry = {
      timestamp: new Date().toISOString(),
      formDataSize: formDataTokens,
      ...(transcript && { transcriptSize: transcriptTokens }),
      totalTokensEstimate: totalTokens
    };
    
    // Get existing log or initialize empty array
    const existingLog = localStorage.getItem('token_usage_log');
    const logEntries: TokenLogEntry[] = existingLog ? JSON.parse(existingLog) : [];
    
    // Add new entry
    logEntries.push(logEntry);
    
    // Save back to localStorage
    localStorage.setItem('token_usage_log', JSON.stringify(logEntries));
    
    // Also create a human-readable text log
    const tokenLogMessage = `
========================================
Date: ${new Date().toLocaleString()}
Form Data Tokens: ${formDataTokens}
${transcript ? `Transcript Tokens: ${transcriptTokens}` : ''}
Total Tokens Estimate: ${totalTokens}
========================================
`;
    
    // Create a text file with the token usage info
    const tokenLogFilename = `token_log_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    const tokenLogBlob = new Blob([tokenLogMessage], { type: 'text/plain' });
    const tokenLogUrl = URL.createObjectURL(tokenLogBlob);
    
    // Download the log file
    const a = document.createElement('a');
    a.href = tokenLogUrl;
    a.download = tokenLogFilename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(tokenLogUrl);
    }, 100);
    
    console.log('Token usage log:', tokenLogMessage);
    
    // Also append to the running log in localStorage
    const existingTextLog = localStorage.getItem('token_usage_log_text') || '';
    localStorage.setItem('token_usage_log_text', existingTextLog + tokenLogMessage);
  } catch (error) {
    console.error('Error logging token usage:', error);
  }
};

/**
 * Helper function to view the token log from localStorage in human-readable format
 * This can be called from the browser console for easy monitoring
 */
export const viewTokenLog = (): void => {
  try {
    // Get stored logs
    const jsonLog = localStorage.getItem('token_usage_log');
    const textLog = localStorage.getItem('token_usage_log_text');
    
    if (textLog) {
      console.log('TOKEN LOG (TEXT FORMAT):\n', textLog);
    }
    
    if (jsonLog) {
      const entries: TokenLogEntry[] = JSON.parse(jsonLog);
      console.log('TOKEN LOG (JSON FORMAT - MOST RECENT FIRST):');
      
      entries.reverse().forEach((entry, index) => {
        const date = new Date(entry.timestamp).toLocaleString();
        console.log(`\n--- ENTRY ${index + 1} (${date}) ---`);
        console.log(`Form Data Tokens: ${entry.formDataSize}`);
        if (entry.transcriptSize) {
          console.log(`Transcript Tokens: ${entry.transcriptSize}`);
        }
        console.log(`Total Tokens: ${entry.totalTokensEstimate}`);
      });
      
      // Calculate total tokens used
      const totalTokens = entries.reduce((sum, entry) => sum + entry.totalTokensEstimate, 0);
      console.log(`\nTOTAL TOKENS USED ACROSS ALL SUBMISSIONS: ${totalTokens}`);
    }
    
    if (!jsonLog && !textLog) {
      console.log('No token logs found in localStorage.');
    }
  } catch (error) {
    console.error('Error viewing token log:', error);
  }
};