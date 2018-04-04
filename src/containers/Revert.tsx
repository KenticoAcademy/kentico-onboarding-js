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
  revertDeleteAfterFailedUpdate,
  revertUpdate,
} from '../actions';
import { Guid } from '../models/Guid';
import { emptyAction } from '../constants/emptyAction';

interface IRevertContainerProps {
  readonly syncOperation: SyncOperation;
  readonly id: Guid;
}

const getRevertOperation = (operation: SyncOperation, id: Guid) => {
  switch (operation) {
    case SyncOperation.Modify:
      return revertUpdate(id);
    case SyncOperation.Delete:
      return revertDelete(id);
    case SyncOperation.DeleteAfterFailedModify:
      return revertDeleteAfterFailedUpdate(id);
    case SyncOperation.Add:
      return revertAdd(id);
    default:
      return emptyAction;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { syncOperation, id }: IRevertContainerProps): IRevertCallbackProps => ({
  revertAction: () => dispatch(getRevertOperation(syncOperation, id)),
});

export const Revert: ComponentClass<IRevertContainerProps> = connect(
  undefined,
  mapDispatchToProps,
)(RevertComponent);
