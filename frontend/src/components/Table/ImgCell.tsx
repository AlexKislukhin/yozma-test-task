import { CellWrapper } from './CellWrapper';

export interface ImgCellType {
  type: 'img';
  src: string;
}

export const ImgCell = ({ src }: Omit<ImgCellType, 'type'>) => {
  return (
    <CellWrapper>
      <img src={src} alt="img" className="h-40 w-40 rounded-full" />
    </CellWrapper>
  );
};
