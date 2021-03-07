

const CLEFAPI ='178a15ea0762e311be35006b076f59d7';
let resultatsAPI;
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempH = document.querySelectorAll(".heure-valeur-prevision");
const jour = document.querySelectorAll(".jour-nom-prevision");
const jourtemp = document.querySelectorAll(".jour-valeur-prevision");
const images = document.querySelector(".logo-meteo");


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position =>{

    //  console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      AppelAPI(long,lat);

  }, () =>{
    alert("Vous avez refusé la geolocalisation, Vuillez l'activer!");
  } );
}


function AppelAPI(long, lat) {

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`).then((reponse) => {
      return reponse.json();
    }).then((data) => {
      console.log(data);
      resultatsAPI=data;
      temps.innerText = resultatsAPI.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
     // localisation.innerText = resultatsAPI.timezone;
      // les , par tranche de 3 avc // TEMP
      let heureActu = new Date().getHours();
      for (var i = 0; i < heure.length; i++) {
          let heureInc = heureActu + i * 3 ;
          if (heureInc > 24 ) {
              heure[i].innerText= `${heureInc - 24} h`;
          }else if (heureInc === 24) {
            heure[i].innerText=  "00 h";
          }else {
              heure[i].innerText= `${heureInc} h`;
          }

      }
      for (var i = 0; i < tempH.length; i++) {
        tempH[i].innerText= `${Math.trunc(resultatsAPI.hourly[i*3].temp)}°`;
      }
      for (var i = 0; i < tabjour.length; i++) {
        jour[i].innerText=tabjour[i].slice(0,3);
      }
      for (var i = 0; i < 7; i++) {
        jourtemp[i].innerText= `${Math.trunc(resultatsAPI.daily[i+1].temp.day)}°`;
      }
      if (heureActu >= 6 && heureActu < 21) {
        image.src=`images/jour/${resultatsAPI.current.weather[0].icon}.svg`;
      }else {
        image.src=`images/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
      }


    })
}

//Gestion de jours de semaine
const jourSem = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

let ajrd = new Date();
let options = {weekday: 'long'};
let jourActu = ajrd.toLocaleDateString('fr-FR' , options);
//console.log(jourActu,ajrd);
jourActu = jourActu.charAt(0).toUpperCase() + jourActu.slice(1);
let tabjour = jourSem.slice(jourSem.indexOf(jourActu)).concat(jourSem.slice(0,jourSem.indexOf(jourActu)));
//console.log(tabjour);
