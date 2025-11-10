// utils/sendWhatsapp.js
const axios = require('axios');

async function sendWhatsapp(to, vehicleNumber, upcomingExpiries) {
  try {
    console.log("Send whatsapp triggered");
    
    const ph = to.replace(/^\+91/, '').replace(/\D/g, '');


    const expiryList = upcomingExpiries.join(', ');

    const res = await axios.get('https://bhashsms.com/api/sendmsgutil.php', {
      params: {
        user: 'white_circle',
        pass: '123456',
        sender: 'BUZWAP',
        phone: ph,
        text: 'vehicle_expiry_alert',
        priority: 'wa',
        stype: 'normal', 
        params: `${vehicleNumber},${expiryList}` // template placeholders {{1}}, {{2}}
      }
    });

    console.log("Phone:---",ph, "Params ->", `${vehicleNumber},${expiryList}`);
    console.log('API Response:', res.data);

  } catch (err) {
    console.error('Error sending WhatsApp:', err.message);
  }
}

module.exports = sendWhatsapp;
