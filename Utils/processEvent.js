const runWorker = require("./scrapingWorker");
const User = require("../Models/user_auth");
const mailer = require("../Config/mailer");


const processEvent = async (userEmail, professionalRole, cvFilePath) => {
  try {
    const jobWebsite = `https://startup.jobs/?q=${professionalRole}`;
  
    const jobData = await runWorker(jobWebsite);

    //Handle the scraped job data
    const emailContent = jobData
      .map(
        (event) => `
        <div style="display: flex; margin-top: 20px; border: 1px solid #ccc; padding: 10px; border-radius: 10px;">
        <div style="flex: 1; padding-left: 20px;">
          <h2 style="margin-bottom: 10px; font-size: 1.2em;">${event.cleanedTitle}</h2>
          <div style="display: flex; align-items: center;">
            <div style="margin-right: 10px;">
              <img src=${event.companyLogo} alt="company logo" style="max-width: 100px; max-height: 100px;">
            </div>
            <div>
              <p style="margin: 0; font-weight: bold;">${event.companyName}</p>
              <p style="margin: 0; color: #555;">${event.companyRole}</p>
            </div>
          </div>
          <p style="margin-top: 10px;">
            Use <a href="https://bard.google.com/" style="color: #007bff; text-decoration: none;">Bard</a> to structure your work experience to include the following: <b>Copy</b> <span style="background-color: silver;">${event.workExperience}</span>
          </p>
          <button style="margin-top: 10px; padding: 8px 16px; font-weight: bold; background-color: #007bff; border: none; color: #fff; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;">
            <a href=${event.applicationLink} target="_blank" style="text-decoration: none; color: #fff;">Apply for this job</a>
          </button>
        </div>
      </div>
      `
      )
      .join("");

    const emailWithFooter = `
      ${emailContent}
      <footer style="padding: 20px; margin-top: 10px; text-align: center; background-color: black; color: silver;">
        <p>
          Made with <span style="color: #ff9400;">&#10084;&#65039;</span> by
          <a href="https://www.linkedin.com/in/israel-abazie/" style="color: white; text-decoration: underline;" target="_blank">Israel Abazie</a>
        </p>
        <p>&copy; 2023 Runjob Technology, All rights reserved.</p>
      </footer>
      <div style="padding: 20px; background-color: #f9f9f9; text-align: center; color: #333;">
        <h3>Your Support Makes a Difference</h3>
        <p>
          At Runjob, we believe in the transformative power of technology. It's your support
          that fuels our mission to change lives. Every donation, big or small, helps us grow
          and continue to provide valuable services to those who need it most.
        </p>
        <p>
          To make a meaningful contribution, please click the link below:
          <br />
          <a href="https://flutterwave.com/donate/odp6yoepujtf" target="_blank" style="color: #007bff;">
            Make a Donation
          </a>
        </p>
      </div>
    `;

    const user = await User.findOne({ email: userEmail });

    if (user) {
      mailer(
        user.email,
        `A fresh batch of ${professionalRole.toLowerCase()} jobs for you!`,
        emailWithFooter,
        cvFilePath
      );
    } else {
      console.error(`User with email ${userEmail} not found.`);
    }

  } catch (error) {
    console.error("An error occurred within the Cron job:", error);
  }
};

module.exports = { processEvent };
