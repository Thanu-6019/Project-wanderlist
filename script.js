const UNSPLASH_ACCESS_KEY = "U-EfWzxG0jqLuVq2Y-JHtx2gDQsP3-6erIO4A0IA4cE";
const OWM_API_KEY = "REPLACE_WITH_YOUR_OWN_OPENWEATHERMAP_KEY";

// Elements
const gallery = document.getElementById("gallery");
const resultsInfo = document.getElementById("resultsInfo");
const queryInput = document.getElementById("query");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const selectedName = document.getElementById("selectedName");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const humidityEl = document.getElementById("humidity");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const unitsSel = document.getElementById("units");

async function searchPhotos(query) {
  if (!query) return;
  gallery.innerHTML = "";
  resultsInfo.textContent = `Searching photos for "${query}"...`;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=18`,
      { headers: { Authorization: "Client-ID " + UNSPLASH_ACCESS_KEY } }
    );
    const data = await res.json();
    const results = data.results;

    if (!results.length) {
      resultsInfo.textContent = `No photos found for "${query}".`;
      return;
    }

    resultsInfo.textContent = `Showing ${results.length} photos for "${query}".`;
    results.forEach((r) => {
      const div = document.createElement("div");
      div.className = "photo";
      div.innerHTML = `
        <img src="${r.urls.small}" alt="${r.alt_description || query}">
        <div class="meta">${r.user.name}</div>`;
      div.onclick = () => setSelected(r.alt_description || query);
      gallery.appendChild(div);
    });
  } catch (err) {
    resultsInfo.textContent = "Failed to fetch images.";
  }
}

async function fetchWeather(place, unit = "metric") {
  if (!OWM_API_KEY || OWM_API_KEY.includes("YOUR")) {
    alert("Please add your OpenWeatherMap API key in script.js");
    return;
  }

  tempEl.textContent = "Loading...";

  try {
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(place)}&limit=1&appid=${OWM_API_KEY}`
    );
    const geo = await geoRes.json();
    if (!geo.length) throw new Error("City not found");

    const { lat, lon, name, country } = geo[0];
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${OWM_API_KEY}`
    );
    const w = await res.json();

    const temp = Math.round(w.main.temp);
    const desc = w.weather[0].description;

    tempEl.textContent = `${temp}° ${unit === "metric" ? "C" : "F"}`;
    descEl.textContent = `${desc} · ${name}, ${country}`;
    humidityEl.textContent = `${w.main.humidity}%`;
  } catch (err) {
    tempEl.textContent = "—";
    descEl.textContent = "Weather unavailable";
    humidityEl.textContent = "—";
  }
}

function setSelected(place) {
  selectedName.textContent = place;
  fetchWeather(place, unitsSel.value);
}

searchBtn.onclick = () => searchPhotos(queryInput.value.trim());
randomBtn.onclick = () => {
  const samples = ["Paris", "Tokyo", "Goa", "Bali", "Sydney", "Iceland"];
  const pick = samples[Math.floor(Math.random() * samples.length)];
  queryInput.value = pick;
  searchPhotos(pick);
};
getWeatherBtn.onclick = () => {
  const place = selectedName.textContent || queryInput.value.trim();
  if (!place || place === "—") return alert("Select a place first");
  fetchWeather(place, unitsSel.value);
};
