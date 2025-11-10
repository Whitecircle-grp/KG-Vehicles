const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("41 23 * * *", async () => {
  await sendExpiryReminders();
});



