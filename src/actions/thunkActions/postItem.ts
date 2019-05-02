import { postItemActionCreator } from '../thunkActionCreators/postItemActionCreator';
import { createUrl } from '../../utils/createUrl';

export const postItem = postItemActionCreator( {
  postToServer: (text: string) => fetch(createUrl(), postOptions(text)),
});

const postOptions = (text: string): RequestInit => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({text})
});
