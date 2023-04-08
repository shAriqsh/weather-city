const apiDetails = {
  url: "https://api.openweathermap.org/data/2.5/",
  api_key: "60bbd59ec7556e88c0f6b5a2080aebaa",
};

const input = document.querySelector("input");
input.addEventListener("keypress", showData);
let locationCity = document.querySelector(".location-city");
let date = document.querySelector(".location-date");
let tempp = document.querySelector(".temperature-temp");
let type = document.querySelector(".temperature-type");
let lowHigh = document.querySelector(".temperature-range");
let hum = document.querySelector(".humidity");

function showData(e) {
  if (e.keyCode === 13) {
    console.log(input.value);
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
    `${apiDetails.url}weather?q=${value}&units=metric&APPID=${apiDetails.api_key}`
  );

  const fdata = await data.json();
  if (fdata.message === "city not found") {
    infoBox.style.display = "flex";
    infoBox.style.flexDirection = "column";
    infoBox.style.justifyContent = "center";
    infoBox.style.alignItems = "center";
    infoBox.innerHTML = `CITY NOT FOUND`;
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
  console.log(data);

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
