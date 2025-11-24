import { forwardRef } from 'react';
import { TIconProps } from '@/types/common-types';

const Close = forwardRef<SVGSVGElement, TIconProps>((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={props.color}
      ref={ref}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.40864 3.47312C4.14711 3.26977 3.76896 3.28825 3.52864 3.52858C3.26829 3.78892 3.26829 4.21103 3.52864 4.47138L7.05723 7.99998L3.52864 11.5286L3.47318 11.5914C3.26983 11.8529 3.28831 12.2311 3.52864 12.4714C3.78899 12.7317 4.2111 12.7317 4.47145 12.4714L8.00004 8.94279L11.5286 12.4714L11.5914 12.5268C11.853 12.7302 12.2311 12.7117 12.4714 12.4714C12.7318 12.211 12.7318 11.7889 12.4714 11.5286L8.94285 7.99998L12.4714 4.47138L12.5269 4.40858C12.7303 4.14705 12.7118 3.7689 12.4714 3.52858C12.2111 3.26823 11.789 3.26823 11.5286 3.52858L8.00004 7.05717L4.47145 3.52858L4.40864 3.47312Z"
      />
    </svg>
  );
});

Close.displayName = 'Close';

export default Close;
