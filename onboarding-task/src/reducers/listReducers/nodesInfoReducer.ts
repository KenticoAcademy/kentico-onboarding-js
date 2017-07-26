import { OrderedMap } from 'immutable';

import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { NodeInfo } from '../../models/NodeInfo';
import { IAction } from '../../actions/actionCreators';

export type INodesInfo = OrderedMap<string, NodeInfo>;

export const nodesInfoReducer = (state: INodesInfo = OrderedMap<string, NodeInfo>(), action: IAction): INodesInfo => {
  switch (action.type) {
    case ADD_NODE:
      return state.set(action.payload.id, new NodeInfo());
    case DELETE_NODE:
      return state.delete(action.payload.id);
    case TOGGLE_NODE: {
      return state.updateIn(
        [action.payload.id.toString(), 'isBeingEdited'],
        nodeBeingEdited => !nodeBeingEdited
      );
    }
    case SAVE_NODE:
      return state.updateIn(
        [action.payload.id, 'isBeingEdited'],
        () => false,
      );
    default:
      return state;
  }
};
