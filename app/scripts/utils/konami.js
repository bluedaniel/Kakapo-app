import Rx from 'rx';

// Konami keycode
export default Rx.Observable.fromEvent(window, 'keyup')
  .map(el => el.keyCode)
  .windowWithCount(10, 1)
  .selectMany(_x => _x.toArray())
  .filter(seq => seq.toString() === [ 38, 38, 40, 40, 37, 39, 37, 39, 66, 65 ].toString());
