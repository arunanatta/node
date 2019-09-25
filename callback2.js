//async function calls parallel

function first(data, cb) {
    setTimeout(function () {
        cb('one');
    }, 2000)

    
    
}
function second(data, cb) {
    setTimeout(function () {
        cb('two', 2);
    }, 3000)

    
    
}

function third(data, cb) {
    setTimeout(function () {
        cb('three', 3, data);
    }, 4000)

    
    
}


first('1', function(data){
    console.log(data);  
})

second('1', function(data, data2){
    console.log(data,data2);  
})

third('1', function(data,data2,data3){
    console.log(data,data2,data3);  
})