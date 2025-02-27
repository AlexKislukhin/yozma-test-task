import { ActionCell, ActionCellType } from './Table/ActionCell';
import { CellWrapper } from './Table/CellWrapper';
import { ImgCell, ImgCellType } from './Table/ImgCell';
import { TextCell, TextCellType } from './Table/TextCell';

const ArrowUp = <>&#9650;</>;
const ArrowDown = <>&#9660;</>;

type CellType = ActionCellType | ImgCellType | TextCellType;

type SortDirection = 'asc' | 'desc' | 'none';

interface TableProps {
  items: Array<CellType>[];
  headings: string[];
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageSizeChange: (pageSize: number) => void;
  isLoading: boolean;
  sort?: { field: string | null; direction: string | null };
  onSort: (field: string, direction: SortDirection) => void;
}

const CellTypeComponent = ({ item }: { item: CellType }) => {
  switch (item.type) {
    case 'img':
      return <ImgCell src={item.src} />;
    case 'text':
      return <TextCell text={item.text} />;
    case 'action':
      return <ActionCell text={item.text} onAction={item.onAction} />;
  }
};

const getNextSortDirection = (current: string | null) => {
  switch (current) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'none';
    case 'none':
      return 'asc';
    default:
      return 'desc';
  }
};

export const Table = ({ items, onNextPage, onPageSizeChange, onPreviousPage, onSort, sort, isLoading, headings }: TableProps) => {
  const handleSort = (heading: string) => {
    if (sort?.field === heading) {
      return onSort(heading, getNextSortDirection(sort.direction));
    }

    onSort(heading, 'desc');
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-row">
        {headings.map((heading) => (
          <CellWrapper onClick={() => handleSort(heading)}>
            {heading}
            {sort?.field === heading && sort.direction === 'asc' ? ArrowUp : sort?.field === heading && sort.direction === 'desc' ? ArrowDown : null}
          </CellWrapper>
        ))}
      </div>
      {!isLoading && items.length === 0 && <CellWrapper>No results</CellWrapper>}
      {isLoading && <CellWrapper>Loading...</CellWrapper>}
      <div className="w-full">
        {items.map((item) => (
          <div className="flex flex-row">
            {item.map((cell) => (
              <CellTypeComponent item={cell} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between mt-8">
        <button type="button" className="cursor-pointer" onClick={onPreviousPage}>
          Previous Page
        </button>
        <input
          className="border border-solid border-gray-400 p-2 rounded-xl"
          placeholder="Per Page"
          onChange={({ target }) => onPageSizeChange(parseInt(target.value))}
        />
        <button type="button" className="cursor-pointer" onClick={() => items && onNextPage()}>
          Next Page
        </button>
      </div>
    </div>
  );
};
