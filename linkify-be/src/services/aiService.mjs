import Groq from 'groq-sdk'

const groq = new Groq({
    apiKey: process.env.GROQAI_API_KEY
});

export const generatePostHooks = async (topic, platform, tone, audience) => {
    try {
        const prompt = `
            Act as a professional social media strategist.
            Generate 4 distinct, creative content angles (hooks) for a post.
            
            Context:
            - Topic: "${topic}"
            - Platform: "${platform}" (Adjust style accordingly: TikTok needs visual hooks, LinkedIn needs professional insights, etc.)
            - Tone: "${tone}"
            - Target Audience: "${audience || 'General'}"

            Return ONLY a JSON object with this structure:
            {
                "hooks": [
                    {
                        "type": "string (e.g., Educational, Storytelling, Controversial, Funny)",
                        "title": "string (Catchy headline)",
                        "description": "string (Short explanation of the angle)"
                    }
                ]
            }
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a creative content assistant. Output JSON only.' },
                { role: 'user', content: prompt }
            ],
            model: 'qwen/qwen3-32b', 
            response_format: { type: 'json_object' },
            temperature: 0.7 
        })

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("AI Hook Gen Error:", error);
    }
}

export const generatePostContent = async (topic, platform, tone, hookTitle, hookType) => {
    try {
        const prompt = `
            Write a full social media post based on this specific angle.
            
            Context:
            - Platform: "${platform}"
            - Topic: "${topic}"
            - Tone: "${tone}"
            - Selected Hook/Angle: "${hookTitle}" (${hookType})

            Requirements:
            - If TikTok/Reels/Shorts: Write a script (Scene description + Dialogue/Text overlay).
            - If Instagram/Facebook: Write a catchy Caption + Image Suggestion + Hashtags.
            - If LinkedIn/Twitter: Write the full text post formatted for readability.
            - Use emojis where appropriate.
            
            Return ONLY a JSON object:
            {
                "content": "string (The full post content formatted with line breaks)"
            }
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a professional copywriter. Output JSON only.' },
                { role: 'user', content: prompt }
            ],
            model: 'qwen/qwen3-32b',
            response_format: { type: 'json_object' },
            temperature: 0.7
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("AI Content Gen Error:", error);
        throw new Error("Failed to generate content");
    }
}