const cron = require("node-cron");
const sendExpiryReminders = require("../utils/sendExpiryReminders");


cron.schedule("30 3 * * *", async () => {
  await sendExpiryReminders();
});



