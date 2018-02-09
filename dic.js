const {Dic, DicLoader} = require('@kapitchi/bb-dic');

const dic = new Dic();
const loader = new DicLoader({
  rootDir: __dirname + '/src/services'
});
loader.loadPath(dic, ['**.js', '!**.spec.js']);

module.exports = {
  dic
};
