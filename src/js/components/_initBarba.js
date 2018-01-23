import { TweenLite } from 'gsap';
import Barba from 'barba.js';
<<<<<<< HEAD
import { DOC } from '../_constants';
=======
import { DOC } from './../_constants';
import stickySidebar from './_sticky-sidebar';
>>>>>>> 67d3e2a2b3f24bc1de81879d743dc189adb35078

DOC.ready(() => {
  const pageContact = 'contact';
  Barba.Pjax.start();
  Barba.Dispatcher.on('transitionCompleted', (currentStatus) => {
    if (currentStatus.namespace === pageContact) window.initMap();
    stickySidebar.init();
  } ); 
  stickySidebar.init();
});
