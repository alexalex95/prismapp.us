type Props = {
  size?: number;
  className?: string;
};

export default function PrismLogo({ size = 40, className }: Props) {
  const id = "pl"; // short stable id prefix for gradients

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Prism"
    >
      <defs>
        {/* Left face — lighter, catching light */}
        <linearGradient id={`${id}-l`} x1="12" y1="5" x2="12" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        {/* Right face — deeper, in shadow */}
        <linearGradient id={`${id}-r`} x1="28" y1="5" x2="28" y2="33" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>

        {/* Apex glow bloom */}
        <radialGradient id={`${id}-g`} cx="50%" cy="0%" r="40%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#ddd6fe" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Left face of prism */}
      <path d="M20 5 L5 33 L20 33 Z" fill={`url(#${id}-l)`} />

      {/* Right face of prism */}
      <path d="M20 5 L35 33 L20 33 Z" fill={`url(#${id}-r)`} />

      {/* Outer edge — crisp rim light */}
      <path
        d="M20 5 L5 33 L35 33 Z"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />

      {/* Centre edge — the prism ridge */}
      <line
        x1="20" y1="5" x2="20" y2="33"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.75"
      />

      {/* Bottom base edge highlight */}
      <line
        x1="5" y1="33" x2="35" y2="33"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.75"
      />

      {/* Apex glow — where light enters */}
      <circle cx="20" cy="5" r="5" fill={`url(#${id}-g)`} />
      <circle cx="20" cy="5" r="1.8" fill="rgba(255,255,255,0.65)" />
    </svg>
  );
}
