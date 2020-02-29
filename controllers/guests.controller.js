const asyncRoute = require('utils/asyncRoute');
const guestCore = require('core/guests.core');
const constant = require('common/constant');
const { UnknownActionError } = require('common/error');

const { GuestAction, GuestType } = constant;

const getGuestsByEventId = (asyncRoute(async (req, res) => {
  const { p, type } = req.query;
  let dataResponse = {};
  switch (type) {
    case GuestType.PENDING:
      dataResponse = await guestCore.findPendingGuestsByEventId(req.params.eventId, p);
      break;
    case GuestType.APPROVED:
      dataResponse = await guestCore.findApprovedGuestsByEventId(req.params.eventId, p);
      break;
    case GuestType.CHECKED:
      dataResponse = await guestCore.findCheckedInGuestsByEventId(req.params.eventId, p);
      break;
    default: dataResponse = await guestCore.findGuestsByEventId(req.params.eventId, p);
  }
  res.json({
    data: dataResponse,
  });
}));

const getGuestInfo = (asyncRoute(async (req, res) => {
  const dataResponse = await guestCore.findGuestById(req.params.guestId);
  res.json({
    data: dataResponse,
  });
}));

const createGuest = (asyncRoute(async (req, res) => {
  const dataResponse = await guestCore
    .saveNewGuestWithEventId(req.body.userId, req.params.eventId, req.body.guestInfo);
  res.json({
    data: dataResponse,
  });
}));

const updateGuest = (asyncRoute(async (req, res) => {
  const { action, ticketCode } = req.body;
  const { guestId } = req.params;
  let dataResponse = {};
  switch (action) {
    case GuestAction.VERIFY:
      dataResponse = await guestCore.updateVerifyGuestEmail(guestId);
      break;
    case GuestAction.APPROVE:
      dataResponse = await guestCore.updateApproveGuest(guestId);
      break;
    case GuestAction.CHECK_IN:
      dataResponse = await guestCore.updateCheckinGuest(ticketCode);
      break;
    default: throw new UnknownActionError();
  }

  res.json({
    data: dataResponse,
  });
}));

const checkTicket = (asyncRoute(async (req, res) => {
  const dataResponse = await guestCore.findGuestByCode(req.body.code);
  res.json({
    data: dataResponse,
  });
}));

module.exports = {
  getGuestsByEventId,
  getGuestInfo,
  createGuest,
  updateGuest,
  checkTicket,
};
