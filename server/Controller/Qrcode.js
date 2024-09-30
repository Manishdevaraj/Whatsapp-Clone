import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

// Load environment variables from .env file
dotenv.config();

const sessions = {};

export const qrcodegenerator=(req, res) => {
    const sessionId = uuidv4();
    const qrCodeData = `${process.env.URL}/authenticate/${sessionId}`;
  
    QRCode.toDataURL(qrCodeData, (err, url) => {
      if (err) return res.status(500).send('Error generating QR code');
      sessions[sessionId] = { authenticated: false };
      res.send({ sessionId, qrCodeUrl: url });
    });
}