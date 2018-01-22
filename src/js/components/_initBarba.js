import { TweenLite } from 'gsap';
import Barba from 'barba.js';
import { DOC } from './../_constants';

DOC.ready(() => {
  Barba.Pjax.start();
  Barba.Dispatcher.on('transitionCompleted', () => window.initMap() );
});
