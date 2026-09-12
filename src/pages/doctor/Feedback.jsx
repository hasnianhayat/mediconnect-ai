import { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, Star } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';

const initialFeedback = [
  { id: 1, name: 'Fatima Noor', text: 'Very professional and friendly doctor. Highly recommended!', likes: 24, liked: false, reply: '' },
  { id: 2, name: 'Ahmed Javed', text: 'Excellent treatment and great experience. Thank you!', likes: 18, liked: false, reply: '' },
  { id: 3, name: 'Sara Khan', text: 'Very kind and listens to patients carefully.', likes: 21, liked: false, reply: '' },
  { id: 4, name: 'Usman Sheikh', text: 'Best consultation and proper guidance. Highly satisfied.', likes: 16, liked: false, reply: '' },
  { id: 5, name: 'Hina Mughal', text: 'Great service and very cooperative staff.', likes: 12, liked: false, reply: '' },
  { id: 6, name: 'Bilal Ahmed', text: 'Everything explained clearly, very satisfied.', likes: 14, liked: false, reply: '' },
];

const feedbackImages = ['/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

export default function Feedback() {
  const [feedbackItems, setFeedbackItems] = useState(initialFeedback);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});

  const handleToggleLike = (id) => {
    setFeedbackItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        const isLiked = !item.liked;

        return {
          ...item,
          liked: isLiked,
          likes: Math.max(0, item.likes + (isLiked ? 1 : -1)),
        };
      })
    );
  };

  const handleReplySubmit = (id) => {
    const draft = (replyDrafts[id] || '').trim();

    if (!draft) return;

    setFeedbackItems((current) =>
      current.map((item) => (item.id === id ? { ...item, reply: draft } : item))
    );
    setReplyingTo(null);
    setReplyDrafts((current) => ({ ...current, [id]: '' }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900 sm:text-2xl"><MessageSquare size={24} className="text-brand-600" />Patient Feedback</h1>
        <p className="mt-2 text-xs font-semibold text-ink-900/70 sm:text-sm">View what your patients are saying about your service.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {feedbackItems.map((item, index) => (
          <Card key={item.id} className="p-4">
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

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant={replyingTo === item.id ? 'secondary' : 'outline'}
                icon={Reply}
                onClick={() => setReplyingTo((current) => (current === item.id ? null : item.id))}
                className="!border-brand-200 !px-3 !py-1.5 !text-[10px] !text-brand-700"
              >
                {replyingTo === item.id ? 'Cancel' : 'Reply'}
              </Button>
              <Button
                size="sm"
                variant={item.liked ? 'secondary' : 'outline'}
                icon={ThumbsUp}
                onClick={() => handleToggleLike(item.id)}
                className="!border-brand-200 !px-3 !py-1.5 !text-[10px] !text-brand-700"
              >
                {item.liked ? 'Liked' : 'Like'}{item.likes > 0 ? ` (${item.likes})` : ''}
              </Button>
            </div>

            {replyingTo === item.id && (
              <div className="mt-3 space-y-2">
                <textarea
                  value={replyDrafts[item.id] || ''}
                  onChange={(event) =>
                    setReplyDrafts((current) => ({
                      ...current,
                      [item.id]: event.target.value,
                    }))
                  }
                  rows={3}
                  placeholder={`Write a reply to ${item.name}`}
                  className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-xs font-medium text-ink-900 outline-none focus:border-brand-400"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyDrafts((current) => ({ ...current, [item.id]: '' }));
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleReplySubmit(item.id)}>
                    Send Reply
                  </Button>
                </div>
              </div>
            )}

            {item.reply && (
              <div className="mt-3 rounded-lg bg-brand-50 p-3 text-xs font-semibold text-ink-900/75">
                <p className="mb-1 font-bold text-brand-700">Your reply</p>
                <p>{item.reply}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
