

        function returnSmaller(arr, num) {
            var newArray = [];
            var sortedArr=arr.sort(function (a,b) {
                return a - b;
            });
            for(var i=0; i<sortedArr.length; i++){
                if(sortedArr[i]< num){
                newArray.push(sortedArr[i]);
                }
            }
            
            return  newArray;
        }
            console.log( returnSmaller([100, 3, 6, 9, 10, 16, 20],12));

   