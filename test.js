const assert = require('assert');

(async () => {
  try {
    const workerify = require('.');
    const longRunning = workerify(turns => {
      let i;
      for (i = 0; i < turns; i++) {}

      return i;
    });

    const result = await longRunning(100);
    assert.strictEqual(result, 100);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
