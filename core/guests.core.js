import constant from 'common/constant';
import guestODM from 'db/odm/guest.odm';
import userODM from 'db/odm/user.odm';
import eventODM from 'db/odm/event.odm';
import { Types } from 'mongoose';
import pagination from 'utils/pagination';
import eventCore from 'core/events.core';
import {
  EventNotFoundError, GuestExistedError, GuestNotFoundError,
  EmailVerifiedError, TicketApprovedError, TicketCheckedInError, UnknownActionError,
} from 'common/error';
import uuid from 'utils/uuid';
import { VerifyGuestEmail, TicketEmail } from 'common/mail';
import mailgun from 'services/mailgun';
import QRCode from 'utils/QRCode';

const { ItemsPerPage, GuestAction } = constant;

/**
 *
 * @param {String} eventId
 * @param {Number} page
 */
async function findGuestsByEventId(eventId, page) {
  const totalGuests = await guestODM.countByEventId(eventId);
  const paginatedObject = pagination
    .getPaginatedObject(totalGuests, ItemsPerPage.GUESTS_LIST, page);
  const { offset, limit, ...paginationInfo } = paginatedObject;
  const listGuests = await guestODM.findByEventId(eventId, offset, limit);
  return {
    ...paginationInfo,
    listItems: listGuests,
  };
}

/**
 *
 * @param {String} guestId
 */
async function findGuestById(guestId) {
  const guest = await guestODM.findById(guestId);
  return guest;
}

/**
 *
 * @param {String} userId
 * @param {String} eventId
 * @param {Object} guestInfo
 */
async function saveNewGuestWithEventId(userId, eventId, guestInfo) {
  const {
    email, phoneNumber, gender, major, something,
  } = guestInfo;

  const event = await eventCore.findEventDetails(eventId);
  if (!event) {
    throw new EventNotFoundError();
  }

  const exGuest = await guestODM.findByEventIdAndEmail(eventId, email);
  if (exGuest) {
    throw new GuestExistedError({ data: exGuest });
  }

  let emailVerified = false;
  const verifiedUser = await userODM.findByVerifiedEmail(email);
  emailVerified = !!(verifiedUser);

  const newGuest = {
    event: Types.ObjectId(eventId),
    email,
    user: (userId) ? Types.ObjectId(userId) : null,
    info: {
      phone_number: phoneNumber,
      gender,
      major,
      something,
    },
    status: {
      email_verified: emailVerified,
      ticket_approved: false,
    },
    ticket: {
      code: null,
      issue_at: null,
      checkin_at: null,
    },
  };

  if (!emailVerified) {
    const verifyEmail = new VerifyGuestEmail({
      to: `${newGuest.email}`,
      html: `Xin chào ${newGuest.email} <br/>
      Bạn đã đăng ký tham gia sự kiện ${event.name}. <br/>
      Chúng tôi cần bạn xác nhận lại email. Vui lòng ấn vào đường dẫn sau để xác nhận: <br/>
      <a href="#">link</a><br/>
      Chúng tôi sẽ gửi thông tin vé sớm nhất cho bạn`,
    });

    mailgun.send(verifyEmail);
  }

  const savedGuest = await guestODM.save(newGuest);
  return {
    savedGuest,
  };
}

async function sendTicketMail(guest, event, ticketCode) {
  const dataImage = await QRCode.generateBase64Buffer(ticketCode);

  const ticketMail = new TicketEmail({
    to: `${guest.email}`,
    html: `Xin chào ${guest.email}, lại là Easy Event đây !<br/>
    Sau đây là vé dành cho sự kiện ${event.name} <br/>
    <ul>
      <li>Email: ${guest.email}</li>
      <li>Gender: ${guest.info.gender}</li>
    </ul>
    <br/>
    Bạn hãy vui lòng sử dụng mã QR Code trong file đính kèm để check in tại sự kiện nhé !`,
    attachment: new mailgun.default.Attachment({ data: dataImage, filename: 'ticket.png' }),
  });
  await mailgun.send(ticketMail);
}

/**
 *
 * @param {String} guestId
 * @param {String} action
 */
async function updateGuest(guestId, action) {
  const guest = await guestODM.findById(guestId);
  if (!guest) {
    throw new GuestNotFoundError();
  }
  const event = await eventODM.findById(guest.get('event'));
  let updates = {};
  let ticketCode = null;
  switch (action) {
    case GuestAction.VERIFY:
      if (guest.get('status.email_verified')) {
        throw new EmailVerifiedError();
      }
      updates = {
        'status.email_verified': true,
      };
      break;

    case GuestAction.APPROVE:
      if (guest.get('status.ticket_approve')) {
        throw new TicketApprovedError();
      }

      ticketCode = uuid.generateFromString(guestId);
      updates = {
        'status.ticket_approved': true,
        'ticket.code': ticketCode,
        'ticket.issue_at': Date.now(),
      };
      sendTicketMail(guest, event, ticketCode);
      break;

    case GuestAction.CHECK_IN:
      if (guest.ticket.checkin_at !== null) {
        throw new TicketCheckedInError();
      }
      updates = {
        'ticket.checkin_at': Date.now(),
      };
      break;

    default: throw new UnknownActionError({ accepted: ['verify', 'approve', 'checkin'] });
  }
  const updatedGuest = await guestODM.update(guestId, updates);
  return {
    updatedGuest,
  };
}

async function findGuestByCode(code) {
  const guest = await guestODM.findByCode(code);
  return guest;
}

export default {
  findGuestsByEventId,
  findGuestById,
  saveNewGuestWithEventId,
  updateGuest,
  findGuestByCode,
};
