import { forwardRef } from 'react';
import type { TIconProps } from '@/types';
import { BaseIcons } from '@/icons';
import { cn } from '@/utils';
import { ObjectUtils } from '@/utils';

const defaultProps = {
  size: 'm',
  rotation: 'none',
  color: 'currentColor',
} as const;
const sizes = {
  none: '',
  s: 'w-3 h-3',
  m: 'w-4 h-4',
  l: 'w-5 h-5',
  xl: 'w-6 h-6',
} as const;

export const basicIconSizes = ObjectUtils.keys(sizes);
export const basicIconList = ObjectUtils.keys(BaseIcons);
type BasicIconProps = TIconProps & {
  label?: string;
  name: keyof typeof BaseIcons;
  size?: keyof typeof sizes;
};
export const BasicIcon = forwardRef<SVGSVGElement, BasicIconProps>(
  (props, ref) => {
    if (!props.name) {
      throw new Error('Icon name is required');
    }

    const Component = BaseIcons[props.name];
    const size = props.size ?? defaultProps.size;
    const sizeStyles = sizes[size];
    return (
      <Component
        role="img"
        aria-label={props.name}
        {...props}
        color={props.color ?? defaultProps.color}
        className={cn(sizeStyles, props.className)}
        ref={ref}
      />
    );
  },
);

BasicIcon.displayName = 'BasicIcon';
