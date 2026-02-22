const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: chromium.args,
    executablePath: async () => await chromium.executablePath(),
    headless: chromium.headless
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot está online!');
});

client.initialize();
