---
title: Explanation of code
date: 2017-11-10
---

### Instructions:
Explain the unswer in details :
var name: "Vitalik Butter";
var obj={
    name:"Sasoshi Nakamato";
    pro:{
        name: "Adam Back";
    getFullName:function(){
        return this.name;
    }
}
}
### Solution:
fullname will and getFullName output Adam Back because they have same scoping meaning they have acess on prop.
Obj is the parent of prop, getFullName and fullName but does not have access on them.
Also nams does not have access on prop, getFullName and fullName.



