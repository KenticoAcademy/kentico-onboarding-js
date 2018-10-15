import {getItemButtonLabel} from './getItemButtonLabel';
import {Item} from '../models/Item';
import {Map} from 'immutable';
import {errorMessageTypes} from '../constants/errorMessageTypes';


describe('getItemButtonLabel', () => {
  it('returns correct string informing about modifying uploaded word when it failed to upload', () => {
    const item = new Item({errorMessages: Map<string, string>().set(errorMessageTypes.UPLOAD, "Unable to upload")});

    const result = getItemButtonLabel(item);

    expect(result).toBe('Modify the word you wanted to upload!');
  });

  it('returns correct string informing about not successful modification', () => {
    const item = new Item({errorMessages: Map<string, string>().set(errorMessageTypes.UPDATE, "Unable to delete")});

    const result = getItemButtonLabel(item);

    expect(result).toBe('Save the word again!');
  });

  it('returns correct neutral string when there is no error', () => {
    const item = new Item({errorMessages: Map<string, string>()});

    const result = getItemButtonLabel(item);

    expect(result).toBe('Save the word!');
  });
});
