import { BODY } from '../_constants';
const tooltipClose = '.js-tooltip-close';
BODY.on('click', tooltipClose, function() {
  let tooltip = $(this).parents('.js-tooltip');
  const duration = 350;
  tooltip.fadeOut(duration);
  setTimeout(() => {
  	tooltip.remove();
  }, duration);
  
});
