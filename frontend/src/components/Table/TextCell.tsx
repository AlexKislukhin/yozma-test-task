import { CellWrapper } from './CellWrapper';

export interface TextCellType {
  type: 'text';
  text: string;
}

export const TextCell = ({ text }: Omit<TextCellType, 'type'>) => {
  return <CellWrapper>{text}</CellWrapper>;
};
