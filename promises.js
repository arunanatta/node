// promises chaining 


var first = function(){
    var promise = new Promise(function pro(resolve, reject){
        setTimeout(function () {
            console.log('first');
            resolve({data: '123'});
        },2000)
    })
    return promise;
}

var second = function(some){
    var promise = new Promise(function pro(resolve, reject){
        setTimeout(function () {
            console.log('second');
            resolve({newData: some.data + '123'});
        },2000)
    })
    return promise;
}

var third = function(some){
    var promise = new Promise(function pro(resolve, reject){
        setTimeout(function () {
            console.log('third');
            resolve({result: some.newData});
        },2000)
    })
    return promise;
}


first()
    .then(second)
    .then(third);
