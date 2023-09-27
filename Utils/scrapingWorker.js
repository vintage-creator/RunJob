const puppeteer = require("puppeteer");


// Function to scrape job data from a given jobWebsite
async function scrapeJobData(jobWebsite) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate to the job website
    await page.goto(jobWebsite, { waitUntil: "domcontentloaded"});
    // Wait for the page to load, and for a specific element to be present
    await page.waitForSelector('stickyFooter--hidden', { hidden: true, timeout: 30000 });

    // Get a list of job elements on the page
    const jobElements = await page.$$(".col-span-6");

    const promises = jobElements.map(async (element) => {
      // Extract information for each job
      const companyLogoElement = await element.$(".object-contain");
      const companyLogo = companyLogoElement
        ? await page.evaluate((node) => node.src, companyLogoElement)
        : "No logo found";

      const titleElement = await element.$(".pt-1");
      const title = titleElement
        ? await page.evaluate((node) => node.textContent, titleElement)
        : "No title found";
      const cleanedTitle = title.trim().replace(/[\n✓]+|\n$/g, "");

      const linkElement = await element.$(".pt-1");
      const link = linkElement
        ? await page.evaluate((node) => node.href, linkElement)
        : "No link found";

      const newPage = await browser.newPage();
      await newPage.goto(link, { waitUntil: "domcontentloaded" });

      const companyNameElement = await newPage.$(".visualHeader__subtitle");
      const companyName = companyNameElement
        ? await newPage.evaluate((node) => node.textContent, companyNameElement)
        : "No company name found";

      const companyRoleElement = await newPage.$(".visualHeader__title");
      const companyRole = companyRoleElement
        ? await newPage.evaluate((node) => node.textContent, companyRoleElement)
        : "No company role found";

      const applicationButtonElement = await newPage.$("#apply_button");
      const applicationLinkElement = applicationButtonElement
        ? await applicationButtonElement.$("a")
        : null;
      const applicationLink = applicationLinkElement
        ? await newPage.evaluate((node) => node.href, applicationLinkElement)
        : "";

      const ulElements = await newPage.$$("ul");
      let jobExperienceData = [];

      if (ulElements) {
        for (const ulElement of ulElements) {
          const ulContent = await newPage.evaluate(
            (element) => element.textContent,
            ulElement
          );

          if (
            ulContent.match(/experience|interested|familiar|commitment|understanding|knowledge|proficient|ability/i) ||
            ulContent.match(/bachelor's degree/i)
          ) {
            const liElements = await ulElement.$$("li");
            for (const liElement of liElements) {
              const liContent = await newPage.evaluate(
                (node) => node.textContent,
                liElement
              );
              jobExperienceData.push(liContent);
            }
          }
        }
      } else {
        console.log("No `ul` elements found on the page.");
      }

      await newPage.close();

      // Return a job data object
      return {
        cleanedTitle,
        link,
        companyLogo,
        companyName,
        companyRole,
        workExperience: jobExperienceData,
        applicationLink,
      };
    });

  // Resolve all promises concurrently
    const jobData = await Promise.all(promises);

    await browser.close();

    // Return the scraped job data
    return jobData;
  } catch (error) {
    console.error("Scraping Error:", error);
    throw error; 
  }
}
// Export the function for use in other modules
module.exports = scrapeJobData;
