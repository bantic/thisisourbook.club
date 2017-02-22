/* global $, inView, Vivus */
$(document).ready(function() {
  setupLineAnimations();
  setupStarClipPaths();
  setupFadeIns();
  setupOpacityIncreasers();
  setupImageMovement();
});

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

function setImageHeights() {
  var wigglePercentage = 0.15;
  var maxWiggle = 100;

  $('.meeting__img--img').each(function() {
    var height = $(this).height();
    var wiggle = Math.min(maxWiggle, wigglePercentage * height);
    $(this).parent('.meeting__img--wrapper').css({height: (height - wiggle) + 'px'});
    $(this).
      css({'margin-top': (-0.5*wiggle) + 'px'}).
      data('img-wiggle', wiggle);
  });
}

function setupImageMovement() {
  setImageHeights();
  $(window).on('resize', debounce(setImageHeights, 100));
  $(window).on('scroll', scrollHandler);
}

function scrollHandler() {
  var innerHeight = window.innerHeight;
  var scrollTop = document.body.scrollTop;
  var screenBottom = innerHeight;

  $('.meeting__img--img').each(function() {
    var wiggle = parseFloat( $(this).data('img-wiggle') );
    var dims = this.getBoundingClientRect();
    var midHeight = dims.top + dims.height/2;

    var percentage;

    if (midHeight < 0) {
      percentage = 0;
    } else if (midHeight > screenBottom) {
      percentage = 1;
    } else {
      var percentage = midHeight / screenBottom;
    }

    var marginTop = (-1*wiggle) + (percentage * wiggle);
    $(this).css({'margin-top': marginTop});
  });
}

function setupOpacityIncreasers() {
  var selectors = {
    enter: '.opacity-will-increase'
  };
  var cssClasses = {
    didEnter: 'opacity-did-increase'
  };
  var delay = 250;

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
    wrapper: '.fade-in-wrapper',     // find when this comes into view
    inner: '.fade-in-inner'          // and fade this in
  };
  var delay = 250;
  var duration = 1000;

  inView(selectors.wrapper).
    on('enter', function(el) {
      $(el).find(selectors.inner).delay(delay).fadeIn(duration);
    });
}

function setupLineAnimations() {
  var bookLinesPath = '/assets/images/icons/book-lines.svg';
  var cssClasses = {
    doneAnimating: 'svg--done-animating',
    isAnimating:   'svg--is-animating'
  };
  var selectors = {
    bookIcon: '.meeting__book-icon'
  };

  inView(selectors.bookIcon).
    on('enter', function(el) {
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
    });
}
