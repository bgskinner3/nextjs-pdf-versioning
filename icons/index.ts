import PDF from './svg/pdf';
import MagnifyingGlass from './svg/magnifying-glass';
import EditMarker from './svg/edit';
import Trash from './svg/trash';
import Brush from './svg/brush';
import TextBox from './svg/text-box';
import Close from './svg/close';
import Message from './svg/message';
import type { ComponentType } from 'react';
import { TIconProps } from '@/types/common-types';

export const BaseIcons = {
  pdf: PDF,
  magnifyingGlass: MagnifyingGlass,
  editMarker: EditMarker,
  trash: Trash,
  brush: Brush,
  textBox: TextBox,
  close: Close,
  message: Message,
} satisfies Record<string, ComponentType<TIconProps>>;
