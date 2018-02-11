import EVENT from './../communication/_events';
import OBSERVER from './../communication/_observer';
import { BODY } from '../_constants';
import TopicAnim from './_topicAnim';
import {SCROLL_TO} from './../_utils';

const jumpLink = '[data-jump-href]';
window.sectionActive = null;
BODY.on('click', jumpLink, function() {
  let page = $(this).data('jump-href');
  window.sectionActive = page;
});

OBSERVER.SUB(EVENT.TOPIC_ANIM_TEXT_COMPLATE, () => {
  const page = window.sectionActive;
  if (!page) return;
  const topicAnimTrigger = $('.js-start-anim-trigger');
  topicAnimTrigger.trigger('click');
});

OBSERVER.SUB(EVENT.TOPIC_ANIM_COMPLATE, () => {
  let page = window.sectionActive;
  if (!page) return;
  const section = $(`[data-section="${page}"]`);
  const headerInner = $('.js-header-inner');
  const topPadding = headerInner.outerHeight() + headerInner.position().top;
  const top = section.offset().top - topPadding;
  SCROLL_TO(top);
  window.sectionActive = null;
});
BODY.on('click', 'a:not([data-jump-href])', function() {
  window.sectionActive = null;
});
