//async function calls when previous function completed



function first(data, cb) {
    setTimeout(function () {
        cb('one',1);
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



first('1',function (data, data2) {
    console.log( data,data2);
    second(data2, 'aruna',function (data, data2, data3) {
        console.log( data,data2, data3);
        third(data2, function (data, data2, data3) {
            console.log(data,data2, data3);
        })
    }); 
}); 