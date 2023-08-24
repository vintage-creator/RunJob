const Joi = require("joi");

const runJobSchema = Joi.object({
  professionalRole: Joi.string()
    .trim() // Trim whitespace from the input
    .valid("frontend", "backend", "cloud", "devops", "FRONTEND", "BACKEND", "CLOUD", "DEVOPS") // Validate allowed values
    .required(),
    applicationLetter: Joi.string().required(),
});

module.exports = runJobSchema;
