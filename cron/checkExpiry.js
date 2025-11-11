const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("42 19 * * *", async () => {
  await sendExpiryReminders();
});


