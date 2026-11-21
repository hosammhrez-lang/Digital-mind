import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function EditorialImage({ src, alt, className = '' }: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-[#EFECE5] text-[#57534E] p-6 text-center ${className}`}
      >
        <BookOpen className="w-7 h-7 text-[#1E3A8A]" aria-hidden="true" />
        <span className="text-xs font-medium max-w-xs">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
