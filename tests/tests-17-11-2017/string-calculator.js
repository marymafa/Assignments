function int_Add(str) {
    var arr = [];
    var splittedStr = str.split(",");

    for (var i = 0; i < splittedStr.length; i++) {
           arr.push(splittedStr[i]);
    }if(arr== ""){
        return 0;
    
        } else {
            arr.push(parseInt(splittedStr[i]));
        }
         return arr.reduce(function(a,r){
        return a + r;
    });
    }
   


console.log(int_Add(""));
console.log(int_Add("1,3"));
console.log(int_Add("1,2"));
