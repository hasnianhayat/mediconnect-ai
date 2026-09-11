import Button from '../common/Button';
import { BadgeCheck } from 'lucide-react';

export default function ApprovalActions({ onAccept, onDecline, onVerify }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button size="sm" variant="outline">View Detail</Button>
      <Button size="sm" variant="mint" onClick={onAccept}>Accept Profile</Button>
      <Button size="sm" variant="danger" onClick={onDecline}>Decline Profile</Button>
      <Button size="sm" variant="secondary" icon={BadgeCheck} onClick={onVerify}>Verify PMDC</Button>
    </div>
  );
}
