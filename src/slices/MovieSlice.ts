import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, Movie } from "../utils/interfaces";
import axios from "axios";
import { headers, url } from "../utils/api";
import { format } from "date-fns";

interface MoviesState {
  movies: Movie[];
  movieById: Movie;
  originalMovies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await axios.get(url, { headers });
    return response.data as ApiResponse;
  } catch (error) {
    throw error;
  }
});

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
        { headers }
      );

      const date = new Date(response.data.release_date);

      const dateFormated = format(date, "dd/MM/yyyy");

      const movie: Movie = {
        id: response.data.id,
        title: response.data.title,
        poster_path:
          "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/" +
          response.data.poster_path,
        price: parseInt(response.data.id.toString().slice(-2)),
        overview: response.data.overview,
        popularity: response.data.popularity,
        original_title: response.data.original_title,
        release_date: dateFormated,
        tagline: response.data.tagline,
        runtime: response.data.runtime,
      };
      return movie;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: MoviesState = {
  movies: [],
  movieById: {
    poster_path: "",
    id: 0,
    title: "",
    price: 0,
  },
  originalMovies: [],
  status: "idle",
  error: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    findByName: (state, action: PayloadAction<string>) => {
      state.movies = state.originalMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
    clearFilter: (state) => {
      state.movies = [...state.originalMovies];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path:
            "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/" +
            movie.poster_path,
          price: parseInt(movie.id.toString().slice(-2)),
        }));
        state.originalMovies = [...state.movies];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieById = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { findByName, clearFilter } = movieSlice.actions;

export default movieSlice.reducer;
