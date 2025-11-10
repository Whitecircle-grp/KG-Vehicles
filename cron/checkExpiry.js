const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");

cron.schedule("0 6 * * *", async () => {
  await sendExpiryReminders();
});


