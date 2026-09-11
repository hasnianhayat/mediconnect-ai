import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MessageSquare, Send, Star } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Textarea from '../../components/common/Textarea';
import { doctors, featuredDoctor } from '../../data/doctors';

const initialReviews = [
  { name: 'Ayesha Malik', rating: 5, text: 'Dr. Ali listened carefully and explained my treatment clearly. The consultation felt thoughtful and reassuring.', date: '2 weeks ago' },
  { name: 'Hassan Ahmed', rating: 4, text: 'Professional, punctual, and helpful throughout the appointment.', date: '1 month ago' },
];

export default function DoctorFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const doctor = { ...featuredDoctor, ...doctors.find((item) => String(item.id) === id) };

  useEffect(() => {
    if (searchParams.get('add') === '1') formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [searchParams]);

  const submitFeedback = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    setReviews((current) => [{ name: 'Muhammad Ali', rating, text: comment.trim(), date: 'Just now' }, ...current]);
    setComment('');
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <button type="button" onClick={() => navigate(`/patient/doctor-profile/${doctor.id}`)} className="flex items-center gap-1.5 text-xs font-bold text-ink-900/60 transition hover:text-brand-600">
        <ArrowLeft size={16} /> Back to Doctor Profile
      </button>

      <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-6">
        <Avatar name={doctor.name} src={doctor.image} size={72} className="ring-4 ring-brand-50" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Patient Feedback</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{doctor.name}</h1>
          <p className="mt-1 text-sm font-semibold text-ink-900/60">{doctor.specialty} · {doctor.city}, {doctor.region}</p>
        </div>
      </Card>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <MessageSquare size={18} className="text-brand-600" />
          <h2 className="font-display text-lg font-bold text-brand-700">What patients are saying</h2>
        </div>
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <Card key={`${review.name}-${index}`} className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-ink-900">{review.name}</p>
                  <div className="mt-1 flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((value) => <Star key={value} size={15} className={value <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-sand-300'} />)}
                  </div>
                </div>
                <span className="text-xs font-semibold text-ink-900/45">{review.date}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-900/65">{review.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card ref={formRef} className="p-4 sm:p-6">
        <h2 className="font-display text-lg font-bold text-brand-700">Add your feedback</h2>
        <p className="mt-1 text-sm text-ink-900/55">Share your experience to help other patients make informed choices.</p>
        {submitted && <p className="mt-4 rounded-lg bg-mint-50 px-3 py-2 text-sm font-semibold text-mint-700">Thanks, your feedback was submitted successfully.</p>}
        <form onSubmit={submitFeedback} className="mt-5 space-y-4">
          <div>
            <p className="field-label">Your rating</p>
            <div className="flex gap-1" role="group" aria-label="Choose a rating">
              {[1, 2, 3, 4, 5].map((value) => <button type="button" key={value} onClick={() => setRating(value)} aria-label={`${value} star${value === 1 ? '' : 's'}`} className="rounded p-1 transition hover:bg-amber-50"><Star size={24} className={value <= rating ? 'fill-amber-400 text-amber-400' : 'text-sand-300'} /></button>)}
            </div>
          </div>
          <Textarea label="Your comment" required value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Tell us about your appointment..." className="min-h-[120px]" />
          <Button type="submit" icon={Send} className="w-full sm:w-auto">Submit Feedback</Button>
        </form>
      </Card>
    </div>
  );
}
