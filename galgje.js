//  --

var guessed_text  = '(nog geen letters geraden)';
var info_text     = '(druk op een letter om hem te raden)';

var already_text  = ' al geraden';

var lost_text     = 'je hebt verloren';
var won_text      = 'je hebt gewonnen !!!';

//  --

var max_bad       = 11;

//  --

var word          = null;
var letters       = null;
var guessed       = null;
var n_bad         = null;
var n_good        = null;

//  --

function set_gallows (n) {
  $('#gallows').attr ('src', 'img/' + n + '.svg');
}

function set_word (xs) {
  $('#word').html (xs.join (' '));
}

function set_guessed  (s) { $('#guessed').html (s); }
function set_info     (s) { $('#info'   ).html (s); }

//  --

function init () {                                            //  {{{1
  word    = "konijn";                                         //  TODO

  letters = [];
  guessed = {};
  n_bad   = 0;
  n_good  = 0;

  for (var i in word) {
    letters[i] = '*';
  }

  set_gallows (0);
  set_word    (letters);
  set_guessed (guessed_text);
  set_info    (info_text);
}                                                             //  }}}1

//  --

function add_letter (c) {                                     //  {{{1
  var n = 0;

  for (var i in word) {
    if (word[i] == c) {
      letters[i] = c;
      ++n;
    }
  }

  return n;
}                                                             //  }}}1

function good_letter (n) {                                    //  {{{1
  n_good += n;
  set_word (letters);

  if (n_good == word.length) {
    $('body').addClass ('won');
    set_info (won_text);

    return true;
  }
  else {
    return false;
  }
}                                                             //  }}}1

function bad_letter () {                                      //  {{{1
  ++n_bad;
  set_gallows (n_bad);

  if (n_bad == max_bad) {
    $('body').addClass ('lost');
    set_info (lost_text);

    return true;
  }
  else {
    return false;
  }
}                                                             //  }}}1

function guess_letter (c) {                                   //  {{{1
  if (n_bad < max_bad && n_good < word.length) {
    if (guessed[c]) {
      set_info (c + already_text);
    }
    else {
      guessed[c]  = true;
      var n       = add_letter (c);
      var done    = n ? good_letter (n) : bad_letter ();

      if (! done) {
        set_info (info_text);
      }

      set_guessed (Object.keys (guessed).join (' '));
    }
  }
}                                                             //  }}}1

//  --

function new_click (e) { location.reload (); }

function body_keypress (e) {                                  //  {{{1
  var k = e.keyCode;

  if (!   (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
      &&  (97 <= k && k <= 122) )   // a-z
  {
    guess_letter (String.fromCharCode (k));
  }
}                                                             //  }}}1

//  --

function on_ready () {                                        //  {{{1
  init ();

  $('#new').click     (new_click);
  $('body').keypress  (body_keypress);
}                                                             //  }}}1

//  --

$(document).ready (on_ready);

//  --
