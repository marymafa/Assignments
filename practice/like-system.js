function likes(names){
    var args=array.from(arguments);
    for(var i=0; i<names.length; i++){
        if(emptystring){
            return "no one likes this";
        }else{
            return "name" +" "+"like"+" "+"this";
        }
    }

}
console.log(likes([]));
console.log(likes("mary"));

