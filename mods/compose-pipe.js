// Codemod to switch between pipe and compose
// ie pipe(add(10), multiply(5)) //=> compose(multiply(5), add(10))

const opts = ['compose', 'pipe']; // from, to

export default (file, api) => {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.Identifier)
    .filter(i => i.value.name === opts[0])
    .filter(i => i.parent.node.arguments)
    .forEach(i => {
      i.node.name = opts[1];
      i.parent.node.arguments.reverse();
    })
    .toSource();
};
