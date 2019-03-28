
function binaryChop(array,value){
    var min=0;
    var max=array.length-1;
    while( min <= max && array != value){
        var middle = Math.floor((max + min) / 2);
        if(value < array[middle]){
            max = middle -1;
        }
       else  if(value > array[middle]){
            min = middle + 1;
        }
       else if(value === array[middle]){
            return middle;

        }else{
            return -1;
        }
    };
}
var array = [1,2,3,5,7,9,6];
console.log(binaryChop(array, 1));
console.log(binaryChop(array, 5));
console.log(binaryChop(array, 7));
console.log(binaryChop(array, 8));


