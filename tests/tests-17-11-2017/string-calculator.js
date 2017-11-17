function int_Add(str) {
    var newArray = [];
    var splittedStr = str.split(",");

    for (var i = 0; i < splittedStr.length; i++) {
        if (parseInt(splittedStr[i]) == " ") {
            newArray.push(0);
        } else {
            newArray.push(parseInt(splittedStr[i]));
        }
    }
    return newArray.reduce(function(a,r){
        return a + r;
    });
}

console.log(int_Add(""));
console.log(int_Add("1,3"));
console.log(int_Add("1,2"));
