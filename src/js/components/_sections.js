import {WIN, ACTIVE} from '../_constants';

export default {

  //START SVG ANIMATIONS
  onViewPort(item) {
    return WIN.scrollTop() + WIN.outerHeight() < item.offset().top + item.outerHeight();
  },
  trust(section) {
    // if (this.onViewPort(section.find('[data-svg-wrapper]')) || section.animationPlayed) return;
    if (section.get(0).anumationPlayed) return;
    section.get(0).anumationPlayed = true;

    new TimelineMax()
      .to(section.find('[data-svg-icon="shield"]'), 0.6, {
        opacity: 1,
        y: 0
      }, '+=0.4')
      .to(section.find('[data-svg-icon="check"]'), 0.3, {
        opacity: 1,
        y: 0
      });
  },
  approach(section) {
    // if (this.onViewPort(section.find('[data-svg-wrapper]')) || section.animationPlayed) return;
    if (section.get(0).anumationPlayed) return;
    section.get(0).anumationPlayed = true;

    new TimelineMax()
      .to(section.find('[data-svg-icon="target"]'), 0.6, {
        opacity: 1,
        y: 0
      }, '+=0.4')
      .to(section.find('[data-svg-container]'), 0.2, {
        opacity: 1,
        y: 0,
        x: 0
      })
      .to(section.find('[data-svg-box]'), 0.15, {
        y: '4%'
      }, '-=0.025');
  },
  playAnimations() {
    // $('[data-animation-section]').each((i, section) => {
    //   section = $(section);
    //   const name = section.data('animation-section');

    //   typeof this[name] === 'function' && this[name](section);
    // });
  },
  //END SVG ANIMATIONS

  //START TEXT ANIMATIONS
  show(section) {
    const items = section.find('[data-animation-section-item], [data-stagger="wrap"] span');
    if (!items) return;
    new TimelineMax()
      .staggerTo(items, 0.75, {
        opacity: 1,
        y: 0,
        ease: Expo.easeOut
      }, '0.2');
  },
  //END TEXT ANIMATIONS
  stickyIcons() {
    const windowBottom = WIN.outerHeight() + WIN.scrollTop();
    const sections = $('.js-sections');
    if (!sections.length) return;
    const sectionsBottom = sections.offset().top + sections.outerHeight();
    const headerHeight = $('.js-header-inner').outerHeight() + $('.js-header-inner').position().top;

    $('.js-section-icon').each((i, icon) => {
      icon = $(icon);
      const iconIn = icon.find('.js-section-icon-in');
      const iconWidth = icon.outerWidth();
      const left = icon.offset().left;
      const top = sectionsBottom - icon.offset().top - iconIn.outerHeight();
      const translate = windowBottom <= sectionsBottom ? `${left}px,0,0` : `0,${top}px,0`;

      (windowBottom <= sectionsBottom) ? iconIn.removeClass('is-static') : iconIn.addClass('is-static');

      iconIn.css({
        width: `${iconWidth}px`,
        transform: `translate3d(${translate})`
      });
    });

    $('.js-section').each((i, section) => {
      section = $(section);
      const icon = section.find('.js-section-icon-in');
      const top = WIN.scrollTop() + headerHeight;

      if (section.offset().top < windowBottom - WIN.outerHeight()*0.3 && !section.get(0).wasAnimated) {
        section.get(0).wasAnimated = true;
        this.show(section);
      }

      if (windowBottom > sectionsBottom) {
        $('.js-section').removeClass(ACTIVE);
        sections.find('.js-section').last().addClass(ACTIVE);
        const name = sections.find('.js-section').last().data('animation-section');

        typeof this[name] === 'function' && this[name](section);
        return;
      }

      if (top >= section.offset().top && top <= section.offset().top + section.outerHeight() && !section.hasClass(ACTIVE)) {
        $('.js-section').removeClass(ACTIVE);
        section.addClass(ACTIVE);
        const name = section.data('animation-section');
        
        typeof this[name] === 'function' && this[name](section);
      }
    });
  },

  init() {
    // this.playAnimations();
    // WIN.on('scroll', () => this.playAnimations() );
    // this.stickyIcons();
    if (WIN.initedSections) return;
    WIN.initedSections = true;
    WIN.on('resize', () => this.stickyIcons() );
    WIN.on('scroll', () => this.stickyIcons() );
  }
};
