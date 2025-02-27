# Business Planning Form

A modern, attractive React form application for business planning, created based on the PDF form and following brand guidelines.

## Features

- **Modern UI**: Designed with a clean, professional interface following brand guidelines
- **Comprehensive Form**: Covers all 12 sections from the original PDF form
- **Responsive Design**: Works well on desktop and mobile devices
- **Form Validation**: Uses react-hook-form for efficient form handling and validation
- **Styled Components**: Utilizes styled-components for consistent styling
- **Transcript Processor**: AI-powered meeting transcript summarization using OpenAI's API

## Technologies Used

- React
- TypeScript
- Styled Components
- React Hook Form
- OpenAI API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- OpenAI API key (for the transcript processor feature)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your OpenAI API key:
   - Rename `.env` to `.env.local` to ensure it's not committed to version control
   - Replace `your_api_key_here` with your actual OpenAI API key from [OpenAI's platform](https://platform.openai.com/api-keys)
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Form Sections

1. **Critical Review of Your Business and Behaviors**
2. **Lead Generation**
3. **Outbound Contacts**
4. **Sales Conversion**
5. **Commission/Sales Structure**
6. **Work Hours**
7. **Sales Tools & Resources**
8. **Training & Development**
9. **Income and Savings Goals**
10. **Goals Recap**
11. **Define Specific Short Term Goals**
12. **Vision**

## Transcript Processor

The application includes a feature to process and summarize recruiting meeting transcripts using OpenAI's GPT-4 model. To use this feature:

1. Ensure your OpenAI API key is configured in the `.env.local` file
2. Navigate to the "Transcript Processor" tab in the application
3. Paste your meeting transcript into the text area
4. Click "Generate Summary" to get an AI-generated summary of the meeting

The summary will include key points discussed, candidate qualifications, strengths, potential concerns, and next steps if mentioned.

## Brand Guidelines

The application follows the brand guidelines with:

- **Primary Colors**: Navy (#000A35), Purple (#7549EA)
- **Secondary Colors**: Mint (#71ECCA), Teal (#00BDD1), Grey (#9E9E9E), Magenta (#AB57ED)
- **Typography**: HK Nova (primary font), Hepta Slab (accent font)
- **Brand Values**: Passionate, Modern, Educational, Authentic, Authoritative

## License

This project is licensed under the MIT License.