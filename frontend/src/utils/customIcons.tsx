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
    viewBox="0 0 1024 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M897.246 286.869H889.819C850.735 286.808 819.017 318.46 819.017 357.539V515.589C819.017 547.15 792.93 572.716 761.882 572.716C743.436 572.716 725.02 563.433 714.093 547.85L552.673 317.304C539.28 298.16 517.486 286.747 493.895 286.747C457.094 286.747 423.976 318.034 423.976 356.657V515.619C423.976 547.181 398.103 572.746 366.842 572.746C348.335 572.746 329.949 563.463 319.021 547.881L138.395 289.882C134.316 284.038 125.154 286.93 125.154 294.052V431.892C125.154 438.862 127.285 445.619 131.272 451.34L309.037 705.2C319.539 720.204 335.033 731.344 352.9 735.392C397.616 745.557 438.77 711.135 438.77 667.278V508.406C438.77 476.845 464.339 451.279 495.904 451.279H495.995C515.02 451.279 532.857 460.562 543.785 476.145L705.235 706.661C718.659 725.835 739.327 737.218 763.983 737.218C801.606 737.218 833.841 705.9 833.841 667.308V508.376C833.841 476.815 859.41 451.249 890.975 451.249H897.276C901.233 451.249 904.43 448.053 904.43 444.097V294.021C904.43 290.065 901.233 286.869 897.276 286.869H897.246Z"
      fill="currentColor"
    />
  </svg>
);

export const ClaudeIcon = ({ size = 24, className, style }: IconProps) => {
  const rays: [number, number, number][] = [
    [-5, 9.5, 1.35],
    [28, 8.0, 1.25],
    [58, 6.8, 1.15],
    [95, 6.2, 1.1],
    [132, 7.8, 1.25],
    [160, 9.0, 1.35],
    [192, 10.0, 1.4],
    [222, 8.2, 1.25],
    [250, 6.8, 1.15],
    [282, 5.8, 1.1],
    [320, 7.5, 1.2],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {rays.map(([angleDeg, length, halfWidth], i) => {
        const a = (angleDeg * Math.PI) / 180;
        const tipX = 12 + length * Math.sin(a);
        const tipY = 12 - length * Math.cos(a);
        const bx1 = 12 + halfWidth * Math.cos(a);
        const by1 = 12 + halfWidth * Math.sin(a);
        const bx2 = 12 - halfWidth * Math.cos(a);
        const by2 = 12 - halfWidth * Math.sin(a);
        return (
          <polygon
            key={i}
            points={`${bx1.toFixed(2)},${by1.toFixed(2)} ${tipX.toFixed(2)},${tipY.toFixed(2)} ${bx2.toFixed(2)},${by2.toFixed(2)}`}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
};
