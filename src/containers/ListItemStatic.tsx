import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemStaticCallbackProps,
  ListItemStatic as ListItemStaticComponent
} from '../components/ListItemStatic';
import { Dispatch } from 'redux';
import { IAction } from '../models/interfaces/IAction';
import { openItem } from '../actions/thunk';
import { ListItem } from '../models/classes/ListItem';

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
  readonly item: ListItem;
}

interface IListItemStaticContainerCallbackProps {
  readonly onTextSelection: (startOffset: number, endOffset: number) => void;
}

interface IListItemStaticContainerProps extends IListItemStaticContainerCallbackProps, IListItemStaticContainerDataProps {}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemStaticContainerProps): IListItemStaticCallbackProps => ({
  onItemOpened: (uri: string) => openItem(
    uri,
    ownProps.item,
  )(dispatch),
});

const ListItemStatic: ComponentClass<IListItemStaticContainerProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = propTypes;

export { ListItemStatic };
