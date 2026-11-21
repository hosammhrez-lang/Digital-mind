import { generateQrMatrix } from '../utils/magazineLogic';

interface QrCodeSvgProps {
  value: string;
  label: string;
  size?: number;
}

export function QrCodeSvg({ value, label, size = 104 }: QrCodeSvgProps) {
  const matrix = generateQrMatrix(value, 17);
  const cellSize = size / matrix.length;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      className="shrink-0 rounded-md border border-[#E5E0D8] bg-white p-1.5"
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      {matrix.map((row, rIdx) =>
        row.map((filled, cIdx) =>
          filled ? (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx * cellSize}
              y={rIdx * cellSize}
              width={cellSize + 0.15}
              height={cellSize + 0.15}
              fill="#1C1917"
            />
          ) : null
        )
      )}
    </svg>
  );
}
