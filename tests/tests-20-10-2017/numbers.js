
     function namedNumbers() {
         var result="";
    var args = Array.from(arguments);
    for (var index = 0; index < args.length; index++) {
        if (typeof args[index] === "number") {
            result.push(args[index]);
        }
    }
    return result.length== args.length?true:false;
}
console.log(namedNumbers(1, 4, 3, 2, 5));//true

console.log(namedNumbers(1, "a", 3));//false

console.log(namedNumbers(1, 3, NaN));//true
  

