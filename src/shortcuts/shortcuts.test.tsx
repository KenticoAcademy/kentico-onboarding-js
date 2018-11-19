import * as React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { initialItems } from '../utils/store';
import { Provider } from 'react-redux';
import { Board } from '../containers/Board';
import { createStore } from 'redux';
import { app as reducer } from '../reducers/app';

const mockStore = configureStore();
// const store = mockStore(initialItems);
const store = createStore(reducer, initialItems);

describe('shortcuts', () => {
  let wrapper: any;
  const uniqueInputText: string = 'hello, how are you?';

  const putTextToInputForm = (rootWrapper: any, inputText: string) => {
    const inputForm = rootWrapper.find('.form-control');
    inputForm.simulate('change', { target: { value: inputText } });

    expect(rootWrapper.find('.form-control[value="' + inputText + '"]').exists()).toBeTruthy();
    expect(rootWrapper.contains(inputText)).toBeFalsy();
    // the input text is now just value property of .form-control
  };

  beforeEach(() => {
    wrapper = mount(<Provider store={store}><Board /></Provider>);
  });

  it('smoke test', () => {
    const result = wrapper.find('.btn-default');

    expect(result.exists()).toBeTruthy();
    expect(result.contains('Add')).toBeTruthy();
  });

  it('put text to input and press button Add', () => {
    putTextToInputForm(wrapper, uniqueInputText);
    const buttonAdd = wrapper.find('.btn-default');
    expect(buttonAdd.exists()).toBeTruthy();
    expect(buttonAdd.contains('Add')).toBeTruthy();

    buttonAdd.simulate('click');

    expect(wrapper.contains(uniqueInputText)).toBeTruthy();
  });
});
