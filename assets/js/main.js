/* global $, inView, Vivus */
$(document).ready(function() {
  var bookLinesPath = '/assets/images/icons/book-lines.svg';
  var doneAnimatingClass = '--done-animating';
  var isAnimatingClass = '--is-animating';

  inView('.meeting__book-icon').
    on('enter', function(el) {
      if (el.classList.contains(doneAnimatingClass) ||
          el.classList.contains(isAnimatingClass)) {
            return;
      } else {
        el.classList.add(isAnimatingClass);
      }
      var anim = new Vivus(el, { file: bookLinesPath}, function _doneAnimating() {
        el.classList.remove(isAnimatingClass);
        el.classList.add(doneAnimatingClass);
      });
    }).
    on('exit', function(el) {
      // console.log('exited', el);
    });
});
