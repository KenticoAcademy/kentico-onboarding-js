import * as React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { initialItems } from '../utils/store';
import { Provider } from 'react-redux';
import { Board } from '../containers/Board';

const mockStore = configureStore();
const store = mockStore(initialItems);

describe('shortcuts', () => {
  it('smoke test', () => {
    const wrapper = mount(<Provider store={store}><Board /></Provider>);

    const result = wrapper.find('.btn-default');

    expect(result).toHaveLength(1);
    expect(result.contains('Add')).toBeTruthy();
  });
});
