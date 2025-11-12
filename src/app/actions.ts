"use server";

import { getStyleSuggestion } from '@/ai/flows/styleAdvisor';
import { z } from 'zod';

const styleSchema = z.object({
    desiredChange: z.string().min(10, { message: "Please describe your desired change in more detail." }),
    currentHairImage: z.instanceof(File).refine(file => file.size > 0, "An image of your current hair is required."),
});

export type FormState = {
    message: string;
    recommendation?: string;
    errors?: {
        desiredChange?: string[];
        currentHairImage?: string[];
    }
}

export async function getStyleSuggestionAction(prevState: FormState, formData: FormData): Promise<FormState> {
    
    const validatedFields = styleSchema.safeParse({
        desiredChange: formData.get('desiredChange'),
        currentHairImage: formData.get('currentHairImage'),
    });

    if (!validatedFields.success) {
        return {
            message: "Failed to validate fields.",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        // In a real application, you would upload the image to a storage service (e.g., Firebase Storage)
        // and pass the URL to the AI flow. For this simulation, we pass a mock representation.
        const imageInfo = `Image uploaded: ${validatedFields.data.currentHairImage.name} (${(validatedFields.data.currentHairImage.size / 1024).toFixed(2)} KB)`;

        const result = await getStyleSuggestion({ 
            currentStyle: imageInfo,
            desiredChange: validatedFields.data.desiredChange
        });

        return {
            message: "Success",
            recommendation: result
        }
    } catch (error) {
        return {
            message: "An error occurred while getting your style suggestion."
        }
    }
}
