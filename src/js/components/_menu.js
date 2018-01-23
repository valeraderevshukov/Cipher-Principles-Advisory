import { BODY, OPEN, ACTIVE } from '../_constants';
import { SCROLL_TO } from '../_utils';

;(() => {
  
  BODY.on('click', '.js-btn-open-nav', e => {
    console.log('fff');
    let $btn = $('.js-btn-open-nav');
    let $nav = $('.js-menu-mob');
    let $header = $('.js-header');
    e.preventDefault();
    $nav.toggleClass(OPEN);
    $btn.toggleClass(ACTIVE);
    $header.toggleClass(ACTIVE);
  });

  BODY.click(e => {
    const $target = $(e.target);
    let $btn = $('.js-btn-open-nav');
    let $nav = $('.js-menu-mob');
    let header = '.js-header';
    let $header = $('.js-header');
    if ($target.closest(header).length) return;
    $nav.removeClass(OPEN);
    $btn.removeClass(ACTIVE);
    $header.removeClass(ACTIVE);
  });

})();
