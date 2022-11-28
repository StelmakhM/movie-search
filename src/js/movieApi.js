import axios from 'axios';

class MovieApi {
  #BASE_URL_TRANDING = 'https://api.themoviedb.org/3/trending/movie/week';
  #API_KEY = '9644f0ea42d355116080d8c56f2a2e95';

  constructor() {}

  async fetchTrendingMovies() {
    searchParams = {
      params: {
        api_key: this.#API_KEY,
      },
    };

    const response = await axios.get(
      `${this.#BASE_URL_TRANDING}?${searchParams}`
    );
  }
}
