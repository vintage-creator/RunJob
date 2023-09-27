const fs = require("fs");
const cronDaemon = require("node-cron");
const path = require("path");
const inputValidation = require("../Utils/inputValidation");
const upload = require("../Utils/multer");
const { processEvent } = require("../Utils/processEvent"); 

const runJobHome = (req, res) => {
  if (!req.isAuthenticated() && !req.session.isAuthenticated) {
    return res.redirect("/");
  }
  req.flash("success", "Sign in successful!");
  res.render("index", { flashMessages: req.flash() });
};

const runAppEngine = async (req, res) => {
  let isFirstRun = true;
  upload.single("cv")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).send("File upload error");
    }

    const { professionalRole, coverLetter } = req.body;
    const cvFilePath = req.file ? req.file.path : null;

    if (cvFilePath) {
      console.log("CV File Path:", cvFilePath);
    }

    const { error, value } = inputValidation.validate(req.body);

    if (error) {
      console.error("Validation error:", error.details);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.render("404");
    }

    cronDaemon.schedule("* * * * *", async () => {
      const now = new Date();

      if (isFirstRun) {
        const userEmail = req.session.isAuthenticated
          ? req.session.userEmail
          : req.session.passport.user;

        await processEvent(userEmail, professionalRole, cvFilePath);
        isFirstRun = false;
      } else if (
        !isFirstRun &&
        now.getDate() % 15 === 0 &&
        now.getHours() === 0 &&
        now.getMinutes() === 0
      ) {
        const userEmail = req.session.isAuthenticated
          ? req.session.userEmail
          : req.session.passport.user;

        await processEvent(userEmail, professionalRole, cvFilePath);
      }
    });

    // Respond to the client
    res.sendFile(path.join(__dirname, "..", "views/success.html"));
  });
};

module.exports = { runJobHome, runAppEngine };
