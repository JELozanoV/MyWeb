import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const WindsurfIcon = ({ size = 24, className, style }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M 2 7 C 2 15 5.5 18.5 9 14 C 10.5 11 12 11 13.5 14 C 17 18.5 22 15 22 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClaudeIcon = ({ size = 24, className, style }: IconProps) => {
  const spokes = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g transform="translate(12,12)">
        {spokes.map((angle) => (
          <rect
            key={angle}
            x="-1.2"
            y="-9.5"
            width="2.4"
            height="7"
            rx="1.2"
            fill="currentColor"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="2.5" fill="currentColor" />
      </g>
    </svg>
  );
};
