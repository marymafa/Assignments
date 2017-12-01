
function myFunction(ele){
    if(ele<0){
        return "Or";
    }else if(ele>0){
        return "And";
    }else{
        return "None";
    }
}
console.log(myFunction(1));//And
console.log(myFunction(-1));// Or
console.log(myFunction("a"));// None