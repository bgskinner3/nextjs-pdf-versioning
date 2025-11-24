import PDF from './svg/pdf';
import MagnifyingGlass from './svg/magnifying-glass';
import type { ComponentType } from 'react';
import { TIconProps } from '@/types/common-types';

export const BaseIcons = {
  pdf: PDF,
  magnifyingGlass: MagnifyingGlass,
} satisfies Record<string, ComponentType<TIconProps>>;
