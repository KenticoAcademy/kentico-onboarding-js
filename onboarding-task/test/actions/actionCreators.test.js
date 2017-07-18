import * as actions from '../../src/actions/actionCreators';
import * as types from '../../src/actions/actionTypes';
import { generateId } from '../../src/utils/generateId';
import { addNodeFactory } from '../../src/actions/addNodeFactory';

const generateNewId = () => '80149842-a624-b66b-5d3c-37c24523ba46';
const addNode = addNodeFactory(generateNewId);

describe('actionCreators', () => {
  describe('addNode', () => {
    it('returns a correct new action', () => {
      const text = 'New action test';
      const expectedAction = {
        type: types.ADD_NODE,
        payload: {
          id: '80149842-a624-b66b-5d3c-37c24523ba46',
          text,
        },
      };
      expect(addNode(text)).toEqual(expectedAction);
    });
  });

  describe('toggleNode', () => {
    it('returns a correct new action', () => {
      const id = generateId();
      const expectedAction = {
        type: types.TOGGLE_NODE,
        payload: {
          id,
        },
      };
      expect(actions.toggleNode(id)).toEqual(expectedAction);
    });
  });

  describe('saveNode', () => {
    it('returns a correct new action', () => {
      const id = generateId();
      const text = 'random text';
      const expectedAction = {
        type: types.SAVE_NODE,
        payload: {
          id,
          text,
        },
      };
      expect(actions.saveNode(id, text)).toEqual(expectedAction);
    });
  });

  describe('deleteNode', () => {
    it('returns a correct new action', () => {
      const id = generateId();
      const expectedAction = {
        type: types.DELETE_NODE,
        payload: {
          id,
        },
      };
      expect(actions.deleteNode(id)).toEqual(expectedAction);
    });
  });
});
