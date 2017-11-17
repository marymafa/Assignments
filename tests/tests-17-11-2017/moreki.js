var age =  22;

var moreki = function() {

console.log(age);
var age = 27;


};

moreki();

This  code will output  undefined because  this function is void  meaning that do not return  a value after the function executes.
The variable after the console log is a local variable  that means it references in the function in which it is declared  overide  the same
variable  name in the large scope.