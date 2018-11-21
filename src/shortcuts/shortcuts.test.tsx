import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { initialItems } from '../utils/store';
import { Board } from '../containers/Board';
import { app as reducer } from '../reducers/app';


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
    const store = createStore(reducer, initialItems);
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

  it('put text to input and press Enter', () => {
    putTextToInputForm(wrapper, uniqueInputText);
    const inputForm = wrapper.find('.form-control');

    console.log(wrapper.debug());
    inputForm.simulate('keypress', {
      key: 'Enter',
    });
    console.log(wrapper.debug());

    expect(wrapper.contains(uniqueInputText)).toBeTruthy();
  });
});
