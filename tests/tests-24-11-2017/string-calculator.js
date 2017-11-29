function addInt(numbers) {
    var sum = 0;
    var numlistNewLine = numbers.replace(/[\n]/g, ',');
    var splitted = numlistNewLine.split(',');
    if (splitted == "") {
        return 0;
    }else{
        if(/(\d).(\d).exec(numbers) || (-\d).exec(numbers) /);
        var numbers=numbers.match(/(-\d)|(\d)[.](\d)|([0-9])/g);
    }
    for (var i = 0; i < splitted.length; i++) {
        if (splitted.Length == 1) {
            return parseInt(numbers);
        }
        sum = splitted.reduce(function (a, b) {
             if (parseInt(a)  < 0 || parseInt(b) < 0) {
            return new Error(`sorry negatives not allowed: ${numbers}`);
        }

            return parseInt(a) + parseInt(b);
        });

    }

    return sum;

}
console.log(addInt(""));
console.log(addInt("1"));
console.log(addInt("1,2"));
console.log(addInt("1\n2,3"));
console.log(addInt("-4,3"));


