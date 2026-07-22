const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");
const tempEl = document.getElementById("temp");
const typeEl = document.getElementById("type");
const imgEl = document.getElementById("img");

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

    // Replace with your OpenWeatherMap API Key
    // Replace with your OpenWeatherMap API Key
    const apiKey = "b41eb79fff3d35d9e07a3381325af6b3";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;



    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== 200) {
                console.log(data) // <-- fixed here
                throw new Error(data.message);

            }

            // Update UI
            cityEl.textContent = data.name;
            countryEl.textContent = data.sys.country;
            tempEl.textContent = Math.round(data.main.temp) + "°C";
            typeEl.textContent = data.weather[0].main;

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
});