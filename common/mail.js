const constant = require('common/constant');
const MailgunService = require('services/mailgun');

const { Email, EmailSubject } = constant;

class Mail {
  /**
   *
   * @param {Object}
   *
   */
  constructor({
    subject, to, html, attachment,
  }) {
    this.data = {
      from: `${Email.NAME} <${Email.ADDRESS}>`,
      subject,
      to,
      html,
      attachment: attachment || {},
    };
  }

  send() {
    return MailgunService.send(this.data);
  }
}

class VerifyUserEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: `${EmailSubject.VERIFY_USER}`,
      ...info,
    });
  }
}

class VerifyGuestEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: `${EmailSubject.VERIFY_GUEST}`,
      ...info,
    });
  }
}

class TicketEmail extends Mail {
  constructor({ ...info }) {
    super({
      subject: `${EmailSubject.TICKET_INFO}`,
      ...info,
    });
  }
}

module.exports = {
  VerifyUserEmail,
  VerifyGuestEmail,
  TicketEmail,
}
