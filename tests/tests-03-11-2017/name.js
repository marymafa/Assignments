var name= 'Vitalik Buterin';
var obj = {
    name: "Sasoshi Nakamato",
    pro: {
        name: "Adam Back",
        getFullName: function () {
            return this.name;
        }
    }
}


console.log(obj.pro.getFullName());

var fullName = obj.pro.getFullName();
console.log(fullName);
