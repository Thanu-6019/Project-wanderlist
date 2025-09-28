const UNSPLASH_ACCESS_KEY = "U-EfWzxG0jqLuVq2Y-JHtx2gDQsP3-6erIO4A0IA4cE";
const OPENWEATHER_API_KEY = "U-EfWzxG0jqLuVq2Y-JHtx2gDQsP3-6erIO4A0IA4cE";

// Unsplash API fetch
async function fetchUnsplashImages(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}&per_page=8`
  );
  const data = await res.json();
  return data.results || [];
}

// OpenWeatherMap API fetch with geocoding
async function fetchWeather(query, units = "metric") {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${OPENWEATHER_API_KEY}`
  );
  const geoData = await geoRes.json();
  if (geoData.length === 0) return null;
  const { lat, lon } = geoData[0];

  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${OPENWEATHER_API_KEY}&units=${units}`
  );
  const weatherData = await weatherRes.json();
  return { ...weatherData.current, lat, lon, name: query };
}

// DOM setup
const queryInput = document.getElementById("query");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const gallery = document.getElementById("gallery");
const resultsInfo = document.getElementById("resultsInfo");
const more = document.getElementById("more");
const selectedName = document.getElementById("selectedName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const unitsSelect = document.getElementById("units");

let selectedDestination = "";
const popularPlaces = ["Paris", "Tokyo", "Goa", "Sydney", "London", "Rome", "Bali", "New York", "Dubai", "Santorini"];

async function showImages(query) {
  gallery.innerHTML = `Loading images of ${query}...`;
  const images = await fetchUnsplashImages(query);
  if (!images.length) {
    gallery.innerHTML = `<div>No images found for ${query}.</div>`;
    return;
  }
  gallery.innerHTML = images
    .map(
      img => `<img src="${img.urls.small}" alt="${img.alt_description || query}" title="Click to set as destination" class="gallery-img" style="width:160px;height:120px;border-radius:8px;margin:10px;cursor:pointer;" />`
    ).join("");
  resultsInfo.textContent = `${images.length} photo${images.length > 1 ? "s" : ""} found`;
  Array.from(document.getElementsByClassName("gallery-img")).forEach(imgEl => {
    imgEl.onclick = () => {
      selectedDestination = imgEl.alt || query;
      selectedName.textContent = selectedDestination;
      loadWeather(selectedDestination, unitsSelect.value);
    };
  });
}

async function loadWeather(query, units = "metric") {
  temp.textContent = "Loading...";
  desc.textContent = "";
  humidity.textContent = "";
  const weather = await fetchWeather(query, units);
  if (!weather) {
    temp.textContent = "—";
    desc.textContent = "Weather not found";
    humidity.textContent = "—";
    return;
  }
  temp.textContent = `${Math.round(weather.temp)}°${units === "metric" ? "C" : "F"}`;
  desc.textContent = weather.weather[0].description;
  humidity.textContent = `${weather.humidity}%`;
}

// Button Handlers
searchBtn.onclick = () => {
  const query = queryInput.value.trim();
  if (query) {
    selectedDestination = query;
    selectedName.textContent = selectedDestination;
    showImages(query);
    loadWeather(query, unitsSelect.value);
  }
};

randomBtn.onclick = () => {
  const randomPlace = popularPlaces[Math.floor(Math.random() * popularPlaces.length)];
  queryInput.value = randomPlace;
  searchBtn.click();
};

getWeatherBtn.onclick = () => {
  if (selectedDestination)
    loadWeather(selectedDestination, unitsSelect.value);
};

window.onload = () => {
  queryInput.value = "Goa";
  searchBtn.click();
};

