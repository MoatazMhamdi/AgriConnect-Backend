import twilio from 'twilio';

export function sendSMS(receiver, content) {
  const accountSid = 'AC9d4b7d841fb0a5618ea1a79695c8867f'; // Replace with your Account SID
  const authToken = '740b5769d3d72229cdf4ccce6dccdafe'; // Replace with your Auth Token
  const twilioPhoneNumber = '+12057404893'; // Replace with your Twilio phone number

  const client = twilio(accountSid, authToken);

  // Ensure the phone number is in the E.164 format
  const phoneNumberE164 = `+216${receiver}`;

  // Use Twilio to send the SMS
  client.messages
    .create({
      body: content,
      to: phoneNumberE164,
      from: twilioPhoneNumber,
    })
    .then(async (message) => {
      console.log(`SMS sent to ${receiver}`);
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
    });
}
