class Weather {
 constructor(zip) {
  this.zip = zip;
 }

 // Fetch weather by zip from API
 async getWeatherUsingZip() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.zip},us&units=imperial&APPID=${apiKey}`);
  const responseData = await response.json();
  return responseData;
 }

 // Change weather location using zip
 changeLocationUsingZip(zip) {
  this.zip = zip;
 }

}

