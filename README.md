<h1>RunJob</h1>

<h2>Description</h2>
<p>RunJob is an automated job scraping and application tool designed to simplify the process of job searching and
  application submission. This project aims to streamline the job hunting process by scraping job listings from various
  websites, extracting relevant information, and sending tailored job applications via email. It's a powerful solution
  that automates the repetitive tasks of searching for job opportunities and submitting applications.</p>

<h2>Prerequisites</h2>
<p>Before you begin, ensure that you have the following dependencies installed on your machine:</p>
<ul>
  <li>Node.js (version 16.14.2 or higher)</li>
  <li>npm (Node Package Manager, included with Node.js)</li>
</ul>

<h2>Installation</h2>
<h3>Step 1:</h3>
<p>Clone the repository to your local machine:</p>
<pre><code>git clone git@github.com:vintage-creator/runjob.git</code></pre>

<h3>Step 2:</h3>
<p>Navigate to the project directory:</p>
<pre><code>cd runjob</code></pre>

<h3>Step 3:</h3>
<p>Install the required dependencies using npm:</p>
<pre><code>npm install</code></pre>
<p>This will install the necessary packages including:</p>
<ul>
  <li>puppeteer: Headless browser automation library for web scraping</li>
  <li>nodemailer: Module for sending emails using Node.js</li>
</ul>

<h3>Step 4:</h3>
<p>Configuration:<br>
  Update the configuration files according to your environment and requirements.</p>

<h3>Step 5:</h3>
<p>Start the application:</p>
<pre><code>npm start</code></pre>
<p>This will start the RunJob application and you will see the scraping and email sending processes in action.</p>

<p>Congratulations! You have successfully set up and started RunJob. It's now ready to efficiently scrape job listings,
  extract relevant information, and send automated job applications. Happy job hunting!</p>

<h2>Running the Server</h2>
<p>To run the server, execute the following command:</p>
<pre><code>node server.js</code></pre>
<p>The server will start on port 5000 by default. You can access the application by opening your browser and navigating
  to <a href="http://localhost:5000/runjob/home">RunJob</a>.</p>

<h2>Usage</h2>
<p>Customize the scraping logic, modify CV templates, and configure email settings according to your needs in the provided
  code snippets. Run the application to automate the job search and application process.</p>

<h2>Notes</h2>
<p>Please note that the project has undergone significant improvements, especially in the Dockerization process, to enhance
  deployment and scalability. It is currently in beta and undergoing active development. As such, it's important to exercise caution
  while using it in a production environment. Additionally, web scraping and automated email sending should be conducted
  ethically and responsibly, in strict adherence to website terms of use and policies. Ensure that you comply with all
  applicable laws and regulations related to data usage, privacy, and email communication.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="https://github.com/vintage-creator/runjob/blob/main/LICENSE">LICENSE</a> file for details.</p>
