import { ColorKey } from 'tailwind-styles-config';
import { tailwindColors } from '@/styles-config/colors';

export const getHexColor = (color: ColorKey): string => {
  if (color in tailwindColors) {
    return tailwindColors[color];
  }

  return tailwindColors.black;
};
