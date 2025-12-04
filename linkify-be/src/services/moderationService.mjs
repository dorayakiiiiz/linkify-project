// import OpenAI from 'openai'
import Groq from 'groq-sdk'
import Link from '../models/Link.mjs'
import Product from '../models/Product.mjs'
import Profile from '../models/Profile.mjs'

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

const groq = new Groq({
    apiKey: process.env.GROQAI_API_KEY
})

export const checkLinkContent = async (linkId, title, url) => {
    try {
        const prompt = `
            Analyze the following link information for policy violations.
            Title: "${title}"
            URL: "${url}"
            
            Categories to detect:
            1. Gambling/Betting
            2. Adult Content (18+)
            3. Phishing/Scam
            4. Hate Speech/Violence
            5. Spam/Advertising
            6. Malware/Illegal Links
            7. Harassment/Bullying
            8. Self-harm/Suicide Content
            
            Respond ONLY with a JSON object:
            {
                "isViolating": boolean,
                "reason": "string (category name or null)",
                "confidence": number (0-100)
            }
        `;
    
        // const completion = await openai.chat.completions.create({
        //     messages: [
        //         {
        //             role: 'system',
        //             content: 'You are a content moderation AI.'
        //         },
        //         {
        //             role: 'user',
        //             content: prompt
        //         }
        //     ],
        //     model: 'gpt-4o-mini',
        //     response_format: { type: 'json_object' },
        //     temperature: 0
        // });
    
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a content moderation AI.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'qwen/qwen3-32b',
            response_format: { type: 'json_object' },
            temperature: 0
        });

        const result = JSON.parse(completion.choices[0].message.content);

        const currentLink = await Link.findById(linkId);
        if (!currentLink) return;
    
        if (result.isViolating && result.confidence > 70) {
            await Link.findByIdAndUpdate(linkId, {
                isFlagged: true,
                violationReason: result.reason,
                violationConfidence: result.confidence,
                isEnable: false 
            }, { new: true });

            if (!currentLink.isFlagged && currentLink.profileId) {
                const profile = await Profile.findById(currentLink.profileId);
                if (profile && profile.userId) {
                    await User.findByIdAndUpdate(profile.userId, {
                        $inc: { violationCount: 1 }
                    });
                }
            }
        } else {
            if (currentLink.isFlagged) {
                await Link.findByIdAndUpdate(linkId, {
                    isFlagged: false,
                    violationReason: null,
                    violationConfidence: 0,
                    isEnable: true,
                });
            }
        }

    } catch (err) {
        console.log('Error while calling AI API: ', err.message);
    }
}

export const checkProductContent = async (productId, name, price) => {
    try {
        const prompt = `
            Analyze the following product listing for e-commerce policy violations.
            Product Name: "${name}"
            Price: ${price}
            
            Categories to detect:
            1. Weapons/Explosives 
            2. Illegal Drugs/Substances 
            3. Counterfeit/Fake Goods 
            4. Adult Products/Toys
            5. Stolen Digital Accounts/Hacking Tools
            6. Fraud/Scam 

            Respond ONLY with a JSON object:
            {
                "isViolating": boolean,
                "reason": "string (category name or null)",
                "confidence": number (0-100)
            }
        `;
    
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are an e-commerce moderation AI.' },
                { role: 'user', content: prompt }
            ],
            model: 'qwen/qwen3-32b', 
            response_format: { type: 'json_object' },
            temperature: 0
        });

        const result = JSON.parse(completion.choices[0].message.content);

        const currentProduct = await Product.findById(productId);
        if (!currentProduct) return;
    
        if (result.isViolating && result.confidence > 70) {
            const updatedProduct = await Product.findByIdAndUpdate(productId, {
                isFlagged: true,
                violationReason: result.reason,
                violationConfidence: result.confidence,
                isEnable: false 
            }, { new: true });

            if (!currentProduct.isFlagged && currentProduct.profileId) {
                const profile = await Profile.findById(updatedProduct.profileId);
                if (profile && profile.userId) {
                    await User.findByIdAndUpdate(profile.userId, {
                        $inc: { violationCount: 1 }
                    });
                }
            }
        } else {
            if (currentProduct.isFlagged) {
                await Product.findByIdAndUpdate(productId, {
                    isFlagged: false,
                    violationReason: null,
                    violationConfidence: 0,
                    isEnable: true
                });
            }
        }
    } catch (err) {
        console.log('Error while calling AI API for Product: ', err.message);
    }
}