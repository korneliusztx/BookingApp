"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import type { Service } from "@/lib/types";

export function BookingModalButton({ service }: { service: Service }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
        Book This Service
      </Button>
      <BookingModal
        service={service}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
