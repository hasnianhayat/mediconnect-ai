const PALETTE = ['bg-brand-500', 'bg-teal-500', 'bg-mint-500', 'bg-amber-500', 'bg-coral-500'];

function hashName(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

export default function Avatar({ name = '', src, size = 44, className = '' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const color = PALETTE[hashName(name) % PALETTE.length];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={`flex items-center justify-center rounded-full font-display font-semibold text-white ${color} ${className}`}
    >
      {initials || '?'}
    </div>
  );
}
