// here we created a object & inside that we have two functions
//  1: fetchWeather  2: displayWeather 3: Search Function

let weather = {
  apiKey: "67b92f0af5416edbfe58458f502b0a31",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
        console.log(data);
      });

    //         .then((data)=>{
    // console.log(data);
    //         })
  },

  displayWeather: function (data) {
    // const name = data.name;

    // here we use destructuring assignment
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;

    // https://openweathermap.org/img/wn/04n.png   check the icon here

    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },



  search: function () {
    // here we passes the value of whatever city we write in serach bar 
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// then by pressing Search button we call our function search() inside of weather object
// using dot -> waether.search(); 

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// below code works while we just enter the city & directly press the key 'enter' from 
// keyboared

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Udaipur");
