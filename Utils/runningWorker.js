const { Worker } = require('worker_threads');
const path = require('path');

const workerScriptPath = path.join(__dirname, "scrapingWorker.js");

// Create and run the worker
const worker = new Worker(workerScriptPath);

// Listen for messages from the worker
worker.on('message', (results) => {
  console.log('Scraped Job Data:', results);
});

// Handle any errors from the worker
worker.on('error', (error) => {
  console.error('Worker Error:', error);
});

// Handle the worker exit event
worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});
