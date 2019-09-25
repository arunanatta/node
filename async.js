//async await using async function calls


function first() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('firstt');
      }, 5000);
    });
  }

  function second() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('secondd');
      }, 2000);
    });
  }

  function third() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('thirdd');
      }, 2000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    var result = await first();
    var result1 = await second();
    var result2 = await third();
    console.log(result);
    console.log(result1);
    console.log(result2);
  }
  
  asyncCall();