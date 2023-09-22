// Promisify a callback function
function promisify(fn) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
          if (err) return reject(err);
          resolve(result);  
        });
      });
    }
  }
  
  // Retry function on failure
  async function retry(fn, retries = 3, delay = 1000) {
    try {
      return await fn();
    } catch(err) {
      if(retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay);
      } else {
        throw err;
      }
    }
  }
  
  // Export utils
  export default {
    promisify,
    retry  
  };
  