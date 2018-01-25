import { WIN, BODY, FIXED } from '../_constants';
import sections from './_sections';
const startTrigger = '.js-start-anim-trigger';
import stickySidebar from './_sticky-sidebar';

BODY.on('click', startTrigger, function() {
  const page = $('.js-anim-page');
  const topicWrap = $('.js-topic-wrap');
  const clearTransform = 'is-clear-transform';
  const pageAnimation = new TimelineMax();
  pageAnimation
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
      page.addClass(clearTransform);
      BODY.removeClass(FIXED);
      sections.show();
      WIN.trigger('scroll');
      stickySidebar.init();
    });
});
