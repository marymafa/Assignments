function int_Add(str) {
    var array = [];
    var replaceArr = str.replace(/\n/g,",");
    for(var i in array){
        if(array[i]=== "\n"){
            str.replace(/\n/g,",");
        }
        return str;
    }

    // / for (var i = 0; i < replceArr.length; i++) {
    //     array.push(replceArr[i]);
    //     if (replceArr[i] == "\n") {
    //        sum += 0;

    //     }
    // }
    // var finalAnswer = array.reduce(function (a, r) {
    //     return parseInt(a) + parseInt(r);
    // });
    //return replaceArr;

}

console.log(int_Add(""));
console.log(int_Add("1"));
console.log(int_Add("1\n2,3"));
console.log(int_Add("1,2"));
