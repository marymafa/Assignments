function checkNumbers(array, number, string) {
    if (string === "GreaterOrEqual" && array >= number) {
        var result = array.filter(function (val) {
            return val >= number;
        })
    } if (string === "LessThan" && array < number) {
        var result = array.filter(function (val) {
            return val < number;
        });
    }
     
}
    console.log(checkNumbers([1, 2, 3, 4, 5, 6, 7], 3, "GreaterOrEqual"));//[3,4,5,6,7]
    console.log(checkNumbers([1, 2, 3, 4, 5, 6, 7], 5, "LessThan"));//[1,2,3,4]