import { nodesReducer } from './nodesReducer';
import { nodesInfoReducer } from './nodesInfoReducer';
import { nodesIdsReducer } from './nodesIdsReducer';
import { INodesList } from './NodesList';
import { IAction } from '../../actions/actionCreators';

export const nodesListReducer = (state: INodesList = {} as INodesList, action: IAction): INodesList => ({
  nodes: nodesReducer(state.nodes, action),
  nodesInfo: nodesInfoReducer(state.nodesInfo, action),
  nodesIds: nodesIdsReducer(state.nodesIds, action),
});
