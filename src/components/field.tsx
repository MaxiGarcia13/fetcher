import { cn } from '@maxigarcia/js-utils';

interface FieldProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
  label?: string;
  name?: string;
  id?: string;
}

export function Field({ children, error, className, label, name, id }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', error && 'border-red-500 focus:border-red-500 border!', className)}>
      {label && <label htmlFor={id ?? name} className="text-sm">{label}</label>}
      {children}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
