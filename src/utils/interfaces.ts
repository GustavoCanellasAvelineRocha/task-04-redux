export interface Movie {
  poster_path: string;
  id: number;
  title: string;
  price: number;
  overview?: string;
  popularity?: string;
  original_title?: string;
  release_date?: string;
  tagline?: string;
  runtime?: number;
}

export interface ApiResponse {
  results: Movie[];
}

export interface Rate {
  id: number;
  rate: number;
  text?: string;
  id_movie: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface CustomError {
  data: { error: string };
}
