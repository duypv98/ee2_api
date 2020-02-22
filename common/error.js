/* eslint-disable max-classes-per-file */
class ServerAPIError extends Error {
  /**
   *
   * @param {Number} code
   * @param {String} message
   * @param {Object} data
   */
  constructor({ code, message, data }) {
    super();
    this.code = code;
    this.message = message;
    this.data = data || {};
    this.status = parseInt(code.toString().slice(0, 3), 10);
  }
}

class InvalidUsernameOrEmailError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40001,
      message: 'Invalid Username or Email',
      ...payload,
    });
  }
}

class InvalidPasswordError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40002,
      message: 'Invalid Password',
      ...payload,
    });
  }
}
class InvalidEmailFormatError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40003,
      message: 'Email is not valid',
      ...payload,
    });
  }
}

class UnknownActionError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40004,
      message: 'Unknown specified action',
      ...payload,
    });
  }
}

class InvalidBase64InputError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40005,
      message: 'Invalid base64 image',
      ...payload,
    });
  }
}

class UnauthorizedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40101,
      message: 'Unauthorized',
      ...payload,
    });
  }
}

class PermissionDeniedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40300,
      message: 'Permission Denied',
      ...payload,
    });
  }
}
class InvalidTokenError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40301,
      message: 'Fobbiden: Invalid Token',
      ...payload,
    });
  }
}

class TokenExpiredError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40302,
      message: 'Fobbiden: Token Expired',
      ...payload,
    });
  }
}

class UserNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40401,
      message: 'User Not Found',
      ...payload,
    });
  }
}

class PageNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40402,
      message: 'Page Not Found',
      ...payload,
    });
  }
}

class GuestNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40403,
      message: 'Guest Not Found',
      ...payload,
    });
  }
}

class EventNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40404,
      message: 'Event Not Found',
      ...payload,
    });
  }
}

class StaffNotFoundError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40405,
      message: 'Can\'t find this staff',
      ...payload,
    });
  }
}

class EmailVerifiedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40901,
      message: 'This email is already verified',
      ...payload,
    });
  }
}

class GuestExistedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40902,
      message: 'This email is already registered with this event',
      ...payload,
    });
  }
}

class TicketApprovedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40903,
      message: 'This ticket is already approved with this event',
      ...payload,
    });
  }
}

class TicketCheckedInError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40904,
      message: 'This ticket is already checked in with this event',
      ...payload,
    });
  }
}

class TakenUsernameError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40905,
      message: 'Username has been taken',
      ...payload,
    });
  }
}

class TakenEmailError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40906,
      message: 'Email has been taken',
      ...payload,
    });
  }
}

class StaffExistedError extends ServerAPIError {
  constructor({ ...payload }) {
    super({
      code: 40907,
      message: 'This staff is already registed to this event',
      ...payload,
    });
  }
}

module.exports = {
  // 400 Errors
  InvalidUsernameOrEmailError,
  InvalidPasswordError,
  InvalidEmailFormatError,
  UnknownActionError,
  InvalidBase64InputError,
  // 401 Errors
  UnauthorizedError,
  // 403 Errors
  PermissionDeniedError,
  InvalidTokenError,
  TokenExpiredError,
  // 404 Errors
  UserNotFoundError,
  PageNotFoundError,
  GuestNotFoundError,
  EventNotFoundError,
  StaffNotFoundError,
  // 409 Errors
  EmailVerifiedError,
  GuestExistedError,
  TicketApprovedError,
  TicketCheckedInError,
  TakenUsernameError,
  TakenEmailError,
  StaffExistedError,
}
