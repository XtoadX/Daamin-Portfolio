
let score = 0;
let mijnNaam;
const mijnTexst = document.getElementById('mijnScore')
const music = new Audio('./inhoud/GG.mp3');

function get() {
    mijnNaam = document.getElementById('myName').value
    console.log(mijnNaam)
}

function delay(URL) {
    setTimeout(function () { window.location = URL }, 500);
}

// function antwoord (){
//     document.getElementById("kleur").style.backgroundColor ="green"
//      score ++
//      console.log(score)
//     }
//     function antwoord (){
//      document.getElementById("kleur").style.backgroundColor ="red"
//     }
//     function antwoord (){
//      document.getElementById("kleur").style.backgroundColor ="red"
//     }
//     function antwoord (){
//      document.getElementById("kleur").style.backgroundColor ="red"
//     }



////////////////// Vraag 1
function antwoord1() {
    document.getElementById("kleur").style.backgroundColor = "red"
}
function antwoord2() {
    document.getElementById("kleur").style.backgroundColor = "green"
    score++
    console.log(score)
}
function antwoord3() {
    document.getElementById("kleur").style.backgroundColor = "red"
}
function antwoord4() {
    document.getElementById("kleur").style.backgroundColor = "red"
}
///////////////////// Vraag 2
function antwoord5() {
    document.getElementById("kleur2").style.backgroundColor = "red"
}
function antwoord6() {
    document.getElementById("kleur2").style.backgroundColor = "red"
}
function antwoord7() {
    document.getElementById("kleur2").style.backgroundColor = "red"
}
function antwoord8() {
    document.getElementById("kleur2").style.backgroundColor = "green"
    score++
    console.log(score)
}
////////////////////// Vraag 3
function antwoord9() {
    document.getElementById("kleur3").style.backgroundColor = "red"
}
function antwoord10() {
    document.getElementById("kleur3").style.backgroundColor = "red"
}
function antwoord11() {
    document.getElementById("kleur3").style.backgroundColor = "red"
}
function antwoord12() {
    document.getElementById("kleur3").style.backgroundColor = "green"
    score++
    console.log(score)
}
////////////////////// Vraag 4
function antwoord13() {
    document.getElementById("kleur4").style.backgroundColor = "green"
    score++
    console.log(score)
}
function antwoord14() {
    document.getElementById("kleur4").style.backgroundColor = "red"
}
function antwoord15() {
    document.getElementById("kleur4").style.backgroundColor = "red"
}
function antwoord16() {
    document.getElementById("kleur4").style.backgroundColor = "red"
}
///////////////////// Vraag 5
function antwoord17() {
    document.getElementById("kleur5").style.backgroundColor = "red"
}
function antwoord18() {
    document.getElementById("kleur5").style.backgroundColor = "red"
}
function antwoord19() {
    document.getElementById("kleur5").style.backgroundColor = "green"
    score++
    console.log(score)
}
function antwoord20() {
    document.getElementById("kleur5").style.backgroundColor = "red"
}
//////////////////////// Vraag 6
function antwoord21() {
    document.getElementById("kleur6").style.backgroundColor = "green"
    score++
    console.log(score)
}
function antwoord22() {
    document.getElementById("kleur6").style.backgroundColor = "red"
}
function antwoord23() {
    document.getElementById("kleur6").style.backgroundColor = "red"
}
function antwoord24() {
    document.getElementById("kleur6").style.backgroundColor = "red"
}
////////////////////////// Vraag 7
function antwoord25() {
    document.getElementById("kleur7").style.backgroundColor = "red"
}
function antwoord26() {
    document.getElementById("kleur7").style.backgroundColor = "red"
}
function antwoord27() {
    document.getElementById("kleur7").style.backgroundColor = "green"
    score++
    console.log(score)
}
function antwoord28() {
    document.getElementById("kleur7").style.backgroundColor = "red"
}
////////////////////////// Vraag 8
function antwoord29() {
    document.getElementById("kleur8").style.backgroundColor = "green"
    score++
    console.log(score)
}
function antwoord30() {
    document.getElementById("kleur8").style.backgroundColor = "red"
}
function antwoord31() {
    document.getElementById("kleur8").style.backgroundColor = "red"
}
function antwoord32() {
    document.getElementById("kleur8").style.backgroundColor = "red"
}
////////////////////////// Vraag 9
function antwoord33() {
    document.getElementById("kleur9").style.backgroundColor = "red"
}
function antwoord34() {
    document.getElementById("kleur9").style.backgroundColor = "green"
    score++
    console.log(score)

}
function antwoord35() {
    document.getElementById("kleur9").style.backgroundColor = "red"
}
function antwoord36() {
    document.getElementById("kleur9").style.backgroundColor = "red"
}
////////////////////////// Vraag 10
function antwoord37() {
    document.getElementById("kleur10").style.backgroundColor = "red"
}
function antwoord38() {
    document.getElementById("kleur10").style.backgroundColor = "red"
}
function antwoord39() {
    document.getElementById("kleur10").style.backgroundColor = "red"
}
function antwoord40() {
    document.getElementById("kleur10").style.backgroundColor = "green"
    score++
    console.log(score)
}
////////////////////// Finish

