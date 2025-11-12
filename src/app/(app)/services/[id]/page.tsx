import Image from "next/image";
import { services, placeHolderImages } from "@/lib/data";
import { notFound } from "next/navigation";
import { Clock, Star, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BookingModalButton } from "./BookingModalButton";

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  const image = placeHolderImages.find((p) => p.id === service.imageId);

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full">
            {image && (
                <Image
                src={image.imageUrl}
                alt={service.name}
                data-ai-hint={image.imageHint}
                width={600}
                height={600}
                className="w-full aspect-square object-cover rounded-lg shadow-lg"
                />
            )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">{service.name}</h1>
          <p className="text-muted-foreground mb-6">{service.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent"/>
                <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-muted-foreground">{service.duration} minutes</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent"/>
                 <div>
                    <p className="font-semibold">Price</p>
                    <p className="text-muted-foreground">${service.price}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent"/>
                 <div>
                    <p className="font-semibold">Rating</p>
                    <p className="text-muted-foreground">{service.rating.toFixed(1)} / 5.0</p>
                </div>
            </div>
          </div>

          <BookingModalButton service={service} />
        </div>
      </div>
      
      <Separator className="my-8 md:my-12"/>
      
      <div>
        <h2 className="text-2xl font-headline font-bold mb-6 text-center text-primary">What Our Clients Say</h2>
        <div className="space-y-6">
            {service.testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-background/50">
                    <CardContent className="p-6 flex gap-4">
                         <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${testimonial.author}`} />
                            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{testimonial.author}</p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}/>
                                    ))}
                                </div>
                            </div>
                            <p className="text-muted-foreground italic">&ldquo;{testimonial.comment}&rdquo;</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
