export interface APIResponse {
  query: string;
  tracks: {
    totalCount: number;
    items: {
      data: {
        uri: string;
        id: string;
        name: string;
        artists: { items: { profile: { name: string } }[] };
        albumOfTrack: {
          coverArt: {
            sources: { url: string; width: number; height: number }[];
          };
        };
      };
    }[];
    pagingInfo: { nextOffset: number; limit: number };
  };
}
