function smaller(num) {
    this.num = num;
}
smaller.prototype.test = function (array) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        if (array[i] < this.num) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}
var num1 = new smaller(12);
var num2 = new smaller(16);

console.log(num1.test([100, 3, 6, 9, 10, 16, 20]));
console.log(num2.test([50, 2, 7, 9, 20, 10]));;
