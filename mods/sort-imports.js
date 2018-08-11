// Codemod to sort library imports
// ie import { compose, multiply, add} from 'ramda' //=> import { add, compose, multiply } from 'ramda'

const libs = ['ramda', 'react-native', 'recompose'];

export default (file, api) => {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.ImportDeclaration)
    .filter(i => libs.indexOf(i.node.source.value) > -1)
    .forEach(i => {
      i.node.specifiers = i.node.specifiers.sort((a, b) =>
        a.local.name.localeCompare(b.local.name)
      );
    })
    .toSource();
};
