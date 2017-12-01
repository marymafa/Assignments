function encoding(str) {
    str = str.toLowerCase;
    var count = 0;
    var newArr=[];
    for (var i = 0; i < str.length; i++) {
        if (i === 0) {
            count++;   
        } else if (str[i] === str[i -1]) {
            count++;
            newArr.push(count + str[i]);

        } else {
            var combination = newArr.reduce(function (count, str) {
                return  count + str[i];
            });

        }
    }
        return combination;
    
}
console.log(encoding("BOOKDASH"));