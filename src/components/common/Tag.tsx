import { cva } from 'class-variance-authority';
import '@/app/globals.css';
import { ComponentProps } from 'react';

const largeTagVarients = cva(['text-subtitle2', 'font-medium', 'text-center', 'rounded'], {
  variants: {
    intent: {
      primary: ['bg-main-400', 'text-white', 'py-1', 'px-3']
    }
  },
  compoundVariants: [
    {
      intent: 'primary'
    }
  ],
  defaultVariants: {
    intent: 'primary'
  }
});

type TagProps = ComponentProps<'div'> & {
  label: string;
  intent: 'primary';
};

function Tag({ label, intent }: TagProps) {
  return <div className={largeTagVarients({ intent })}>{label}</div>;
}

export default Tag;
