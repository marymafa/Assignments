
function myFunction(val){
    if(val<0){
        return "Or";
    }else if(val>0){
        return "And";
    }else{
        return "None";
    }
}
console.log(myFunction(1));//And
console.log(myFunction(-1));// Or
console.log(myFunction("a"));// None