let exCodes = {
  section1: {
    indexOf: `var string = "apple banana cherry";
var search = "banana";
var result = string.indexOf(search);

console.log(result);`,
    includes: `var string = "apple banana cherry";
var search = "banana";
var result = string.includes(search);

console.log(result);`,
    search: `var string = "apple banana cherry";
var pattern = /bana/;
var result = string.search(pattern);

console.log(result);`,
    lodash: `var string = "apple banana cherry";
var search = "banana";
var result = _.includes(string, search);

console.log(result);`,
    test: `var string = "apple banana cherry";
var pattern = /bana/;
var result = pattern.test(string);

console.log(result);`,
    match: `var string = "apple banana cherry";
var pattern = /bana/;
var result = string.match(pattern);

console.log(result);`,
  },
  section2: {
    substring: {
      forward: `var string = "apple banana cherry";
var result = string.substring(9, 16);

console.log(result);`,
      reverse: `var string = "apple banana cherry";
var result = string.substring(string.length, string.length-5);

console.log(result);`
    },
    substr: {
      forward: `var string = "apple banana cherry";
var result = string.substr(9, 3);

console.log(result);`,
      reverse: `var string = "apple banana cherry";
var result = string.substr(string.length-10, 8);

console.log(result);`
    }
  },
  section3: {
    replace: {
      basic: `var string = "@apple @banana @cherry";
var pattern = "@";
var change = "";

var result = string.replace(pattern, change);

console.log(result);`,
      regex: `var string = "#apple @banana $cherry";
var pattern = /[\{\}\[\]\/?.,;:|\)*~\`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
var change = "";

if (pattern.test(string)) {
    var result = string.replace(pattern, change);
}

console.log(result);`
    }
  },
};

export default exCodes;