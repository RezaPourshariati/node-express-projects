const path = require('path');

console.log(path.sep);
console.log(path.delimiter);

const filePath = path.join('/content', 'subFolder', 'test.txt');
console.log('3 >>> ', filePath);

const base = path.basename(filePath); // returns only the target file.
// const base = path.basename(filePath, '.txt');
// with second parameter we can filter the suffix of that file.
console.log('4 >>> ', base);

console.log('5 >>> ', path.dirname(filePath)); // returns only directory path

const absolutePath = path.resolve(__dirname, 'content', 'subFolder', 'test.txt');
console.log('6 >>> ', absolutePath); // returns the absolute path.

console.log('7 >>> ', path.isAbsolute(absolutePath)); // returns boolean to see if the path is absolute or not
console.log('8 >>> ', path.extname(absolutePath)); // returns the suffix of the file
console.log('9 >>> ', path.normalize(absolutePath));
console.log('10 >>> ', path.parse(absolutePath)); // returns an object with its details --> root-dir-base-ext-name
// read more about path.relative()
