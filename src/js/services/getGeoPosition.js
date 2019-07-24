const baseUrl = 'https://api.apixu.com/v1/current.json';
const key = 'e220f55040884e7fa38100055191707';

export default {
  latitude: 0,
  longitude: 0,

  fetchWeatherByLocation() {
    const requestParams = `?key=${key}&q=${this.latitude},${this.longitude}`;
    return fetch(baseUrl + requestParams)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error();
      })
      .catch(error => {
        console.log(error);
      });
  },

  getCurrentPosition() {
    const maxAge = 30 * 60000;
    const options = {
      maximumAge: maxAge,
    };
    return new Promise((success, cancel) => {
      navigator.geolocation.getCurrentPosition(success, cancel, options);
    });
  },
};
