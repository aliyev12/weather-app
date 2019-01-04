class UI {
 constructor() {
  this.elements = {
   location: document.getElementById('w-location'),
   desc: document.getElementById('w-desc'),
   string: document.getElementById('w-string'),
   details: document.getElementById('w-details'),
   icon: document.getElementById('w-icon'),
   humidity: document.getElementById('w-humidity'),
   feelsLike: document.getElementById('w-feels-like'),
   dewpoint: document.getElementById('w-dewpoint'),
   wind: document.getElementById('w-wind')
  };
 }

 paint(weather) {
  this.elements.location.textContent = `${weather.name}, ${weather.sys.country}`;
  this.elements.desc.textContent = weather.weather[0].description;
  this.elements.string.textContent = `${Math.round((weather.main.temp) * 10) / 10} °F`;
  this.elements.icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
  this.elements.humidity.textContent = `Relative Humidity: ${weather.main.humidity} %`;
  this.elements.feelsLike.textContent = `Feels Like: ${this.calcWindChill(weather.main.temp, weather.wind.speed)} °F`;
  this.elements.dewpoint.textContent = `Dew Point: ${this.calcDewPoint(weather.main.temp, weather.main.humidity)} °F`;
  this.elements.wind.textContent = `Wind: From the ${this.calcWindDirection(weather.wind.deg)} (${weather.wind.deg}°) at ${weather.wind.speed} mph`;
 }

 // Calculate feels like temperature
 calcWindChill(t, ws) {
  return Math.round((35.74 + (0.6215 * t) - (35.75 * Math.pow(ws, 0.16)) + (0.4275 * t * Math.pow(ws, 0.16))) * 10) / 10;
 }

 // Calculate dew point
 calcDewPoint(t, h) {
  const tc = (t - 32) * 5/9;
  const dewPoint = ((Math.pow((h/100), (1/8)) * (112+0.9*tc)) + 0.1*tc - 112);
  return Math.round((dewPoint * 9/5) + 32);
 }

 // Calculate wind direction
 calcWindDirection(w) {
  switch (true) {
   case (w === 0 || w === 360):
    return 'N';
   case (w > 0 && w < 45):
    return 'NNE';
   case (w === 45):
    return 'NE';
   case (w > 45 && w < 90):
    return 'ENE';
   case (w === 90):
    return 'E';
   case (w > 90 && w < 135):
    return 'ESE';
   case (w === 135):
    return 'SE';
   case (w > 135 && w < 180):
    return 'SSE';
   case (w === 180):
    return 'S';
   case (w > 180 && w < 225):
    return 'SSW';
   case (w === 225):
    return 'SW';
   case (w > 225 && w < 270):
    return 'WSW';
   case (w === 270):
    return 'W';
   case (w > 270 && w < 315):
    return 'WNW';
   case (w === 315):
    return 'NW';
   case (w > 315 && w < 360):
    return 'NNW';
  }
 }

}