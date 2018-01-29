import { BODY, OPEN, ACTIVE } from '../_constants';
import { SCROLL_TO } from '../_utils';

;(() => {
  
  BODY.on('click', '.js-btn-open-nav', e => {
    let $btn = $('.js-btn-open-nav');
    let $nav = $('.js-menu-mob');
    let $header = $('.js-header, .js-header-main');
    e.preventDefault();
    $nav.toggleClass(OPEN);
    $btn.toggleClass(ACTIVE);
    $header.toggleClass(ACTIVE);
  });
  BODY.on('click', '.js-menu-mob', function(e) {
    let $btn = $('.js-btn-open-nav');
    let $nav = $('.js-menu-mob');
    let $header = $('.js-header, .js-header-main');
    e.preventDefault();
    $nav.removeClass(OPEN);
    $btn.removeClass(ACTIVE);
    $header.removeClass(ACTIVE);
  });

  // BODY.click(e => {
  //   const $target = $(e.target);
  //   let $btn = $('.js-btn-open-nav');
  //   let $nav = $('.js-menu-mob');
  //   let header = '.js-header';
  //   let $header = $('.js-btn-open-nav');
  //   if ($target.closest(header).length) return;
  //   $nav.removeClass(OPEN);
  //   $btn.removeClass(ACTIVE);
  //   $header.removeClass(ACTIVE);
  // });

})();
