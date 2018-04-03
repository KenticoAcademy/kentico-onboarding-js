import {
  connect,
  Dispatch,
} from 'react-redux';
import {
  IRevertCallbackProps,
  Revert as RevertComponent,
} from '../components/Revert';
import { IAppState } from '../models/state/IAppState';
import { ComponentClass } from 'react';
import { SyncOperation } from '../models/enums/SyncOperation';
import {
  revertAdd,
  revertDelete,
  revertDeleteAfterFailedModify,
  revertModify,
} from '../actions';
import { Guid } from '../models/Guid';

interface IRevertContainerProps {
  readonly syncOperation: SyncOperation;
  readonly id: Guid;
}

const getRevertOperation = (operation: SyncOperation, id: Guid) => {
  switch (operation) {
    case SyncOperation.Modify:
      return revertModify(id);
    case SyncOperation.Delete:
      return revertDelete(id);
    case SyncOperation.DeleteAfterFailedModify:
      return revertDeleteAfterFailedModify(id);
    case SyncOperation.Add:
      return revertAdd(id);
    default:
      return ({
        type: 'Empty',
        payload: undefined,
      });
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { syncOperation, id }: IRevertContainerProps): IRevertCallbackProps => ({
  revertAction: () =>
    dispatch(getRevertOperation(syncOperation, id)),
});

export const Revert: ComponentClass<IRevertContainerProps> = connect(
  undefined,
  mapDispatchToProps,
)(RevertComponent);