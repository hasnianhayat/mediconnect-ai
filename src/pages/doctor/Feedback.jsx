import { MessageSquare, ThumbsUp, Reply, Star } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

const feedback = [
  { name: 'Fatima Noor', text: 'Very professional and friendly doctor. Highly recommended!' },
  { name: 'Ahmed Javed', text: 'Excellent treatment and great experience. Thank you!' },
  { name: 'Sara Khan', text: 'Very kind and listens to patients carefully.' },
  { name: 'Usman Sheikh', text: 'Best consultation and proper guidance. Highly satisfied.' },
  { name: 'Hina Mughal', text: 'Great service and very cooperative staff.' },
  { name: 'Bilal Ahmed', text: 'Everything explained clearly, very satisfied.' },
];

const feedbackImages = ['/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

export default function Feedback() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 sm:text-2xl"><MessageSquare size={24} className="text-brand-600" />Patient Feedback</h1>
        <p className="mt-2 text-xs font-semibold text-ink-900/70 sm:text-sm">View what your patients are saying about your service.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {feedback.map((item, index) => (
          <Card key={`${item.name}-${index}`} className="p-4">
            <div className="mb-3 flex items-center gap-3">
              <Avatar name={item.name} src={feedbackImages[index % feedbackImages.length]} size={48} />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-ink-900 sm:text-sm">{item.name}</p>
                <div className="mt-1 flex text-amber-500" aria-label="5 star rating">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" strokeWidth={1.5} />)}
                </div>
              </div>
            </div>
            <p className="min-h-[48px] text-xs font-semibold leading-5 text-ink-900/75">{item.text}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" icon={Reply} className="!border-brand-200 !px-3 !py-1.5 !text-[10px] !text-brand-700">Reply</Button>
              <Button size="sm" variant="secondary" icon={ThumbsUp} className="!border-brand-200 !px-3 !py-1.5 !text-[10px] !text-brand-700">Like</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
