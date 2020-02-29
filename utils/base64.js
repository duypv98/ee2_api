const qrcode = require('qrcode');
const base64 = require('utils/base64');

async function getBufferFromObject(obj) {
  const base64Url = await qrcode.toDataURL(JSON.stringify(obj));
  return Buffer.from(base64.generateFromURL(base64Url), 'base64');
}

function generateFromURL(base64Url) {
  const b64BasePos = base64Url.indexOf('base64,');
  if (b64BasePos !== -1) {
    return base64Url.substr(b64BasePos + 7);
  }
  return '';
}

module.exports = {
  getBufferFromObject,
  generateFromURL
};
