import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  ISyncedListItemFormCallbackProps,
  ISyncedListItemFormDataProps,
  ISyncedListItemFormProps,
  SyncedListItemForm,
  syncedListItemFormPropTypes
} from './SyncedListItemForm';

export interface IUnsyncedListItemFormDataProps extends ISyncedListItemFormDataProps {
  readonly description: string;
}

export interface IUnsyncedListItemFormCallbackProps extends ISyncedListItemFormCallbackProps {
  readonly retrySync: () => void;
}

interface IUnsyncedListItemFormProps extends IUnsyncedListItemFormCallbackProps, IUnsyncedListItemFormDataProps, ISyncedListItemFormProps {
}

export class UnsyncedListItemForm extends React.PureComponent<IUnsyncedListItemFormProps> {
  static displayName = 'UnsyncedListItemForm';

  static propTypes = {
    ...syncedListItemFormPropTypes,
    description: PropTypes.string.isRequired,
    retrySync: PropTypes.func.isRequired,
  };

  render() {
    const {
      description,
      retrySync,
      ...other
    } = this.props;

    return (
      <SyncedListItemForm
        { ...other }
        //  children={addition}
      />
    );
  }
}
