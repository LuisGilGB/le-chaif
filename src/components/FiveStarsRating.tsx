import { IconStar } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface FiveStarsRatingProps {
  rating: number;
  className?: string;
}

const FiveStarsRating = ({ rating, className }: FiveStarsRatingProps) => (
  <div className={cn('flex items-center gap-1', className)}>
    {Array.from({ length: 5 }).map((_, index) => (
      <IconStar
        key={index}
        className={`size-5 ${index < rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
      />
    ))}
  </div>
);

export default FiveStarsRating;
