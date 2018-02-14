import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemStaticCallbackProps,
  ListItemStatic as ListItemStaticComponent,
} from '../components/ListItemStatic';
import { Dispatch } from 'redux';
import { IListItem } from '../models/interfaces/IListItem';
import { changeItemOpenState } from '../actions';
import { IAction } from '../models/interfaces/IAction';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
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

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { item: { id } }: IListItemStaticContainerProps): IListItemStaticCallbackProps => ({
  onItemOpened: () =>
    dispatch(
      changeItemOpenState(id)),
});

const ListItemStatic: ComponentClass<IListItemStaticContainerProps> = connect(
  null,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = propTypes;

export { ListItemStatic };
