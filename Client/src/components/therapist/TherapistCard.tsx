import { Star, MapPin, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TherapistCardProps {
  therapist: {
    id: string;
    name: string;
    school: string;
    city: string;
    specialty: string;
    rating: number;
    bio: string;
    profilePic: string;
    verified: boolean;
    available: Record<string, string[]>;
  };
  onSelect?: (therapist: TherapistCardProps["therapist"]) => void;
}

const TherapistCard = ({ therapist, onSelect }: TherapistCardProps) => {
  const availableDays = Object.keys(therapist.available);
  const dayNames: Record<string, string> = {
    monday: "Pzt",
    tuesday: "Sal",
    wednesday: "Çar",
    thursday: "Per",
    friday: "Cum",
    saturday: "Cmt",
    sunday: "Paz",
  };

  return (
    <article className="card-therapeutic overflow-hidden transition-all duration-300 hover:shadow-large hover:-translate-y-1">
      <div className="p-6">
        <div className="flex gap-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <img
              src={therapist.profilePic}
              alt={`${therapist.name} profil fotoğrafı`}
              className="h-20 w-20 rounded-xl object-cover shadow-soft"
            />
            {therapist.verified && (
              <div 
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-soft"
                title="Doğrulanmış Terapist"
              >
                <CheckCircle2 className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">
                  {therapist.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {therapist.school}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{therapist.rating}</span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {therapist.specialty}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {therapist.city}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {therapist.bio}
        </p>

        {/* Available Days */}
        <div className="mt-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <div className="flex flex-wrap gap-1">
            {availableDays.map((day) => (
              <span
                key={day}
                className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {dayNames[day]}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mt-4 flex gap-2">
          <Button 
            variant="therapeutic" 
            className="flex-1"
            onClick={() => onSelect?.(therapist)}
          >
            Randevu Al
          </Button>
          <Button variant="therapeutic-secondary">
            Profil
          </Button>
        </div>
      </div>
    </article>
  );
};

export default TherapistCard;
