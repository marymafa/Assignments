function int_Add(str) {
    var array = [];
    var replaceArr = str.replace(/\n/g,",");

    // for (var i = 0; i < replceArr.length; i++) {
    //     array.push(replceArr[i]);
    //     if (replceArr[i] == "") {
    //         return 0;

    //     }
    // }
    // var finalAnswer = array.reduce(function (a, r) {
    //     return parseInt(a) + parseInt(r);
    // });
    return replaceArr;

}

console.log(int_Add(""));
console.log(int_Add("1"));
console.log(int_Add("1\n2,3"));
console.log(int_Add("1,2"));

