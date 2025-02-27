// Key for storing form data in localStorage
const FORM_DATA_KEY = 'business_planning_form_data';

/**
 * Save form data to localStorage
 * @param data Form data to save
 */
export const saveFormData = (data: any): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(FORM_DATA_KEY, serializedData);
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
};

/**
 * Load form data from localStorage
 * @returns The saved form data or null if none exists
 */
export const loadFormData = (): any => {
  try {
    const serializedData = localStorage.getItem(FORM_DATA_KEY);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
    return null;
  }
};

/**
 * Clear form data from localStorage
 */
export const clearFormData = (): void => {
  try {
    localStorage.removeItem(FORM_DATA_KEY);
  } catch (error) {
    console.error('Error clearing form data from localStorage:', error);
  }
};

/**
 * Check if form data exists in localStorage
 * @returns True if form data exists, false otherwise
 */
export const hasFormData = (): boolean => {
  return localStorage.getItem(FORM_DATA_KEY) !== null;
};