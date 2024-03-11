export type SearchPanelProps = {
  onSearch: (value: string) => void;
};

export type MovieListProps = {
  searchText: string;
};

export type MovieItemProps = {
  movie: Movie;
  onLikeClick: (newIsLiked: boolean) => void;
};

export type Movie = {
  id: number;
  title: string;
  backdrops: { file_path: string }[];
  original_title: string;
  original_language: string;
  release_date: string;
  overview: string;
};
