import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { Items } from '../containers/Items';
import { NewItemForm } from '../containers/NewItemForm';
import { FetchItemsState } from '../models/FetchItemsState';
import * as PropTypes from 'prop-types';
import { IAction } from '../models/IAction';
import { Loader } from './Loader';
import { IMessage } from '../models/IMessage';
import { AllMessageTypes, MessageType } from '../constants/MessageType';
import { Success } from './Success';
import { Error } from './Error';

export interface IListDataProps {
  readonly fetchItemsState: FetchItemsState;
  readonly message: IMessage;
}

export interface IListCallbackProps {
  readonly fetchItems: (uri: string) => IAction;
}

interface IListProps extends  IListDataProps, IListCallbackProps {}

export class List extends React.PureComponent<IListProps> {
  static displayName = 'List';

  static propTypes = {
    fetchItemsState: PropTypes.number.isRequired,
    fetchItems: PropTypes.func.isRequired,
    message: PropTypes.shape({
      content: PropTypes.string.isRequired,
      type: PropTypes.oneOf(AllMessageTypes)
    }),
  };

  componentDidMount() {
    this.props.fetchItems('/api/v1/listItems');
  }

  render() {
    const { message: { content, type } } = this.props;

    let messageComponent;

    switch (type) {
      case MessageType.Error:
        messageComponent = <Error message={content} showRetry={true} />;
        break;

      case MessageType.Success:
        messageComponent = <Success message={content} />;
        break;

      default:
        break;
    }

    let component;

    switch (this.props.fetchItemsState) {
      case FetchItemsState.REQUESTED:
        component = <Loader />;
        break;

      case FetchItemsState.RECEIVED:
        component = <HotKeys keyMap={keyMap}>
          <ol className="list-group">
            <Items />

            <li className="list-group-item">
              <NewItemForm />
            </li>
          </ol>
        </HotKeys>;
        break;

      case FetchItemsState.FAILED:
      default:
        break;
    }

    return (
      <div>
        {messageComponent}
        {component}
      </div>
    );
  }
}
