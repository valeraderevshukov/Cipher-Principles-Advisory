import stickySidebar from 'sticky-sidebar';
import {WIN, ACTIVE} from '../_constants';
import {SCROLL_TO} from '../_utils';

export default {

  toggleLine(state) {
    $('.js-sticky-sidebar')
      .find('[data-line]')
      .attr('data-state', state);
  },

  scrollTo() {
    $('.js-sticky-sidebar')
      .find('[data-href]')
      .each((i, link) => {
        link = $(link);
        const id = link.data('href');
        const section = $(`[data-section="${id}"]`);
        const top = section.offset().top;
        link.on('click', e => SCROLL_TO(top));
      });
  },

  detectActiveSection() {
    const scrollTop = WIN.scrollTop();

    const sidebar = $('.js-sticky-sidebar');
    const line = sidebar.find('[data-line]');
    const links = sidebar.find('[data-href]');

    $('[data-section]').each((i, section) => {

      section = $(section);
      const id = section.data('section');

      const link = links.filter(`[data-href="${id}"]`);
      const top = section.offset().top;
      const bottom = top + section.outerHeight();

      if (scrollTop >= top && scrollTop < bottom) {
        link.addClass(ACTIVE);
        line.css('transform', `translate3d(0,${link.position().top}px,0)`);
      } else {
        link.removeClass(ACTIVE);
      }

    });
  },
  detectOnScroll() {
    WIN.on('scroll', this.detectActiveSection);
    WIN.stickyActivated = true;
  },
  init() {
    const sticky = $('.js-sticky-sidebar').get(0);
    if (!sticky) return;

    new StickySidebar('.js-sticky-sidebar', {
      topSpacing: 20,
      bottomSpacing: 20
    });
    sticky.addEventListener('affix.top.stickySidebar', () => this.toggleLine(true));
    sticky.addEventListener('affix.static.stickySidebar', () => this.toggleLine(false));
    
    this.detectActiveSection();
    this.scrollTo();

    this.toggleLine(WIN.scrollTop() >= $('[data-section]').first().offset().top);

    if (WIN.stickyActivated) return;
    this.detectOnScroll();
  }
};
