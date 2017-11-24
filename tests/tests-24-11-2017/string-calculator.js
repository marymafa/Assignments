function addInt(str) {
    var newArr = [];
    var splittedStr = str.split(",");
    var newLine= str.replace(/\n/g, ",");


    for(var i=0; i<splittedStr.length; i++){
        newArr.push(parseInt(splittedStr[i]));
        if(splittedStr[i]== ""){
        return 0;
    }else if(newLine){
        str.replace(/\n/g, ",");
    }
    } 
    return newArr.reduce(function(a,r){
        return a + r;
    });
}
console.log(addInt("1"));
console.log(addInt("1/n2,3"));
console.log(addInt(""));
