// @flow
const stopword = require('stopword');

export const strToArray = (str: string): Array<string> => {
  // turn the string into an array of words
  return (
    str
      .split(' ')
      // remove any space characters
      .filter(n => n.length > 0)
      // remove any newline characters
      .filter(n => n !== '\n')
  );
};

export const byteCount = (str: string) => {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    let code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
  }
  return s;
};

export const withoutStopWords = (str: string): string => {
  // turn the string into an array of words
  const arr = strToArray(str);
  // filter out any words that are considered stop words
  const cleaned = stopword.removeStopwords(arr);
  // join the array back into a string
  const joined = cleaned.join(' ');
  // return the string
  return joined;
};
