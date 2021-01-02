/* 
1) początek gry: score 0:0
2) gracz wybiera kamień / papier / nożyce & komputer losuje wartość ( 1- kamień , 2- papier, 3- nożyce);
    
    
3) porównanie wyników:
    a) jezeli gracz=kamień i komputer = kamień
              gracz=papier i komputer - papier
              gracz-nożyce i komputer=nożyce
    - wynik: score bez zmian
    - pokaż ukryty content i zmien napis: "Wybrałeś 'warosc', Komputer wybrał 'wartosc'. Nierozstrzygnięte"
    
    b) jezeli gracz= kamień i komputer=nożyce
              gracz=papier  i komputer=kamień
              gracz=nożyce i komputer =papier
    - wynik: score gracza +1
    - pokaz ukryty content i zmien napis:"Wybrałeś 'warosc', Komputer wybrał 'wartosc'. Wygrywasz!"
    
    c) jezeli gracz=kamień i komputer=papier
              gracz=papier i komputer=nożyce
              gracz=nożyce i komputer=kamień
    - wynik: score komputera +1
    - pokaz ukryty content i zmien napis:"Wybrałeś 'warosc', Komputer wybrał 'wartosc'. Niestety przegrywasz!"

      
  */
const userScore_span = document.getElementById("user_score");
const compScore_span = document.getElementById("comp_score");
const text = document.getElementById("text_p");
const regExr=/(papier)?(nożyce)?(kamień)?/g;
let playerScore = 0;
let compScore = 0;


// FUNKCJE


function game(id) {
    let pmove = id.match(regExr)[7];
 //   console.log(pmove);
    let cmove = computerChoice();
  //  console.log(`Gracz wybrał: ${pmove} / a komputer: ${cmove}`);
    let whoIsWinning = check(pmove,cmove);
 //   console.log(whoIsWinning);
 
        if(whoIsWinning==="remis") remis(pmove,cmove);
        if(whoIsWinning==="pwin") player_win(pmove,cmove);
        if(whoIsWinning==="plose") player_lose(pmove,cmove);
    }

            // zwraca wybór komputera
function computerChoice() {
    let number = Math.floor(Math.random()*3)+1;
    console.log(number);
    if (number == 1){
        return "papier";
    } if (number == 2){
        return "kamień";
    } else {
        return "nożyce";
    }
};


function player_win(pmove, cmove) {
    playerScore++;
    userScore_span.innerHTML = playerScore;
    text.innerHTML = `Wybrałeś <span>${pmove}</span>. Komputer wybrał <span>${cmove}</span>. Wygrałeś! :)`;
}

function player_lose(pmove, cmove) {
    compScore++;
    compScore_span.innerHTML = compScore;
    text.innerHTML = `Wybrałeś <span>${pmove}</span>. Komputer wybrał <span>${cmove}</span>. Niestety przegrywasz :(`;    
}

function remis(pmove, cmove){
    text.innerHTML =`Wybrałeś <span>${pmove}</span>. Komputer też wybrał <span>${cmove}</span>. Jest remis`;
}

            // porownanie wynikow
function check(pmove,cmove) {
    switch(pmove + cmove) {
        case "kamieńkamień":
        case "papierpapier":
        case "nożycenożyce":
            return "remis";
        case  "kamieńnożyce":
        case  "papierkamień":
        case  "nożycepapier":
           return "pwin";
         case  "kamieńpapier":
         case  "papiernożyce":
         case  "nożycekamień":
            return "plose";
    }
}








    
    



