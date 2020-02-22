const Group = require('db/models/Group');

async function save(group) {
  const newGroup = new Group(group);
  const savedGroup = await newGroup.save();
  return savedGroup;
}

module.exports = {
  save,
};
