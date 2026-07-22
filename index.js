const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");
const tempEl = document.getElementById("temp");
const typeEl = document.getElementById("type");
const imgEl = document.getElementById("img");
const weatherIconEl = document.getElementById("weatherIcon");

// Background images for different weather conditions
const weatherBackgrounds = {
    Clear: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1200&auto=format&fit=crop",
    Clouds: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1200&auto=format&fit=crop",
    Rain: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1200&auto=format&fit=crop",
    Drizzle: "https://images.unsplash.com/photo-1556485689-33e55ab56127?q=80&w=1200&auto=format&fit=crop",
    Thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1200&auto=format&fit=crop",
    Snow: "https://images.unsplash.com/photo-1517299321544-4d185a676d7c?q=80&w=1200&auto=format&fit=crop",
    Mist: "https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1200&auto=format&fit=crop",
    Haze: "https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1200&auto=format&fit=crop",
    Fog: "https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1200&auto=format&fit=crop"
};

let currentBgUrl = weatherBackgrounds.Clear;

function updateBackground(weatherMain) {
    currentBgUrl = weatherBackgrounds[weatherMain] || weatherBackgrounds.Clear;
    applyBackground();
}

function applyBackground() {
    const isDark = document.body.classList.contains("dark");
    const overlay = isDark ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0.25)";
    document.body.style.backgroundImage = `linear-gradient(${overlay}, ${overlay}), url('${currentBgUrl}')`;
}

const listOfCountries = [{
    countryCode: "IN",
    image: "https://flagcdn.com/w320/in.png"
},
{
    countryCode: "US",
    image: "https://flagcdn.com/w320/us.png"
},
{
    countryCode: "GB",
    image: "https://flagcdn.com/w320/gb.png"
},
{
    countryCode: "DE",
    image: "https://flagcdn.com/w320/de.png"
},
{
    countryCode: "FR",
    image: "https://flagcdn.com/w320/fr.png"
}
];

function onSearch() {
    const searchInputEl = document.getElementById("searchInput");
    const cityName = searchInputEl.value.trim();

    if (cityName === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "b41eb79fff3d35d9e07a3381325af6b3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== 200) {
                console.log(data);
                throw new Error(data.message);
            }

            // Update UI
            cityEl.textContent = data.name;
            countryEl.textContent = data.sys.country;
            tempEl.textContent = Math.round(data.main.temp) + "°C";
            typeEl.textContent = data.weather[0].main;

            // Weather Icon
            if (weatherIconEl && data.weather[0].icon) {
                weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            }

            // Change background image based on weather condition (Rain, Drizzle/Sprinkles, Clear/Sunny, etc.)
            updateBackground(data.weather[0].main);

            // Country Flag
            const matchedCountry = listOfCountries.find(function (each) {
                return each.countryCode === data.sys.country;
            });

            if (matchedCountry) {
                imgEl.src = matchedCountry.image;
            } else {
                imgEl.src = "https://flagcdn.com/w320/un.png";
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Error: " + error.message);
        });
}

// Toggle theme logic
function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.getElementById("themeToggle");
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        themeToggleBtn.textContent = "☀️ Light";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggleBtn.textContent = "🌙 Dark";
        localStorage.setItem("theme", "light");
    }

    applyBackground();
}

// Restore saved theme on page load
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    const themeToggleBtn = document.getElementById("themeToggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        if (themeToggleBtn) {
            themeToggleBtn.textContent = "☀️ Light";
        }
    }

    applyBackground();
});