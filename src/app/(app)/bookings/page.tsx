"use client";

import { useAppContext } from "@/hooks/useAppContext";
import { BookingCard } from "@/components/BookingCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookingsPage() {
  const { currentUser, bookings } = useAppContext();

  const userBookings = bookings
    .filter(b => b.userId === currentUser?.id)
    .sort((a, b) => b.bookingDate.getTime() - a.bookingDate.getTime());

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">My Bookings</h1>
        <p className="text-lg text-muted-foreground mt-2">Here are your past and upcoming appointments.</p>
      </div>

      {userBookings.length > 0 ? (
        <div className="space-y-6 max-w-3xl mx-auto">
          {userBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-muted-foreground">No bookings yet!</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't booked any services.</p>
          <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/services">
              Explore Services
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
