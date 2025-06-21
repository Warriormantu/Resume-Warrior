export function Logo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      aria-label="Resume Warrior Logo"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#007CF0" />
          <stop offset="100%" stopColor="#00DFD8" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shield Outline */}
        <path
          d="M4 8V12C4 18 12 22 12 22C12 22 20 18 20 12V8C20 4.5 17 2 12 2C7 2 4 4.5 4 8Z"
          fill="none"
        />

        {/* Document */}
        <path d="M8 7H11L12.5 8.5V15H8V7Z" fill="none" />
        <path d="M9 11H11.5" />
        <path d="M9 13H11.5" />

        {/* Pen */}
        <path d="M12 9L16 13L14.5 14.5L10.5 10.5L12 9Z" fill="none" />
      </g>
    </svg>
  );
}