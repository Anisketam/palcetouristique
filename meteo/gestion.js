const jourSem = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Dimanche'];

let ajrd = new Date();
let options = {weekday: 'long'};
let jourActu = ajrd.toLocaleDateString('fr-FR' , options);
//console.log(jourActu,ajrd);
jourActu = jourActu.charAt(0).toUpperCase() + jourActu.slice(1);
let tabjour = jourSem.slice(jourSem.indexOf(jourActu)).concat(jourSem.slice(0,jourSem.indexOf(jourActu)));
//console.log(tabjour);
export default tabjour;
