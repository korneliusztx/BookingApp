import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Booking, Service } from "@/lib/types";
import { services } from "@/lib/data";
import { format } from "date-fns";
import { Scissors, Calendar, Clock } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
}

const statusProgress: { [key: string]: { value: number, color: string } } = {
  'Confirmed': { value: 33, color: "bg-blue-500" },
  'In Progress': { value: 66, color: "bg-yellow-500" },
  'Completed': { value: 100, color: "bg-green-500" },
  'Cancelled': { value: 100, color: "bg-red-500" },
};

export function BookingCard({ booking }: BookingCardProps) {
  const service = services.find(s => s.id === booking.serviceId);

  if (!service) return null;

  const progressInfo = statusProgress[booking.status] || { value: 0, color: "bg-gray-500" };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-primary flex items-center gap-2">
            <Scissors className="w-5 h-5"/>
            {service.name}
        </CardTitle>
        <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:gap-4 pt-1">
            <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4"/>
                {format(booking.bookingDate, "EEEE, MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-2">
                <Clock className="w-4 h-4"/>
                {format(booking.bookingDate, "p")}
            </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Status</p>
            <p className={`text-sm font-semibold text-right ${progressInfo.color.replace('bg-','text-')}`}>{booking.status}</p>
        </div>
        <Progress value={progressInfo.value} className="h-2 [&>div]:bg-primary" />
      </CardContent>
    </Card>
  );
}
