### 1. 谈谈你是如何理解js异步编程的`EventLoop`、消息队列都是做什么的，什么是宏任务，什么是微任务？

### 2. 将下面异步代码使用Promise的方式改进
  ```javascript
    setTimeout(function () {
      var a = 'hello'
      setTimeout(function () {
        var b = 'ken'
        setTimeout(function () {
          var c = 'liang'
          console.log(a + b + c)
        }, 10)
      }, 10)
    }, 10)
  ```

### 3. 基于一下代码完成下面的4个练习
  ```javascript
    const fp = require('lodash/fp');
    const cars = [
      { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
      { name: 'Spyker C12', horsepower: 650, dollar_value: 600000, in_stock: false },
      { name: 'Spyker C11', horsepower: 640, dollar_value: 500000, in_stock: false },
      { name: 'Spyker C10', horsepower: 630, dollar_value: 400000, in_stock: false },
      { name: 'Spyker C09', horsepower: 620, dollar_value: 300000, in_stock: true },
      { name: 'Spyker C08', horsepower: 610, dollar_value: 200000, in_stock: false },
    ]
  ```
* 使用函数组合`fp.flowRight()`重新实现下面这个函数
  ```javascript
    let isLastInStock = function (cars) {
      let last_car = fp.last(cars)
      return fp.prop('in_stock', last_car)
    }
  ```
* 使用`fp.flowRight()`, `fp.prop()`, `fp.first()`获取第一个`car`的`name`
* 使用帮助函数`_average`重构`averageDollarValue`,使用函数组合的方式实现
  ```javascript
    let _average = function (xs) {
      return fp.reduce(fp.add, 0, xs) / xs.length
    }
    let averageDollarValue = function (cars) {
      let dollar_value = fp.map(function (car) {
        return car.dollar_value
      }, cars)
      return _average(dollar_value)
    }
  ```
  * 使用`flowRight`写一个`sanitizeNames()`函数，返回一个下划线连接的小写字符串，把数值中的`name`转换为这种形式，例如：`sanitizeNames(["Hello World"]) => ["hello_world"]`
    ```javascript
      let _underscore = fp.replace(/\W+/g, '_');
    ```

### 4. 基于下面提供的代码，完成后续的4个练习
  ```javascript
    // support.js
    class Container {
      static of(value) {
        return new Container(value)
      }
      constructor(value) {
        this._value = value
      }
      map(fn) {
        return Container.of(fn(this._value))
      }
    }
    class Maybe {
      static of(x) {
        return new Maybe(x)
      }
      isNothing() {
        return this._value === null || this._value === undefined
      }
      constructor(x) {
        this._value = x
      }
      map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
      }
    }
    module.exports = { Maybe, Container }
  ```
  * 使用`fp.add(x,y)`和`fp.map(f,x)`创建一个能让`functor`里的值增加的函数`ex1`
  ```javascript
    // app.js
    const fp = require('lodash/fp');
    const { Maybe, Container } = require('./support')
    let maybe = Maybe.of([5, 6, 1])
    let ex1 = () => {
      // ...
    }
  ```
  * 实现一个函数`ex2`，能够使用`fp.first`获取列表的第一个元素
  ```javascript
    // app.js
    const fp = require('lodash/fp');
    const { Maybe, Container } = require('./support')
    let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
    let ex2 = () => {
      // ...
    }
  ```
  * 实现一个函数`ex3`，使用`safeProp`和`fp.first`找到`user`的名字的首字母
  ```javascript
    // app.js
    const fp = require('lodash/fp');
    const { Maybe, Container } = require('./support')
    let safeProp = fp.curry(function (x, o) {
      return Maybe.of(o[x])
    })
    let user = { id: 2, name: 'Albert' }
    let ex3 = () => {
      // ...
    }
  ```
  * 使用`Maybe`重写`ex4`，不要有`if`语句
  ```javascript
    // app.js
    const fp = require('lodash/fp');
    const { Maybe, Container } = require('./support')
    let ex4 = function (n) {
      if (n) {
        return parseInt(n)
      }
    }
  ```
