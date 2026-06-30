import { zodTextFormat } from "openai/helpers/zod";
import { openai } from "./openai";
import { eventContentSchema } from "./schema";
import { buildUserPrompt, SYSTEM_PROMPT } from "./prompts";

interface GenerateEventContentInput {
    eventName: string;
    eventDate: Date;
    speakerName: string;
    speakerDesignation: string;
}

export async function generateEventContent(
    input: GenerateEventContentInput
) {
    const response = await openai.responses.parse({
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        max_output_tokens: 400,

        input: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: buildUserPrompt(input),
            },
        ],

        text: {
            format: zodTextFormat(
                eventContentSchema,
                "event_content"
            ),
        }
    }, {

        timeout: 20000
    });

    return response.output_parsed;
}