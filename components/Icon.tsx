/**
 * Line-mark icon set, drawn on a 24px grid with a consistent 1.5 stroke so the
 * six specialisms read as one family rather than six borrowed pictograms.
 * Colour comes from `currentColor`, so these inherit the blue palette.
 */
export type IconName =
  | 'neuro'
  | 'elder'
  | 'surgical'
  | 'balance'
  | 'joint'
  | 'lungs'
  | 'shield'
  | 'chartered'
  | 'home'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'calendar'
  | 'arrow'
  | 'check'
  | 'chevron';

const paths: Record<IconName, JSX.Element> = {
  // Neurological — a signal branching through nodes
  neuro: (
    <>
      <circle cx="5" cy="18.5" r="1.9" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="19" cy="6" r="1.9" />
      <circle cx="19" cy="17.5" r="1.6" />
      <path d="M6.5 17.2 10.4 13.5M13.7 10.5 17.4 7.2M13.9 13.2 17.6 16.2" />
    </>
  ),
  // Geriatric — widening rings of support around a figure
  elder: (
    <>
      <circle cx="12" cy="6" r="2.4" />
      <path d="M8 20a4 4 0 0 1 8 0" />
      <path d="M4 20.5a8 8 0 0 1 4.2-7.05M19.8 20.5a8 8 0 0 0-4.2-7.05" />
    </>
  ),
  // Post-operative — a healing line, closed and supported
  surgical: (
    <>
      <path d="M3 12h18" />
      <path d="M7 8.5v7M12 7v10M17 8.5v7" />
    </>
  ),
  // Balance — an axis resting on a pivot
  balance: (
    <>
      <path d="M3.6 9.4 20.4 14.6" />
      <path d="M12 12.1V17" />
      <path d="M7.5 20h9L12 16.6z" />
    </>
  ),
  // Musculoskeletal — two segments articulating at a joint
  joint: (
    <>
      <path d="M4 8h5a3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M4 5v6M20 13v6" />
    </>
  ),
  // Respiratory — paired breath arcs
  lungs: (
    <>
      <path d="M12 4v9" />
      <path d="M12 13c0 4-2.4 7-5.4 7C4.6 20 4 18.1 4 15.6 4 12.1 6 9.6 8.4 9.1" />
      <path d="M12 13c0 4 2.4 7 5.4 7 2 0 2.6-1.9 2.6-4.4 0-3.5-2-6-4.4-6.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5 5.8v6c0 4.3 2.9 7.6 7 8.7 4.1-1.1 7-4.4 7-8.7v-6z" />
      <path d="M9.2 12.1 11.3 14.2 15 10.4" />
    </>
  ),
  chartered: (
    <>
      <circle cx="12" cy="9.5" r="5.2" />
      <path d="M9.6 13.9 8.4 21l3.6-2 3.6 2-1.2-7.1" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.4 12 4l8 6.4V20H4z" />
      <path d="M9.5 20v-5.4h5V20" />
    </>
  ),
  phone: (
    <path d="M7 3.6 9.4 8l-1.7 2a11 11 0 0 0 5.3 5.2l2-1.7 4.4 2.4v3.3c0 .8-.7 1.5-1.5 1.4C9.8 20 3.9 14.1 3.2 6.1c-.1-.8.6-1.5 1.4-1.5z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.9 6.6 12 12.9l8.1-6.3" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.4-6.1 6.4-10.5A6.4 6.4 0 0 0 5.6 10.5C5.6 14.9 12 21 12 21z" />
      <circle cx="12" cy="10.3" r="2.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.8h17M8.5 3v4M15.5 3v4" />
    </>
  ),
  arrow: <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />,
  check: <path d="M4.5 12.6 9.3 17.4 19.5 7.2" />,
  chevron: <path d="M6 9.5 12 15.5 18 9.5" />,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
