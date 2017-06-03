//Variables
var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var $caps = $('#keyboard-upper-container');
var $lower = $('#keyboard-lower-container');
var gameOver = false;
var ascii = 0;
var counter = 0;
var line = 0;
var startTimer;
var endTimer;
var error = 0;

function getWPM(){                                      //Calculate the total words per minute at the end of test
    var timer = endTimer - startTimer;
    var min = Math.floor(timer/60000);
    var sec = Math.floor((timer%60000)/1000);
    var time = min + sec/60;
    return Math.floor((48 - error)/time);
}

function checkLetter(){                                             //Check to see if the key pressed matches the current letter
    var getLetter = sentences[line].charCodeAt(counter);
    if(getLetter === ascii && counter < sentences[line].length){
        $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
    }else{
        $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
        error++;
    }
    $('#cursor').animate({'left': '+=17.4px'},100);
}

$(document).keypress(function(e){
    ascii = e.which;
    $('#'+ ascii).addClass('keypress');

    if(!gameOver){
        if(counter === 0 && line === 0){
            startTimer = e.timeStamp;
        }else if (line === 4 && counter === sentences[line].length - 1){
            endTimer = e.timeStamp;
        }
        
        checkLetter();

        if (counter + 1 < sentences[line].length){
            counter++;
        }else if(counter + 1 >= sentences[line].length && line < 4){
            line++;
            init(false);
        }else {
            $('.key').removeClass('keypress');
            var again = confirm('You typed '+ getWPM() + ' wpm.  Would you like to try again?');
            if (again) {
                init(true);
            } else {
                gameOver = true;
            }
        }
    }
})
$(document).keydown(function(e){
    if(e.which === 16){                                         //if shift key pressed show Uppercase keyboard
        $caps.toggle();
        $lower.toggle();
    }
}).keyup(function(e){                                           //if shift key released show lowercase keyboard
    if(e.which === 16){
        $caps.toggle();
        $lower.toggle();
    }
    $('.key').removeClass('keypress');
})

function init(restart){
    $caps.hide();
    $lower.show();
    if (restart){
        line = 0;
        error= 0;
        endTimer = 0;
        startTimer = 0;
        gameOver = false;
    }
    counter = 0;
    $('#sentence').text(sentences[line]);                       //go to new word
    $('#feedback').empty();                                     //Clear out check marks
    $('#cursor').animate({'left': '12px'});               //Return cursor to start
}

$(document).ready(function(){
    init();                                                     //Reset all variables and original state
})