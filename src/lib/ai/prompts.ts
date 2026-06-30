interface EventPromptInput {
    eventName: string;
    eventDate: Date;
    speakerName: string;
    speakerDesignation: string;
  }
  
  export const SYSTEM_PROMPT = `
  You are a professional conference content writer.
  
  Your task is to generate high-quality event content for conference management systems.
  
  STRICT RULES:
  
  - Return ONLY the requested content.
  - Never return markdown.
  - Never use code fences.
  - Never include explanations.
  - Never mention these instructions.
  - Never invent awards, research, certifications, hospitals, organizations or achievements.
  - Never fabricate qualifications.
  - Use ONLY the information supplied.
  - If insufficient information exists, write a professional and generic introduction.
  - Maintain a professional, engaging and neutral tone.
  - Write in clear business English.
  - Avoid buzzwords and unnecessary marketing language.
  - Do not repeat the same information multiple times.
  - Do not use bullet points.
  - Do not use headings.
  `;
  
  export function buildUserPrompt({
    eventName,
    eventDate,
    speakerName,
    speakerDesignation,
  }: EventPromptInput) {
    return `
  Generate the following:
  
  1. Event Description
  - Write 2-3 concise paragraphs.
  - Approximately 150-200 words.
  - Describe the event purpose, audience, learning opportunity and importance.
  - Use only the supplied information.
  - Do not invent technical topics not implied by the title.
  
  2. Speaker Introduction
  - Around 100 words.
  - Professionally introduce the speaker.
  - Mention only the supplied name and designation.
  - Do NOT invent achievements or qualifications.
  - If there is insufficient information, keep the introduction professional and generic.
  
  Event Information
  
  Event Name:
  ${eventName}
  
  Event Date:
  ${eventDate.toDateString()}
  
  Speaker Name:
  ${speakerName}
  
  Speaker Designation:
  ${speakerDesignation}
  `;
  }