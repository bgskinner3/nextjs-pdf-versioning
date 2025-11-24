import PDF from './svg/pdf';
import MagnifyingGlass from './svg/magnifying-glass';
import EditMarker from './svg/edit';
import type { ComponentType } from 'react';
import { TIconProps } from '@/types/common-types';

export const BaseIcons = {
  pdf: PDF,
  magnifyingGlass: MagnifyingGlass,
  editMarker: EditMarker,
} satisfies Record<string, ComponentType<TIconProps>>;
