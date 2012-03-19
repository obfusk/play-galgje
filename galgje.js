//  --

var max_guess = 11;

var word      = null;                                         //  !!!!
var letters   = null;                                         //  !!!!
var guessed   = null;                                         //  !!!!
var n_guess   = null;                                         //  !!!!

//  --

function set_gallows (n) {
  $('#gallows').attr ('src', 'img/' + n + '.svg');            //  !!!!
}

function set_word     (s) { $('#word'   ).html (s); }         //  !!!!
function set_guessed  (s) { $('#guessed').html (s); }         //  !!!!
function set_info     (s) { $('#info'   ).html (s); }         //  !!!!

//  --

function init () {
  word    = "konijn";             // TODO                     //  !!!!
  letters = [];                                               //  !!!!
  guessed = {};                                               //  !!!!
  n_guess = 0;                                                //  !!!!

  for (var i in word) {
    letters[i] = '*';                                         //  !!!!
  }

  set_gallows (0);                                            //  !!!!
  set_word    (letters.join (' '));                           //  !!!!

  set_guessed (' ');                                          //  !!!!
  set_info    ('(druk op een letter om hem te raden)');       //  !!!!
}

//  --

function guess_letter (c) {
  if (guessed[c]) {
    set_info (c + ' al geraden');                             //  !!!!
  }
  else {
    console.log ('chr:', c);      // TODO
  }
}

//  --

function new_click (e) {
  location.reload ();                                         //  !!!!
}

function body_keypress (e) {
  var k = e.keyCode;

  if (!   (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
      &&  (97 <= k && k <= 122) )   // a-z
  {
    guess_letter (String.fromCharCode (k));                   //  !!!!
  }
}

//  --

function on_ready () {
  $('#opnieuw').click     (new_click    );                    //  !!!!
  $('body'    ).keypress  (body_keypress);                    //  !!!!

  init ();                                                    //  !!!!
}

//  --

$(document).ready (on_ready);                                 //  !!!!

//  --
