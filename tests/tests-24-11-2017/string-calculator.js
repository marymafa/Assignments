function addInt(str) {
    var newArr = [];
    var splittedStr = str.split(",");


    for(var i=0; i<splittedStr.length; i++){
        newArr.push(splittedStr[i]);
        if(newArr== ""){
        return 0;
    } 
    }
    return newArr.reduce(function(a,r){
        return a + r;
    });
}
console.log(addInt("1,2"));
console.log(addInt("3,5"));
console.log(addInt(""));
