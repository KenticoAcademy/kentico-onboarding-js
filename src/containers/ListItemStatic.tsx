import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemStaticCallbackProps,
  ListItemStatic as ListItemStaticComponent
} from '../components/ListItemStatic';
import { openItemForEditing } from '../actions';
import { Dispatch } from 'redux';
import { IAction } from '../models/IAction';
import { IListItem } from '../models/IListItem';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  onTextSelection: PropTypes.func.isRequired,
};

interface IListItemStaticContainerDataProps {
  readonly itemNumber: number;
  readonly item: IListItem;
}

interface IListItemStaticContainerCallbackProps {
  readonly onTextSelection: (startOffset: number, endOffset: number) => void;
}

interface IListItemStaticContainerProps extends IListItemStaticContainerCallbackProps, IListItemStaticContainerDataProps {}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemStaticContainerProps): IListItemStaticCallbackProps => ({
  onItemOpened: () => dispatch(openItemForEditing(
    ownProps.item.id,
  )),
});

const ListItemStatic: ComponentClass<IListItemStaticContainerProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = propTypes;

export { ListItemStatic };
