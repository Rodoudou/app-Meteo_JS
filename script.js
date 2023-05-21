const tempVille = document.querySelector("#temperature_label");
const ville = document.querySelector("#ville");
const btnChangerVille = document.querySelector("#changer");
const inputText = document.querySelector(".input-text");
const loader = document.getElementById("loader");
const content = document.querySelector(".content");

let Api_key = ``;
let city = "Paris";
let lat;
let lon;
// const units = ``;
let reponse;
let temps;
let iconWeather = document.getElementById("myImage");

inputText.focus();

let url;

const options = {
  enableHighAccuracy: true,
};
console.log("1", url);
// GEOLOCALISATION
//####################################################
//Cacher le "contenu" et mettre un "loader" en attendant de recevoir les données d'api
content.style.display = "none";
loader.classList.add("loader");
//#####################################################
if ("geolocation" in navigator) {
  console.log("2", url);
  navigator.geolocation.watchPosition(
    (position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api_key}&units=metric`;
      console.log("3", url);
      // loader
      //##############################################
      //Aprés reception des données afficher le "contenu" et enlever le "loader"
      content.style.display = "inline";
      loader.classList.remove("loader");
      //################################################

      function envoyerRequete(url) {
        "use strict";
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            temps = data.main.temp;
            city = data.name;
            ville.textContent = city;
            tempVille.textContent = temps;

            iconWeather.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          })
          .catch((err) => {
            console.error(err);
            alert("Un problème est intervenu, merci de revenir plus tard.");
          });
      }

      const cityInput = (e) => {
        "use strict";
        // Trim pour supprimer les espaces avant et après la valeur de l'input
        let ValeurInput = inputText.value.trim();

        // Vérifier si la touche appuyée est "Enter" et si la valeur de l'input n'est pas vide
        city = ValeurInput;
        if (e.key === "Enter" && ValeurInput !== "") {
          city = ValeurInput;
          url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;
          envoyerRequete(url);
          inputText.value = "";
        }
      };
      inputText.addEventListener("keydown", cityInput);

      const recevoirTemperature = () => {
        "use strict";
        city = inputText.value.trim();

        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;
        envoyerRequete(url);
        inputText.value = "";
      };

      btnChangerVille.addEventListener("click", recevoirTemperature);
      envoyerRequete(url);
    },
    erreur,
    options
  );
} else {
  recevoirTemperature(city);
}

function erreur() {
  recevoirTemperature(city);
}
