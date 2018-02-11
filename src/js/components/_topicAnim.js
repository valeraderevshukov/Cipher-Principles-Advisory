import EVENT from './../communication/_events';
import OBSERVER from './../communication/_observer';

export default {
  animTo(container, duration, delay) {
    if (!container) return;
    return (
      new TimelineMax()
        .to(container, duration || 0.6, {
          opacity: 1,
          y: 0,
          x: 0,
          ease: Power1.easeInOut
        }, delay || 0)
    );
    
  },
  title() {
    const rows = $('.js-topic [data-stagger="inner"]');
    if (!rows) return;
    new TimelineMax()
      .staggerTo(rows, 0.6, {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut
      }, 0.15);
  },

  play() {
    const headerInner = $('.js-header-inner');
    const topicleft = $('.js-topic-left');
    const topicFooter = $('.js-topic-footer');
    const topicBg = $('.js-topic-bg');
    const tooltip = $('.js-topic .js-tooltip');
    let that = this;
    let reverseAnim = false;
    new TimelineMax()
      .add( this.title, 0 )
      .add( this.animTo(headerInner), 0.6 )
      .add( this.animTo(topicleft), 0.6 )
      .add( this.animTo(topicBg, 0.9), 1.1 )
      .add( this.animTo(topicFooter, 1), 2 )
      .add( this.animTo(tooltip, 0.35), 2.8 )
      .eventCallback( 'onComplete', () => {
        OBSERVER.ON_FIRE(EVENT.TOPIC_ANIM_TEXT_COMPLATE);
      });
  }
};
