const baseUrl = 'https://api.apixu.com/v1/current.json';
const key = 'e220f55040884e7fa38100055191707';

export default {
  query: '',
  latitude: 0,
  longitude: 0,
  fetchWeather() {
    const requestParams = `?key=${key}&q=${this.query}`;

    return fetch(baseUrl + requestParams)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error();
      })
      .catch(error => {
        throw new Error();
      });
  },

  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
};
