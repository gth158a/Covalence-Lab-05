

var gameOver = false;
var $caps = $('#keyboard-upper-container');
var $lower = $('#keyboard-lower-container');
$caps.hide();
$lower.show();
var ascii = 0;
var counter = 0;
var line = 0;
var startTimer;
var endTimer;
var error = 0;

var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
function changeWord(){
    $('#sentence').text(sentences[line]);
}
changeWord();
function getLetter(){
    return sentences[line].charCodeAt(counter);
}

function getWPM(){
    //number of words/ minutes - 2 * mistakes
    var timer = endTimer - startTimer;
    return 54/(timer-2) * (54-error);
}

$(document).keypress(function(e){
    ascii = e.which;
    if(counter === 0 && line === 0){
        startTimer = e.timeStamp;
        console.log(startTimer);
    }else if (line === 4){
        endTimer = e.timeStamp;
    }
    $('#'+ ascii).addClass('keypress');
    if (!gameOver){
    $('#yellow-block').animate({'left': '+=17.4px'},100);
        if(getLetter() === ascii && counter < sentences[line].length){
            $('#feedback').append('<i class="glyphicon glyphicon-ok"></i>');
        }else{
            $('#feedback').append('<i class="glyphicon glyphicon-remove"></i>');
            error++;
        }
    }
    if (counter + 1 < sentences[line].length){
        counter++;
    }else if(counter + 1 >= sentences[line].length && line < 4){
        counter = 0;
        line++;
        console.log('line: ' + line);
        changeWord();
        $('#feedback').empty();
        $('#yellow-block').animate({'left': '12px'});
    }else {//Something is wrong here
        var wpm = getWPM();
        var again = confirm('You typed '+ wpm + ' wpm.  Would you like to try again?');
        if (again) {
            counter = 0;
            line = 0;
            error= 0;
            changeWord();
            $('#feedback').empty();
            $('#yellow-block').animate({'left': '12px'});
        } else {
            gameOver = true;
        }
    }
})
$(document).keydown(function(e){
    if(e.which === 16){
        $caps.toggle();
        $lower.toggle();
    }
}).keyup(function(e){
    if(e.which === 16){
        $caps.toggle();
        $lower.toggle();
    }
    $('.key').removeClass('keypress');
})