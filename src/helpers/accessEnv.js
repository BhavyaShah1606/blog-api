// accesses a variable inside of process.env, throwing an error if it's not found.
// always run this method in advance (i.e. upon initialisation) so that the error is thrown as early as possible.
// caching the values improves performance - accessing process.env many times is bad.

const cache = {};

const accessEnv = (key, defaultValue) => {
  if (!(key in process.env)) {
    if (defaultValue !== undefined) {
      // default value can be anything (boolean, null or empty string etc.)
      return defaultValue;
    }

    throw new Error(`Key: ${key} not found in process.env!`);
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return process.env[key];
};

export default accessEnv;
