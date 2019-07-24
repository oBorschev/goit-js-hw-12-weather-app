import fetchWeatherService from './services/fetchWeather';
import fetchGeoPosition from './services/getGeoPosition';
import templateForLocation from '../templates/weather.hbs';

import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js';
// import PNotifyStyleMaterial from '../../pnotify/dist/es/PNotifyStyleMaterial.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  sectionWeather: document.querySelector('#weather'),
};

refs.searchForm.addEventListener('submit', loadWeather);

askLocation();

function askLocation() {
  fetchGeoPosition
    .getCurrentPosition()
    .then(location => {
      setLocation(location);
      fetchGeoPosition
        .fetchWeatherByLocation()
        .then(item => insertWeather(item));
    })
    .catch(cancel =>
      PNotify.notice({
        text:
          'Нет прав доступа к геопозиции, используйте поиск по имени города.',
        delay: 1000,
      }),
    );
}

function setLocation(location) {
  fetchGeoPosition.latitude = location.coords.latitude;
  fetchGeoPosition.longitude = location.coords.longitude;
  // console.log(weatherService.latitude, weatherService.longitude);
}

function loadWeather(e) {
  e.preventDefault();
  clearSectionWeather();
  const form = e.currentTarget;
  const input = form.elements.city;
  fetchWeatherService.searchQuery = input.value;
  fetchWeather(fetchWeatherService.fetchWeather());
}

function fetchWeather(fetchweather) {
  fetchweather
    .then(item => insertWeather(item))
    .catch(error => {
      errorNotification();
      console.warn(error);
    });
}
function insertWeather(item) {
  const markup = templateForLocation(item);
  refs.sectionWeather.insertAdjacentHTML('beforeend', markup);
  refs.sectionWeather.classList.remove('is-hidden');
}

function clearSectionWeather() {
  refs.sectionWeather.innerHTML = '';
}

function errorNotification() {
  PNotify.error({
    text: 'Такой город не найден',
  });
}
