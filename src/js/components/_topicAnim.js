import { TimelineMax } from 'gsap';

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
  header() {
    const header = $('.js-header');
    this.animTo(header);
  },
  topicLeft() {
    const topicleft = $('.js-topic-left');
    this.animTo(topicleft);
  },
  title() {
    const rows = $('.js-topic [data-stagger="inner"]');
    new TimelineMax()
      .staggerTo(rows, 0.6, {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut
      }, 0.15);
  },

  play() {
    const header = $('.js-header');
    const topicleft = $('.js-topic-left');
    const topicFooter = $('.js-topic-footer');
    const topicBg = $('.js-topic-bg');
    let that = this;
    new TimelineMax()
      .add( this.title, 0 )
      .add( this.animTo(header), 0.6 )
      .add( this.animTo(topicleft), 0.6 )
      .add( this.animTo(topicBg, 0.9), 1.1 )
      .add( this.animTo(topicFooter, 0.8), 2 );
  }
};
