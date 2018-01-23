import { TweenLite } from 'gsap';
import Barba from 'barba.js';
import { DOC } from '../_constants';

DOC.ready(() => {
  const pageContact = 'contact';
  Barba.Pjax.start();
  Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
    if (currentStatus.namespace === pageContact) window.initMap();
  } ); 
});
