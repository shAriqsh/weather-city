const apiDetails = {
  url: "https://api.openweathermap.org/data/2.5/",
  api_key: "60bbd59ec7556e88c0f6b5a2080aebaa",
};

const input = document.querySelector("input");
input.addEventListener("keypress", showData);

function showData(e) {
  if (e.keyCode === 13) {
    showResults(input.value);
  }
}

async function showResults(value) {
  const infoBox = document.querySelector(".box");
  if (!value) {
    infoBox.style.display = "none";
    return;
  }
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&APPID=60bbd59ec7556e88c0f6b5a2080aebaa`
  );

  const fdata = await data.json();
  if (fdata.cod === "404") {
    infoBox.innerText = `CITY NOT FOUND`;
  } else {
    infoBox.style.display = "flex";
    infoBox.style.flexDirection = "column";
    infoBox.style.justifyContent = "center";
    infoBox.style.alignItems = "center";
    displayData(fdata);
  }
}
function cls() {
  document.querySelector("input").value = "";
  document.querySelector(".input").style.backgroundColor = "white";
  document.querySelector(".box").style.display = "none";
  return;
}

function displayData(data) {
  const locationCity = document.querySelector(".location-city");
  const date = document.querySelector(".location-date");
  const tempp = document.querySelector(".temperature-temp");
  const type = document.querySelector(".temperature-type");
  const lowHigh = document.querySelector(".temperature-range");
  const hum = document.querySelector(".humidity");

  let time = new Date();

  let day = time.toLocaleDateString("en-IN", { weekday: "long" });
  let pdate = time.getDate();
  let month = time.toLocaleString("en-IN", { month: "long" });
  let year = time.getFullYear();

  locationCity.innerText = `${data.name} (${data.sys.country})`;

  date.innerText = `${day} ${pdate} ${month} ${year}`;

  tempp.innerHTML = `${Math.round(data.main.temp)}
			<span>&#730C</span>
		`;

  type.innerText = `${data.weather[0].main}`;

  lowHigh.innerHTML = `${Math.round(
    data.main.temp_min
  )}<span>&#730C</span>/${Math.round(data.main.temp_max)}<span>&#730C</span>`;
  hum.innerHTML = `Humidity: ${data.main.humidity}%`;
}
