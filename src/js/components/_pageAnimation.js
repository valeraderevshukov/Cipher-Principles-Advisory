import { WIN, BODY, FIXED, HTMLBODY } from './../_constants';
import sections from './_sections';
import stickySidebar from './_sticky-sidebar';
import { SCROLL_WIDTH } from './_scrollWidth';
import { SCROLL_TO, TOUCH } from './../_utils';
import EVENT from './../communication/_events';
import OBSERVER from './../communication/_observer';

const startTrigger = '.js-start-anim-trigger';
window.scrollFlug = true;

BODY.on('click', startTrigger, function() {
  const page = $('.js-anim-page');
  const topicWrap = $('.js-topic-wrap');
  const clearTransform = 'is-clear-transform';
  const headerAnim = $('.js-header.header_anim');
  new TimelineMax()
    .to(page, 0.5, {
      y: 0,
      ease: Power1.easeInOut,
      clearProps:'all'
    }, 0)
    .to(topicWrap, 0.5, {
      y: -250,
      alpha: 0,
      ease: Power1.easeInOut
    }, 0)
    .eventCallback( 'onComplete', () => {
      window.scrollFlug = false;
      page.addClass(clearTransform);
      BODY.removeClass(FIXED);
      BODY.css({ paddingRight: 0});
      // sections.show();
      WIN.trigger('scroll');
      stickySidebar.init();
      headerAnim.css({ right: 0});
      OBSERVER.ON_FIRE(EVENT.TOPIC_ANIM_COMPLATE);
    });
});

const pageBack = '.js-page-back';
BODY.on('click', pageBack, function(e) {
  e.preventDefault();
  const page = $('.js-anim-page');
  const topicWrap = $('.js-topic-wrap');
  const clearTransform = 'is-clear-transform';
  const headerAnim = $('.js-header.header_anim');
  const duration = (WIN.scrollTop() === 0) ? 0 : 600;
  const scrollWidth = SCROLL_WIDTH();
  HTMLBODY.animate({
    scrollTop: 0
  }, duration, () => {
    new TimelineMax()
      .to(page, 0.5, {
        transform: 'translateY(100vh)',
        ease: Power1.easeInOut
      }, 0)
      .to(topicWrap, 0.5, {
        y: 0,
        alpha: 1,
        ease: Power1.easeInOut
      }, 0)
      .eventCallback( 'onComplete', () => {
        window.scrollFlug = true;
        if (scrollWidth > 0) {
          BODY.css({ paddingRight: scrollWidth });
          headerAnim.css({ right: scrollWidth });
        }
        page.removeClass(clearTransform);
        BODY.addClass(FIXED);
      });
  });
});

const animationToSwipeDown = () => {
  let yDown;
  let yUp;
  const topic = $('.js-topic');
  if (!TOUCH) return;
  BODY
    .on('mousedown touchstart', function(e) {
      yDown = e.pageY;
    })
    .on('mouseup touchend', '.js-topic', function(e) {
      yUp = e.pageY;
      if (yDown > yUp && window.scrollFlug) $(startTrigger).trigger('click');
    });
  let timeout;
  BODY.on('mousewheel', function(event) {
    if (!event.originalEvent.wheelDelta >= 0 && window.scrollFlug) {
      window.scrollFlug = false;
      $(startTrigger).trigger('click');
    }
  });
};
animationToSwipeDown();
