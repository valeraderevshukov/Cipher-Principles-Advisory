import { TweenLite } from 'gsap';
import Barba from 'barba.js';
import { DOC } from '../_constants';
import stickySidebar from './_sticky-sidebar';
import Preloader from './_preloader';

DOC.ready(() => {
  const pageContact = 'contact';
  const preloader = new Preloader({ counterDuration: 0.6 });
  Barba.Pjax.start();

  Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
    if (currentStatus.namespace === pageContact) window.initMap();
    stickySidebar.init();
    preloader.init();
  } ); 

  stickySidebar.init();
  preloader.init();

});
