// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)


const names = require('./04-names'); // receives as an object to this file
const sayHi = require('./05-utils');
const data = require('./06-alternative-flavor');


require('./07-mind-grenade');
// in this case we have a function in other file that invoked in that file itself.


sayHi('susan');
sayHi(names.john);
sayHi(names.peter);
// NOTE: for two line above, because names imports as an object.

console.log(data);

