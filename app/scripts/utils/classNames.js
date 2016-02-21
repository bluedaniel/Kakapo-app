import { flatten } from 'utils/';

const filterObj = obj => Object.keys(obj)
  .map(_k => obj[_k] ? _k : false).filter(_v => _v);

// For creating classes from strings, arrays and objects
// classNames('one', { two: true, three: false }) = 'one two'
export default (...args) =>
  flatten(args.map(_a => {
    if (Array.isArray(_a)) return flatten(_a).join(' ');
    if (typeof _a === 'object') return filterObj(_a);
    return _a;
  })).join(' ');