function finish() {
    let ant11 = document.getElementById('vraag11').value;
    let ant12 = document.getElementById('vraag12').value;
    let ant13 = document.getElementById('vraag13').value;
    let ant14 = document.getElementById('vraag14').value;
    let ant15 = document.getElementById('vraag15').value;



    if (ant11 === ("2015") || ant11 === ("Tweeduizend vijftien")|| ant11 === ("Tweeduizend Vijftien")|| ant11 === ("tweeduizend vijftien")) {
        score++
        console.log(score);
        console.log(ant11);
    }
    if (ant12 === ("Snowdin") || ant12 === ("snowdin")) {
        score++
        console.log(score);
        console.log(ant12);
    }
    if (ant13 === ("Asriel") || ant13 === ("asriel")) {
        score++
        console.log(score);
        console.log(ant13);
    }
    if (ant14 === ("7") || ant14 === ("Zeven") || ant14 === ("zeven")) {
        score++
        console.log(score);
        console.log(ant14);
    }
    if (ant15 === ("Genocide") || ant15 === ("genocide") || ant15 === ("Neutral") || ant15 === ("neutral") || ant15 === ("Pacifist") || ant15 === ("pacifist")) {
        score++
        console.log(score);
        console.log(ant15);
    }

    if(score >=0 && score <=15){
    
    function myMessage() {
    mijnTexst.innerHTML += `<p>Goed Gedaan ${mijnNaam}</p>`
  }setTimeout(myMessage, 3000, );

  function myMessage2() {
    mijnTexst.innerHTML += '<p>Zullen We je Score Bekijken</p>'
  }setTimeout(myMessage2, 6500);

  function myMessage3() {
    mijnTexst.innerHTML += '<p>Jouw Score is...</p>'
  }setTimeout(myMessage3, 10000);

  function myMessage4() {
    for (let i = 0; i < score; i++) {
        mijnTexst.innerHTML += '<img src="./inhoud/soul.jpeg" class="score" alt="">' 
      }
  }setTimeout(myMessage4, 13000);

  function myMessage5() {
    mijnTexst.innerHTML +=  `<p>Goed Gedaan ${mijnNaam} Je hebt ${score} Van De 15 Goed</p>` 
  }setTimeout(myMessage5, 16000);

    }else if(score >=16){
    
    function myMessage6() {
    mijnTexst.innerHTML += `<p>Goed Gedaan ${mijnNaam}</p>`
  }setTimeout(myMessage6, 3000, );

  function myMessage7() {
    mijnTexst.innerHTML += '<p>Zullen We je Score Bekijken</p>'
  }setTimeout(myMessage7, 6500);

  function myMessage8() {
    mijnTexst.innerHTML += '<p>Jouw Score is...</p>'
  }setTimeout(myMessage8, 10000);

  function myMessage9() {
    for (let i = 0; i < score; i++) {
        mijnTexst.innerHTML += '<img src="./inhoud/soul.jpeg" class="score" alt="">' 
      }
  }setTimeout(myMessage9, 13000);

  function myMessage10() {
    mijnTexst.innerHTML +=  `<p>Goed Gedaan ${mijnNaam} Je hebt ${score} Van De 15 Goed</p>` 
  }setTimeout(myMessage10, 16000);


function myMessage11() {
    mijnTexst.innerHTML +=  `<p>HHHMM hoger dan 15 eh</p>` 
  }setTimeout(myMessage11, 18000);

  function myMessage12() {
    mijnTexst.innerHTML +=  `<p>JIJ HEBT BENT EEN CHEATER NOW YOU SHOULD PAY</p>` 
  }setTimeout(myMessage12, 20000);

  function myMessage13() {
    mijnTexst.innerHTML +=  `<p>WITH YOUR LIFE</p>` 
  }setTimeout(myMessage13, 21000);
  
  function myMessage14() {
    mijnTexst.innerHTML =  `<p><img src="./inhoud/gameover.gif" id="cheat" alt=""></p>`
    music.play();
    music.loop =true; 
  }setTimeout(myMessage14, 25000);

}   
 }   






