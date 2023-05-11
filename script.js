const tempVille = document.querySelector("#temperature_label");
const ville = document.querySelector("#ville");
const btnChangerVille = document.querySelector("#changer");
const inputText = document.querySelector(".input-text");

let Api_key = ``;
let city = "Paris";
// const lat = 48.8534; // paris
// const lon = 2.3488; // paris
// const units = ``;
let reponse;
let temps;
let iconWeather = document.getElementById("myImage");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;

envoyerRequete(url);

// mettre le focus sur l'input dès le chargement de la page
inputText.focus();

// recuperer le text de l'input
const cityInput = (e) => {
  // Trim pour supprimer les espaces avant et après la valeur de l'input
  let ValeurInput = inputText.value.trim();
  console.log("valeur input =>", ValeurInput);
  console.log("valeur input =>", ValeurInput);
  console.log(e.key);
  // Vérifier si la touche appuyée est "Enter" et si la valeur de l'input n'est pas vide
  city = ValeurInput;
  if (e.key === "Enter" && ValeurInput !== "") {
    city = ValeurInput;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;
    envoyerRequete(url);
    inputText.value = "";
  }
};
inputText.addEventListener("keydown", cityInput);

function envoyerRequete(url) {
  let requete = new XMLHttpRequest();
  requete.open("GET", url);

  requete.responseType = "json";

  requete.send();
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        reponse = requete.response;
        temps = reponse.main.temp;
        city = reponse.name;
        ville.textContent = city;
        tempVille.textContent = temps;
        //   console.log("1- temp", temps);
        //   console.log("1- city", reponse.name);
        iconWeather.src = `http://openweathermap.org/img/w/${reponse.weather[0].icon}.png`;
      }
    } else {
      alert("Un problème est intervenu, merci de revenir plus tard.");
    }
  };
}

const recevoirTemperature = () => {
  city = inputText.value.trim();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`;
  envoyerRequete(url);
  inputText.value = "";
};

btnChangerVille.addEventListener("click", recevoirTemperature);
