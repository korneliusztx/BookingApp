import { StyleAdvisor } from "@/components/StyleAdvisor";

export default function StyleAdvisorPage() {
  return (
    <div className="container mx-auto">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">AI Style Advisor</h1>
        <p className="text-lg text-muted-foreground mt-2">Let our smart assistant help you choose the perfect new look.</p>
      </div>
      <StyleAdvisor />
    </div>
  );
}
