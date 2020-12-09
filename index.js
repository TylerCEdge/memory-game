// GLOBAL VARIABLES

var counter, pieces, hasPlayed, tracking, click;
// score tracking
counter = 0;
// idea is to use this array, sorted on each piece click, and loop the array attaching the index values as the order property value for each of the pieces.
pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// planning to use for local storage hiscore tracking
hasPlayed = false;

// array storage for clicks.  id's are pushed and each click triggers a check this.id against present array items.  If a match is found the player loses.
tracking = [];

// GAME FUNCTIONS

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// update score
function getScore() {
  $('.hero__score-number').empty().append(counter);
}

// recolor controller.  may add more to gradually transition as the score increases.
function recolorScore() {
  if (counter === 9) {
    $('.hero__score-number').css('color', '#39FF14');
    $('.modal').removeClass('hidden');
  } else if (counter < 9 && counter > 0) {
    $('.hero__score-number').css('color', 'gold');
  } else {
    $('.hero__score-number').css('color', 'white');
  }
}

// brains of the operation
function checkGameState() {
  if (counter < 9) {
    counter += 1;
    shuffle(pieces);
    getScore();
    recolorScore();
  } else {
    return;
  }
}

// INITIAL PAGE STATE

getScore();
shuffle(pieces);

// EVENT LISTENERS

// dont think this is actually doing anything right now
$('body').on('click', '.hero__btn', function () {
  location.reload();
});

$('body').on('click', '.piece', function () {
  checkGameState();
  click = Number(this.id);
  if (tracking.indexOf(click) == -1) {
    tracking.push(click);
  } else {
    $('.modal').removeClass('hidden');
    $('.modal__condition').css('color', '#ff1439');
    $('.modal__condition').empty().append('You Lose!');
  }

  $('.piece').each(function (i) {
    $(this).css('order', pieces[i]);
  });
});

$(document).ready(function () {
  console.log('ready!');
  shuffle(pieces);
  $('.piece').each(function (i) {
    $(this).css('order', pieces[i]);
  });
});
