const qrcode = require('qrcode');
const { getBase64String } = require('utils/base64');

async function generateBase64Buffer(obj) {
  const objString = JSON.stringify(obj);
  let base64String = await qrcode.toDataURL(objString);
  base64String = getBase64String(base64String);

  const dataImage = Buffer.from(base64String, 'base64');
  return dataImage;
}

module.exports = {
  generateBase64Buffer,
};
