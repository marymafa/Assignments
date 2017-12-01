 
 function testString(string,word){
     if(string.includes(word)){
         return true;
        }
        return false;
    }
    console.log(testString('Perfect Practice Makes Perfect', 'Perfect'));//true
    console.log(testString('We should have a growth Mindset', 'Fixed'));// false