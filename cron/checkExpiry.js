const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");


cron.schedule("30 1 * * *", async () => {
  await sendExpiryReminders();
});



