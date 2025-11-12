"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingModal } from "@/components/BookingModal";
import type { Service } from "@/lib/types";
import { placeHolderImages } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const image = placeHolderImages.find((p) => p.id === service.imageId);

  return (
    <>
      <Card className="w-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
        <CardHeader className="p-0">
          <Link href={`/services/${service.id}`} className="block">
            <div className="aspect-[4/3] relative">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={service.name}
                  data-ai-hint={image.imageHint}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
          </Link>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline mb-2">
            <Link href={`/services/${service.id}`} className="hover:text-primary transition-colors">
              {service.name}
            </Link>
          </CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{service.duration} min</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{service.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-bold text-primary">${service.price}</p>
          <Button onClick={() => setIsModalOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Book Now
          </Button>
        </CardFooter>
      </Card>
      <BookingModal
        service={service}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
