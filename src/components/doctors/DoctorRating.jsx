import { Star } from 'lucide-react';

export default function DoctorRating({ rating = 0, reviews, size = 13 }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink-900">
      <Star size={size} className="fill-amber-400 text-amber-400" />
      {rating.toFixed ? rating.toFixed(1) : rating}
      {reviews != null && <span className="font-normal text-ink-900/45">({reviews})</span>}
    </span>
  );
}
