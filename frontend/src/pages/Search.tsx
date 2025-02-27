import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useSearch } from '../hooks/useSearch';
import { useDebounce } from '../hooks/useDebounce';
import { Table } from '../components/Table';
import { useEffect } from 'react';
import { addFavorite } from '../api/favorite/addFavorite';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const per_page = parseInt(searchParams.get('per_page') || '10');
  const field = searchParams.get('field');
  const direction = searchParams.get('direction');

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    updateQuery(['page', '1']);
  }, [debouncedQuery, per_page]);

  const { data, isLoading } = useSearch({ query: debouncedQuery, page, per_page });

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const updateQuery = (...params: [string, string][]) => {
    const newParams = new URLSearchParams(searchParams);
    params.forEach(([key, value]) => newParams.set(key, value));
    navigate(`${pathname}?${newParams.toString()}`, { replace: true });
  };

  return (
    <div className="w-full px-12 py-24">
      <h1 className="w-full text-5xl font-bold text-center mb-8">Search for songs</h1>
      <div>
        <input
          className="border border-solid border-grey-400 p-4 rounded-md mb-4"
          placeholder="Search"
          type="text"
          onChange={({ target }) => updateQuery(['query', target.value])}
          value={query}
        />
        <Table
          items={
            data?.map((item) => {
              return [
                { type: 'img', src: item.album.cover },
                { type: 'text', text: item.artists },
                {
                  type: 'text',
                  text: item.name,
                },
                { type: 'action', text: 'Add to Favorites', onAction: () => addFavorite(item.id) },
              ];
            }) || []
          }
          onNextPage={() => updateQuery(['page', (page + 1).toString()])}
          onPreviousPage={() => updateQuery(['page', Math.max(page - 1, 1).toString()])}
          onPageSizeChange={(pageSize) => updateQuery(['per_page', pageSize.toString()])}
          isLoading={isLoading}
          headings={['Cover', 'Artists', 'Name', 'Add To Favorites']}
          onSort={(field, direction) => {
            // Sorting should be done on the backend side,
            // due to limitation of the external API I'm leaving this as a placeholder
            updateQuery(['field', field], ['direction', direction]);
          }}
          sort={{ field, direction }}
        />
      </div>
    </div>
  );
};
