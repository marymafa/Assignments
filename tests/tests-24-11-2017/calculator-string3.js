function int_Add(str) {
    var array = [];
    var splittedStr = str.split(",");

    for (var i = 0; i < splittedStr.length; i++) {
        array.push(splittedStr[i]);
        if (splittedStr[i] == "") {
            return 0;

        }
    }
    var finalAnswer = array.reduce(function (a, r) {
        return parseInt(a) + parseInt(r);
    });
    return finalAnswer;

}

console.log(int_Add(""));
console.log(int_Add("1"));
console.log(int_Add("1,2"));


