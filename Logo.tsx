interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeMap: Record<string, string> = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
    xl: 'h-28',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/kravine-logo-new.png" 
        alt="Kravine Studios Logo" 
        className={`${sizeMap[size]} w-auto object-contain transform scale-[2.5] origin-left`}
      />
    </div>
  );
}
