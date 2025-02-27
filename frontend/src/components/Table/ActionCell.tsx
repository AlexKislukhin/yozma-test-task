import { CellWrapper } from './CellWrapper';

export interface ActionCellType {
  type: 'action';
  text: string;
  onAction: () => void;
}

export const ActionCell = ({ text, onAction }: Omit<ActionCellType, 'type'>) => {
  return (
    <CellWrapper>
      <button className="cursor-pointer bg-blue-400 p-4 rounded-xl text-white active:bg-gray-400 active:text-black" type="button" onClick={onAction}>
        {text}
      </button>
    </CellWrapper>
  );
};
