import axios from 'axios';

export class MovieApi {
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #API_KEY = '9644f0ea42d355116080d8c56f2a2e95';
  #BEARER_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQ0ZjBlYTQyZDM1NTExNjA4MGQ4YzU2ZjJhMmU5NSIsInN1YiI6IjYzODQ5YThiYmYwOWQxMDA3YjA1ZGNhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Malh7hKQ8cPpJehS1trEierjSDz873qjS069_qwsppI';
  #IMG_URL = 'https://image.tmdb.org/t/p/';
  #MOVIE_BASE_URL = 'https://api.themoviedb.org/3/movie/';
  #MOVIE_API_KEY = 'api_key=9644f0ea42d355116080d8c56f2a2e95';

  constructor() {
    this.imgUrl = this.#IMG_URL;
    this.imgSize = 'w500';
    this.page = 1;
    this.query = null;
  }

  async fetchTrendingMovies(page = 1) {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page,
      },
    };
    return await axios.get(
      `${this.#BASE_URL + 'trending/movie/week'}`,
      searchParams
    );
  }

  async fetchMoviesGenres() {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
    };
    return await axios.get(
      `${this.#BASE_URL + 'genre/movie/list'}`,
      searchParams
    );
  }

  async fetchMoviesbyName(page = 1) {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page,
        query: this.query,
        include_adult: false,
      },
    };
    return await axios.get(`${this.#BASE_URL + 'search/movie'}`, searchParams);
  }

  async fetchIoMoviesbyName() {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page: this.page,
        query: this.query,
        include_adult: false,
      },
    };
    return await axios.get(`${this.#BASE_URL + 'search/movie'}`, searchParams);
  }

  async fetchIoTrendingMovies() {
    const searchParams = {
      headers: {
        Authorization: `${this.#BEARER_TOKEN}`,
      },
      params: {
        page: this.page,
      },
    };
    return await axios.get(
      `${this.#BASE_URL + 'trending/movie/week'}`,
      searchParams
    );
  }

  async fetchMovieTrailerById(id) {
    const response = await fetch(
      `${this.#MOVIE_BASE_URL}${id}/videos?${
        this.#MOVIE_API_KEY
      }&language=en-US`
    );
    const { results } = await response.json();
    return results[0].key;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
