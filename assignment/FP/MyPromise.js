const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

let resolveCallback = (thenPromise, x, resolve, reject) => {
  if (thenPromise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  status = PENDING;
  value = undefined;
  reason = undefined;
  scuessCallStack = [];
  failCallStack = [];
  resolve = (value) => {
    if (this.status !== PENDING) return
    this.status = FULFILLED;
    this.value = value;
    while (this.scuessCallStack.length) {
      this.scuessCallStack.shift()();
    }
  }
  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED;
    this.reason = reason;
    while (this.failCallStack.length) {
      this.failCallStack.shift()();
    }
  }
  then(scuessCallback, failCallback) {
    if (typeof scuessCallback !== 'function') {
      scuessCallback = value => value;
    }
    if (typeof failCallback !== 'function') {
      failCallback = reason => {
        throw reason;
      }
    }

    let thenPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            let x = scuessCallback(this.value);
            resolveCallback(thenPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            let x = failCallback(this.reason);
            resolveCallback(thenPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        this.scuessCallStack.push(() => {
          queueMicrotask(() => {
            try {
              let x = scuessCallback(this.value);
              resolveCallback(thenPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.failCallStack.push(() => {
          queueMicrotask(() => {
            try {
              let x = failCallback(this.reason);
              resolveCallback(thenPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return thenPromise;
  }
  finally(callback) {
    this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      return MyPromise.resolve(callback()).then(() => {
        throw reason;
      });
    })
  }
  catch(failCallback) {
    return this.then(undefined, failCallback);
  }

  static length = this.constructor.length;
  static all (iterable) {
    let results = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      let push = (key, value) => {
        results[key] = value;
        if (++index === iterable.length) {
          resolve(results);
        }
      }
      iterable.forEach((item, i) => {
        if (item instanceof MyPromise) {
          item.then(value => push(i, value), reason => reject(reason));
        } else {
          push(i, item);
        }
      });
    });
  }
  static allSettled (iterable) {
    let results = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      let push = (status, key, value) => {
        results[key] = status === REJECTED ? {status: REJECTED, reason: value} : {status: FULFILLED, value: value};
        if (++index === iterable.length) {
          resolve(results);
        }
      }
      iterable.forEach((item, i) => {
        if (item instanceof MyPromise) {
          item.then(value => push(FULFILLED, i, value), reason => push(REJECTED, i, reason));
        } else {
          push(FULFILLED, i, item);
        }
      });
    });
  }
  // 暂不支持 Promise.any 方法
  static any (iterable) {}
  static race (iterable) {
    return new MyPromise((resolve, reject) => {
      for (let item of iterable) {
        if (item instanceof MyPromise) {
          item.then(resolve, reject);
        } else {
          resolve(item);
          break;
        }
      }
    });
  }
  static reject (reason) {
    if (reason instanceof MyPromise) {
      return reason;
    } else {
      return new MyPromise((resolve, reject) => reject(reason));
    }
  }
  static resolve (value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise(resolve => resolve(value));
    }
  }
}

export default MyPromise;
