BASE_URL = 'https://api.themoviedb.org/3/movie/';
API_KEY = 'api_key=9644f0ea42d355116080d8c56f2a2e95';

export async function trailerKey(id) {
  return await fetch(`${BASE_URL}${id}/videos?${KEY}&language=en-US`).then(
    respons => respons.json()
  );
}
