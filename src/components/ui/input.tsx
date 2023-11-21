import { forwardRef } from 'react';

type InputLabelType = React.ComponentProps<'input'>;

export interface InputProps extends InputLabelType {
  label: string;
  htmlFor?: string;
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField(
  { label, htmlFor, ...props },
  ref
) {
  return (
    <label htmlFor={htmlFor} className="flex w-full flex-col items-start gap-4">
      <p className="text-[18px] font-medium">{label}</p>

      <input
        className="flex w-full gap-2 rounded-lg border border-ews-300 bg-white px-4 py-2 text-[18px] placeholder:font-medium placeholder:text-ews-300/50"
        {...props}
      />
    </label>
  );
});
