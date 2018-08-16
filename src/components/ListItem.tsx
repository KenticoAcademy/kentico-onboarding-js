import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem';
import { UneditedListItem } from '../containers/UneditedListItem';
import { ItemId } from '../models/ItemId';
import { IAction } from '../actions/IAction';
import {
  Map,
} from 'immutable';

export interface IListItemDataProps {
  text: string;
  textUpdate: string;
  id: ItemId;
  isBeingEdited: boolean;
  synchronized: boolean;
  index: number;
  errorMessages: Map<string, string>;
  isBeingDeleted: boolean;
}

export interface IListItemCallbackProps {
  onDivClick: React.MouseEventHandler<HTMLDivElement>;
  onThrowAway: () => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
  onUploadAgain: (text: string) => Promise<IAction>;
  onRecover: () => IAction;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps>  = (
  { id, isBeingEdited, index, synchronized, errorMessages, isBeingDeleted, onDivClick, onSaveAgain, onThrowAway, textUpdate, onRecover, onUploadAgain, text}) => {

  const className = 'list-group-item form-inline'
    + (!synchronized && errorMessages.size === 0 ? ' synchronizing' : '')
    + (errorMessages.size === 0 ? '' : ' alert-danger')
    + (!isBeingDeleted ? '' : ' being-deleted');

  function _onDoItAgain (e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    errorMessages.keySeq().contains('UPLOAD') ?
      textUpdate ?  onUploadAgain(textUpdate) : onUploadAgain(text)
       : onSaveAgain(textUpdate);
  }

  function _onThrowAay (e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onThrowAway();
  }

  return(
    <div
      className={className}
      key={id}
      onClick={!isBeingEdited && !isBeingDeleted ? onDivClick : undefined}
    >
      {index + 1}
      .&nbsp;

      {isBeingEdited ?
      <EditedListItem
        itemId={id}
      /> :
      <UneditedListItem
        itemId={id}
      />}
      <div
        data-balloon={'Let this shark eat this item'}
        data-balloon-pos="up"
        className="uneditedItemMessage"
        onClick={_onThrowAay}>
        🦈
      </div>
      {errorMessages.size !== 0 && !isBeingEdited && !isBeingDeleted ? <div
        data-balloon={'Try again'}
        data-balloon-pos="up"
        className="uneditedItemMessage"
        onClick={_onDoItAgain}>
        ↺
        &nbsp;&nbsp;&nbsp;
      </div> : isBeingDeleted && synchronized ? <div
        data-balloon={'Recover item'}
        data-balloon-pos="up"
        className="uneditedItemMessage"
        onClick={onRecover}>
        ♻
        &nbsp;&nbsp;&nbsp;
        </div> : (null)
      }
      </div>);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  textUpdate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  synchronized: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  errorMessages: PropTypes.object,
  isBeingDeleted: PropTypes.bool.isRequired,
  onDivClick: PropTypes.func.isRequired,
  onSaveAgain: PropTypes.func.isRequired,
  onThrowAway: PropTypes.func.isRequired,
  onRecover: PropTypes.func.isRequired,
};

export { ListItem };
