const app = require("./app");
const env = require("./config/env");
const { startMissedReadingJob } = require("./jobs/missedReadings.job");

app.listen(env.port, () => {
  console.log(`VidaCare backend listening on http://localhost:${env.port} [${env.nodeEnv}]`);
  startMissedReadingJob();
});
