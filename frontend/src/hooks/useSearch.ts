import { useQuery } from '@tanstack/react-query';
import { search, SearchParams } from '../api/search/search';

export const useSearch = ({ query, page, per_page }: SearchParams) => {
  return useQuery({ queryKey: ['search', query, per_page, page], queryFn: () => search({ query, page, per_page }) });
};
