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
Name is outside var obj,pro,and getFullName(), And obj is the parent of pro and getFullName but does not have access on them. It will output Adam Back because getFullName have access on pro.

