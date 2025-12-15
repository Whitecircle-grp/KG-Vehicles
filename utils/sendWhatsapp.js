const axios = require('axios');

async function sendWhatsapp(to, vehicleNumber, upcomingExpiries) {
  try {
    console.log("Send whatsapp triggered");

    const ph = to.replace(/^\+91/, '').replace(/\D/g, '');
    const expiryList = upcomingExpiries.join(' || ');

  //  const expiryList = upcomingExpiries.join('%0A');
    const url = `https://bhashsms.com/api/sendmsgutil.php?user=white_circle&pass=123456&sender=BUZWAP&phone=${ph}&text=vehicle_expiry_alert_hindi&priority=wa&stype=normal&params=${vehicleNumber},${expiryList}`;

    console.log("Final URL:", url);

    const res = await axios.get(url);
    console.log('API Response:', res.data);
  } catch (err) {
    console.error('Error sending WhatsApp:', err.message);
  }
}

module.exports = sendWhatsapp;
