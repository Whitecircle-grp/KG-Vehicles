const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("0 7 * * *", async () => {
  await sendExpiryReminders();
});


