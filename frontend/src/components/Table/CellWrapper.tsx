import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

export const CellWrapper = ({ children, ...rest }: PropsWithChildren<ComponentPropsWithoutRef<'div'>>) => {
  return (
    <div className="flex items-center justify-center flex-1 border border-solid border-gray-400 p-4 text-center" {...rest}>
      {children}
    </div>
  );
};
