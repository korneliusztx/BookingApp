"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getStyleSuggestionAction, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, UploadCloud, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Wand2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
         <Sparkles className="mr-2 h-4 w-4" />
          Get My Style Advice
        </>
      )}
    </Button>
  );
}

export function StyleAdvisor() {
  const initialState: FormState = { message: "" };
  const [state, formAction] = useFormState(getStyleSuggestionAction, initialState);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
            <Sparkles className="w-6 h-6"/>
            AI Style Advisor
          </CardTitle>
          <CardDescription>
            Unsure what to book? Upload a photo of your current hair and tell us what you're looking for. Our AI will suggest services for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentHairImage">
                <div className="flex items-center gap-2">
                    <UploadCloud className="w-5 h-5" />
                    Upload Current Hair Photo
                </div>
            </Label>
            <Input id="currentHairImage" name="currentHairImage" type="file" accept="image/*" />
            {state.errors?.currentHairImage && (
              <p className="text-sm font-medium text-destructive">{state.errors.currentHairImage[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="desiredChange">
                <div className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5"/>
                    Describe Your Desired Change
                </div>
            </Label>
            <Textarea
              id="desiredChange"
              name="desiredChange"
              placeholder="e.g., 'I want something shorter and easier to manage, maybe with some light brown highlights.'"
              rows={4}
            />
            {state.errors?.desiredChange && (
              <p className="text-sm font-medium text-destructive">{state.errors.desiredChange[0]}</p>
            )}
          </div>
          {state.recommendation && (
             <Alert className="bg-primary/5 border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle className="font-headline text-primary">Recommendation</AlertTitle>
                <AlertDescription>
                    {state.recommendation}
                </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
