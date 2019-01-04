// Init Service Worker
initSW();

// Init storage object
const storage = new Storage;

// Get stored location data
const weatherLocation = storage.getLocationData();

// Init weather object
const weather = new Weather(weatherLocation.zip);

// Init UI object
const ui = new UI;

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeatherUsingZip);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', e => {
 const zip = document.getElementById('zip').value;

 if (zip && validateZip(zip)) {
  // Change location
  weather.changeLocationUsingZip(zip);

  // Set location in LS
  storage.setLocationData(zip);

  // Get and display weather
  getWeatherUsingZip();

  // Close modal
  $('#locModal').modal('hide');
 } else {
  console.log('Please, provide a right zip code');
 }

});

function validateZip(zip) {
 return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
}

function getWeatherUsingZip() {
 weather.getWeatherUsingZip()
  .then(results => {
   ui.paint(results);
  })
  .catch(err => {
   console.log(err);
   localStorage.clear('zip');
  });
}

function initSW() {
 if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker
    .register('./sw_cached_site.js')
    .then(reg => { /*Service Worker: Registered*/ })
    .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
 }
}
