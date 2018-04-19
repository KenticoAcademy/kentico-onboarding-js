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
import { Uuid } from '../models/Uuid';

interface IRevertContainerProps {
  readonly syncOperation: SyncOperation;
  readonly id: Uuid;
}

const getRevertOperation = (operation: SyncOperation, id: Uuid) => {
  switch (operation) {
    case SyncOperation.Update:
      return revertUpdate(id);
    case SyncOperation.Delete:
      return revertDelete(id);
    case SyncOperation.DeleteAfterFailedUpdate:
      return revertDeleteAfterFailedUpdate(id);
    case SyncOperation.Add:
      return revertAdd(id);
    default:
      throw `Invalid sync operation: ${operation}`;
  }
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { syncOperation, id }: IRevertContainerProps): IRevertCallbackProps => ({
  revertAction: () => dispatch(getRevertOperation(syncOperation, id)),
});

export const Revert: ComponentClass<IRevertContainerProps> = connect(
  undefined,
  mapDispatchToProps,
)(RevertComponent);
