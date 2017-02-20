/* global $, inView, Vivus */
$(document).ready(function() {
  setupLineAnimations();
  setupStarClipPaths();
  setupFadeIns();
  setupOpacityIncreasers();
});

function setupOpacityIncreasers() {
  var selectors = {
    enter: '.--opacity-will-increase'
  };
  var cssClasses = {
    didEnter: '--opacity-did-increase'
  };
  var delay = 500;
  
  inView(selectors.enter).
    on('enter', function(el) {
      setTimeout(function() {
        $(el).addClass(cssClasses.didEnter);
      }, delay);
    });
}

function setupStarClipPaths() {
  var maxRating = 5;
  var selectors = {
    bookRating: '.book__rating',
    foreground: '.book__rating--foreground'
  };
  var dataProps = {
    rating: 'book-rating'
  };

  $(selectors.bookRating).each(function() {
    var rating = parseFloat( $(this).data(dataProps.rating) );
    var css = makeClipRectangleCSS(rating, maxRating);
    $(this).find(selectors.foreground).css(css);
  });

  function makeClipRectangleCSS(rating, maxRating) {
    var pct = 100 * (rating / maxRating);

    // A clip rectangle from the left to <pct> of the way to the right
    // See http://bennettfeely.com/clippy/ and https://css-tricks.com/clipping-masking-css/
    return {
      '-webkit-clip-path': 'polygon(0 0, ' + pct + '% 0%, ' + pct + '% 100%, 0% 100%)',
      'clip-path':         'polygon(0 0, ' + pct + '% 0%, ' + pct + '% 100%, 0% 100%)'
    };
  }
}

function setupFadeIns() {
  var selectors = {
    wrapper: '.--fade-in-wrapper',     // find when this comes into view
    inner: '.--fade-in-inner'          // and fade this in
  };
  var delay = 500;
  var duration = 1000;

  inView(selectors.wrapper).
    on('enter', function(el) {
      $(el).find(selectors.inner).delay(delay).fadeIn(duration);
    });
}

function setupLineAnimations() {
  var bookLinesPath = '/assets/images/icons/book-lines.svg';
  var cssClasses = {
    doneAnimating: '--done-animating',
    isAnimating:   '--is-animating'
  };
  var selectors = {
    bookIcon: '.meeting__book-icon'
  };
  var delay = 500;

  inView(selectors.bookIcon).
    on('enter', function(el) {
      setTimeout(function() {
        if (el.classList.contains(cssClasses.doneAnimating) ||
            el.classList.contains(cssClasses.isAnimating)) {
              return;
        } else {
          el.classList.add(cssClasses.isAnimating);
        }
        var anim = new Vivus(el, { file: bookLinesPath}, function _doneAnimating() {
          el.classList.remove(cssClasses.isAnimating);
          el.classList.add(cssClasses.doneAnimating);
        });
      }, delay);
    });
}
