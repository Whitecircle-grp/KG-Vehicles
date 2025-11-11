const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");


cron.schedule("44 19 * * *", async () => {
  await sendExpiryReminders();
});



