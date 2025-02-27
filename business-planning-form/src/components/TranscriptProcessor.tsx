import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FormContainer,
  FormHeader,
  FormSection,
  FormGroup,
  Label,
  TextArea,
  Button,
  ButtonGroup,
  SectionTitle,
  ErrorMessage,
  Card,
  HelperText,
} from './FormElements';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Styled components specific to this component
const TranscriptContainer = styled(FormContainer)`
  margin-top: ${({ theme }) => theme.spacing.xxxl};
`;

const SummaryContainer = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  white-space: pre-wrap;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  
  &:after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }) => theme.colors.greyLight};
    border-top-color: ${({ theme }) => theme.colors.purple};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ApiKeyWarning = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TranscriptProcessor: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);

  useEffect(() => {
    // Check if API key is properly configured
    setIsApiKeyConfigured(!!API_KEY && API_KEY !== 'your_api_key_here');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transcript.trim()) {
      setError('Please enter a transcript');
      return;
    }
    
    if (!isApiKeyConfigured) {
      setError('OpenAI API key is not configured. Please check your environment variables.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSummary('');
    
    try {
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
              content: 'You are a professional recruiting assistant. Your task is to summarize recruiting meeting transcripts. Provide a concise summary that includes key points discussed, candidate qualifications, strengths, potential concerns, and next steps if mentioned. Format your response with clear sections and bullet points where appropriate.'
            },
            {
              role: 'user',
              content: `Please summarize the following recruiting meeting transcript:\n\n${transcript}`
            }
          ],

        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to get summary from OpenAI');
      }
      
      setSummary(data.choices[0].message.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClear = () => {
    setTranscript('');
    setSummary('');
    setError('');
  };

  return (
    <TranscriptContainer>
      <FormHeader>
        <img src={`${process.env.PUBLIC_URL}/logos/UMortgage_Logo.png`} alt="UMortgage Logo" className="logo" />
        <h1>Recruiting Meeting Transcript Processor</h1>
        <p>Paste in your recruiting meeting transcript to get an AI-generated summary</p>
      </FormHeader>
      
      <FormSection active={true}>
        <SectionTitle>Meeting Transcript</SectionTitle>
        
        {!isApiKeyConfigured && (
          <ApiKeyWarning>
            <strong>API Key Not Configured:</strong> Please add your OpenAI API key to the .env.local file.
            See the README.md for instructions on setting up your API key.
          </ApiKeyWarning>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="transcript">Transcript</Label>
            <TextArea 
              id="transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here"
              rows={10}
            />
            <HelperText>The transcript will be processed using OpenAI's API to generate a concise summary.</HelperText>
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <ButtonGroup>
            <Button type="submit" variant="primary" disabled={!isApiKeyConfigured}>Generate Summary</Button>
            <Button type="button" variant="outline" onClick={handleClear}>Clear</Button>
          </ButtonGroup>
        </form>
      </FormSection>
      
      {loading && <LoadingIndicator />}
      
      {summary && (
        <FormSection active={true}>
          <SectionTitle>Meeting Summary</SectionTitle>
          <SummaryContainer>
            <div style={{ padding: '16px' }}>
              {summary}
            </div>
          </SummaryContainer>
        </FormSection>
      )}
    </TranscriptContainer>
  );
};

export default TranscriptProcessor;