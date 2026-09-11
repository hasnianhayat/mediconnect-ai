import Button from '../common/Button';

export default function TableActions({ status, onView, onToggleBlock, onSendReports }) {
  return (
    <div className="flex justify-end gap-2">
      <Button size="sm" variant="outline" onClick={onView}>View Profile</Button>
      <Button size="sm" variant={status === 'Blocked' ? 'mint' : 'danger'} onClick={onToggleBlock}>
        {status === 'Blocked' ? 'Unblock' : 'Block Profile'}
      </Button>
      {onSendReports && <Button size="sm" variant="secondary" onClick={onSendReports}>Send Reports</Button>}
    </div>
  );
}
