import stickySidebar from 'sticky-sidebar';
import {WIN, ACTIVE} from '../_constants';
import {SCROLL_TO} from '../_utils';
const headerLinks = $('[data-nav-href]');
headerLinks.on('click', e => {
  e.preventDefault();
});
export default {

  toggleLine(state) {
    $('.js-sticky-sidebar')
      .find('[data-line]')
      .attr('data-state', state);
  },

  scrollTo() {
    const headerLinks = $('[data-nav-href]');
    const scrollToSection = (link, attr) => {
      link = $(link);
      const id = link.data(attr);
      const section = $(`[data-section="${id}"]`);
      const top = section.offset().top;
      link.on('click', e => {
        e.preventDefault();
        SCROLL_TO(top);
      });
    };

    $('.js-sticky-sidebar')
      .find('[data-href]')
      .each((i, link) => {
        scrollToSection(link, 'href');
      });
    headerLinks.each((i, link) => {
      scrollToSection(link, 'nav-href');
    });
  },

  detectActiveSection() {
    const scrollTop = WIN.scrollTop();

    const sidebar = $('.js-sticky-sidebar');
    const line = sidebar.find('[data-line]');
    const links = sidebar.find('[data-href]');
    const headerLinks = $('[data-nav-href]');

    $('[data-section]').each((i, section) => {

      section = $(section);
      const id = section.data('section');

      const link = links.filter(`[data-href="${id}"]`);
      const top = section.offset().top;
      const bottom = top + section.outerHeight();
      const headerLink = headerLinks.filter(`[data-nav-href="${id}"]`);

      if (scrollTop >= top && scrollTop < bottom) {
        link
          .add(headerLink)
          .addClass(ACTIVE);
        line.css('transform', `translate3d(0,${link.position().top}px,0)`);
      } else {
        link
          .add(headerLink)
          .removeClass(ACTIVE);
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
