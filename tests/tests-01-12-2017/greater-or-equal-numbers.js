
function checkNumbers(array, number, string) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {

            if (string === "GreaterOrEqual" && array[i] >= number) {
                newArr.push(array[i]);
            } if (string === "LessThan" && array[i] < number) {
                newArr.push(array[i])
            }
        }
    return newArr;
}
console.log(checkNumbers([1, 2, 3, 4, 5, 6, 7], 3, "GreaterOrEqual"));//[3,4,5,6,7]
console.log(checkNumbers([1, 2, 3, 4, 5, 6, 7], 5, "LessThan"));//[1,2,3,4]