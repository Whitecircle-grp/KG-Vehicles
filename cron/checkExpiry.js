const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("58 0 * * *", async () => {
  await sendExpiryReminders();
});


