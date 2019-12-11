// array contain no.of duplicate objects, we need to remove duplicates



let value = [
    { 
        name: "aruna",
         id: 787,
         des: "mean stack" 
    }, 
    { 
        name: "abc", 
        id: 123,
        des: "mean stack"
    }, 
    { 
        name: "aruna", 
        id: 242,
        des: "Python"

    }, 
    {
        name: "aruna", 
        id: 667,
        des: "Java"
    }
]

let newArray = [];

let obj = {};

for(let i in value){
    newobj = value[i]['name'];

    obj[newobj] = value[i]
}

for(let i in obj){
    newArray.push(obj[i]);
}

console.log('after duplicates remove', newArray)