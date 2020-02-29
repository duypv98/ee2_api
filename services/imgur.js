const imgur = require('imgur');
const configs = require('configs');
const base64 = require('utils/base64');
const { InvalidBase64InputError } = require('common/error');

class _ImgurService {
  constructor() {
    imgur.setClientId(configs.IMGUR_CLIENT_ID);
    imgur.setAPIUrl(configs.IMGUR_API_URL);
    this.api = imgur;
  }

  async uploadFromBase64(base64Url) {
    const base64String = base64.generateFromURL(base64Url);
    try {
      const response = await this.api.uploadBase64(base64String);
      return response.data;
    } catch (error) {
      throw new InvalidBase64InputError();
    }
  }
}

const ImgurService = new _ImgurService();

module.exports = ImgurService;
