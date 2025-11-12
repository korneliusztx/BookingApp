import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/lib/data';

export default function ServicesPage() {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Our Services</h1>
        <p className="text-lg text-muted-foreground mt-2">Discover the perfect treatment to elevate your style.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
