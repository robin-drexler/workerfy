const { Worker } = require('worker_threads');

function workerfy(fn) {
  const fnCode = Function.prototype.toString.call(fn);
  const workerCode = `
    const { parentPort } = require('worker_threads');
    parentPort.on('message', (args) => {
      Promise.resolve((${fnCode})(...args)).then((result) => {
        parentPort.postMessage(result);
      });
    });
  `;

  return function(...args) {
    const worker = new Worker(workerCode, { eval: true });

    const promise = new Promise(resolve => {
      worker.once('message', result => {
        worker.terminate();
        resolve(result);
      });
    });

    worker.postMessage(args);
    return promise;
  };
}

module.exports = workerfy;
