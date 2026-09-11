export default function AuthIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 420 380" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="210" cy="190" r="170" fill="#EEF3FF" />
      <circle cx="330" cy="70" r="26" fill="#DCE7FF" />
      <circle cx="60" cy="300" r="18" fill="#D6F5F0" />
      {/* doctor */}
      <g>
        <rect x="90" y="150" width="90" height="150" rx="30" fill="#2447C9" />
        <circle cx="135" cy="120" r="38" fill="#F3C9A0" />
        <path d="M100 118c0-24 18-42 35-42s35 18 35 42" stroke="#1B2430" strokeWidth="6" strokeLinecap="round" fill="none" />
        <rect x="118" y="200" width="34" height="10" rx="5" fill="#3FCBD1" />
        <circle cx="135" cy="205" r="4" fill="white" />
      </g>
      {/* patient */}
      <g>
        <rect x="220" y="170" width="80" height="130" rx="30" fill="#8CA9FF" />
        <circle cx="260" cy="140" r="34" fill="#8B5E44" />
        <path d="M226 150c0 30 15 55 34 55s34-25 34-55" fill="#1B2430" opacity="0.85" />
        <circle cx="260" cy="140" r="34" fill="#C68A5D" />
      </g>
      {/* heart bubble */}
      <g transform="translate(255,90)">
        <circle cx="30" cy="30" r="30" fill="white" stroke="#3FCBD1" strokeWidth="3" />
        <path d="M30 42c-10-7-17-13-17-21a10 10 0 0 1 17-7 10 10 0 0 1 17 7c0 8-7 14-17 21z" fill="#E14C46" />
      </g>
      <rect x="55" y="330" width="26" height="4" rx="2" fill="#3FCBD1" />
      <rect x="325" y="300" width="26" height="4" rx="2" fill="#3FCBD1" />
    </svg>
  );
}
