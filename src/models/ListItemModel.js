import { Record } from 'immutable';

const record = Record({
  id: '',
  text: '',
});

export const ListItemModel = ({ id, text }) => {
  return record({
    id,
    text,
  });
};
