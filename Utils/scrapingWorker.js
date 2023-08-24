const { parentPort } = require("worker_threads");
const puppeteer = require("puppeteer");

const jobWebsites = ["https://startup.jobs/?q=frontend"];

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" }); // Change headless option
    const results = [];

    for (const url of jobWebsites) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
    

      const jobData = await page.evaluate(() => {
        const jobElements = document.querySelectorAll(".col-span-6");

        const jobList = [];
        jobElements.forEach((element) => {
          const titleElement = element.querySelector(".pt-1 em");
          const title = titleElement;

          const linkElement = element.querySelector(".pt-1");
          const link = linkElement.href;

          jobList.push({ title, link });
        });

        return jobList;
      });

      results.push(...jobData);

      await page.close();
    }

    await browser.close();

    parentPort.postMessage(results);
    console.log(results);
  } catch (error) {
    console.error("Scraping Error:", error);
    parentPort.postMessage([]);
  }
})();
