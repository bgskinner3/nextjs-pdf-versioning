import PDF from './svg/pdf'
import type { ComponentType } from 'react';
import { TIconProps } from '@/types/common';


export const BaseIcons = {
  pdf: PDF,

} satisfies Record<string, ComponentType<TIconProps>>;