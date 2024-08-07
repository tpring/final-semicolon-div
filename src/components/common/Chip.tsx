import { cva } from 'class-variance-authority';
import '@/app/globals.css';
import { ComponentProps } from 'react';

const largeChipVarients = cva(['text-subtitle1', 'font-bold', 'text-center'], {
  variants: {
    intent: {
      primary: ['bg-main-400', 'text-white', 'hover:bg-main-500', 'active:bg-main-500'],
      primary_disabled: ['bg-main-100', 'text-neutral-50', 'cursor-default'],
      secondary: ['bg-main-50', 'text-main-400', 'hover:bg-main-100', 'active:bg-main-100'],
      secondary_disabled: ['bg-main-50', 'text-main-100', 'cursor-default'],
      gray: ['bg-neutral-50', 'text-neutral-500', 'hover:bg-neutral-100', 'active:text-neutral-500'],
      gray_disabled: ['bg-neutral-50', 'text-neutral-100', 'cursor-default'],
      default: [
        'bg-white',
        'border border-neutral-200',
        'text-neutral-500',
        'hover:bg-neutral-50',
        'active:bg-neutral-50'
      ],
      default_disabled: ['bg-white', 'border border-neutral-200', 'text-neutral-100']
    },
    size: {
      large: 'px-6 py-4  rounded-lg',
      medium: 'px-5 py-3  rounded-md',
      small: 'px-4 py-2  rounded'
    }
  },

  compoundVariants: [
    {
      intent: 'primary',
      size: 'medium'
    }
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium'
  }
});

type ChipProps = ComponentProps<'button'> & {
  label: string;
  intent?:
    | 'primary'
    | 'primary_disabled'
    | 'secondary'
    | 'secondary_disabled'
    | 'gray'
    | 'gray_disabled'
    | 'default'
    | 'default_disabled';
  size?: 'large' | 'medium' | 'small';
};

function Chip({ label, intent, size, ...props }: ChipProps) {
  return (
    <button className={largeChipVarients({ intent, size })} {...props}>
      {label}
    </button>
  );
}

export default Chip;
