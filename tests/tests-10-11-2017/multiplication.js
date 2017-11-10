
function multiply(num1, num2) {
  var numbersArray = [];
  numbersArray.push(num1,num2);

   return numbersArray.reduce(function(a,b){
      return a * b;
  });
}

var output = multiply(3, 3);
console.log(output);

var output = multiply((3), (3));
console.log(output);