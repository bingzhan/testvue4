import MyPromise from './MyPromise.js'

let promise = new MyPromise((resolve, reject) => {
  resolve('scuess');
  reject('reject');
});
let other = () => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('other');
    }, 2000)
  })
}
let abs = () => {
  return new MyPromise((resolve, reject) => {
    // setTimeout(() => {
      reject('abs');
    // }, 1000)
  })
}

// MyPromise.race([other(), abs()]).then(res => console.log(90909, res), reason => console.log(8989, reason))
MyPromise.allSettled([23, MyPromise.resolve(12), abs(), other()]).then(res => console.log(res))

promise.then(value => {
  console.log(11, value);
  // return 19999
  return other();
}, reason => {
  return 9999999999;
}).then(value => {
  console.log(22, value);
});


// var p1 = promise.then(val => {
//   console.log(999, val);
//   return p1
// });
//
// p1.then(val => {
//   console.log(val);
// }, reason => {
//   console.log(reason);
// })
window.MyPromise = MyPromise;
console.log(999, MyPromise.reject('ajsduhsiuhdi'));
