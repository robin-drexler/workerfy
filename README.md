# workerfy
Takes a (expensive) function and offloads it to a [worker thread](https://nodejs.org/docs/latest-v10.x/api/worker_threads.html).
Heavily inspired by [promisfy](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) and [workerize](https://github.com/developit/workerize).



## Warning
**DO NOT USE (YET)**

This is only a proof of concept as of now.
Does not work under some circumstances, because `workerfy` relies on being able to stringify the passed function.
Bound functions always return `"function () { [native code] }"` when being stringified.
Inline functions that use closured values won't work as well.

```js
const a = 1;
workerfy(() => a + 1); // will not work
```

Methods that access `this` also can't be used.

Currently it also creates a new worker instance for each invocation, because I was not able to prevent the node process from hanging otherwise. I.e. I could not figure when/how to terminate the workers.

## Example

index.js
```js
async function parseScript(script) {
  const workerfy = require('workerfy');
  const parse =  workerfy(require('some-js-parsing-library'));
  const result = await parse(script);
}

```

`node --experimental-worker index.js`
