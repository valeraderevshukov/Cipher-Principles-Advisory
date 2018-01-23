import { TweenLite } from 'gsap';
import Barba from 'barba.js';
import { DOC } from '../_constants';
import stickySidebar from './_sticky-sidebar';

DOC.ready(() => {
  const pageContact = 'contact';
  Barba.Pjax.start();
  Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
    if (currentStatus.namespace === pageContact) window.initMap();
    stickySidebar.init();
  } ); 
  stickySidebar.init();
});
