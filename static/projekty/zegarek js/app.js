const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector('.hour-hand');


function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    
    const mins = now.getMinutes();
//    console.log(min);
    const minsDegrees = ((mins / 60) * 360) +90;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;   
    
    const hour = now.getHours();
//    console.log(min);
    const hourDegrees = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
//    console.log(hourDegrees);
    
//    A to jest moje zjebane gówno, które nie działa a miało naprawić ten tik, który jest zjebany
//if (secondsDegrees == 90 || minsDegrees == 90 || hourDegrees == 90) {
//        const div = document.querySelector('.hand');
//        div.el.style.transition = 'none';
//    };
    
    
    // a to poniżej to rozwiązanie jakiegoś zjeba z YT i działa ;(
const hand = document.querySelectorAll(`.hand`);

if(seconds == 58){
   setTimeout(() => {
   hand.forEach(el => el.style.transition = `none`)
   },2000)
}
 hand.forEach( (el) => el.style.transition = ``);
}

setInterval(setDate, 1000);

