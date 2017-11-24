function addInt(numbers) {
    //var newArr = [];
  //  var splittedStr = str.split(",");
    //var newLine = str.replace(/\n/g, ",");
    // for (var i = 0; i < splittedStr.length; i++) {
    //     newArr.push(parseInt(splittedStr[i]));
    //     if (splittedStr[i] == "") {
    //         return 0;
    //     } else if (splittedStr[i] ==="\n") {
    //         str.replace("\n", ",");
    //     } else if (splittedStr[i]  < 0) {
    //         throw error(`{negatives are not allowed}`);
    //     }
    // }
    // return newArr.reduce(function (a, r) {
    //     return a + r;
    // });

    let numbersFormatted = numbers.split(',');
    let itemSum = 0;
   for(var i = 0; i < numbersFormatted.length; i++ ) {
      if(numbersFormatted[i] == "") {
        return 0;
    }
    else {
     itemSum += (parseInt(numbersFormatted[i]))
    }
   }

    return itemSum;
}

console.log(addInt("")); // output = 0
console.log(addInt("1")); //output= 1
console.log(addInt("1,2")); //output = 3

// console.log(addInt("1\n2,3"));

