const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("50 0 * * *", async () => {
  await sendExpiryReminders();
});


