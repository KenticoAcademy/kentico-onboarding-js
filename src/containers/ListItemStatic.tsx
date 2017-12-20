import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListItemStatic as ListItemStaticComponent } from '../components/ListItemStatic';
import { openItemForEditing } from '../actions';
import { Dispatch } from 'redux';
import { IAction } from '../interfaces/IAction';
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
  itemNumber: number;
  item: IListItem;
}

interface IListItemStaticContainerCallbackProps {
  onTextSelection: (startOffset: number, endOffset: number) => void;
}

interface IListItemStaticContainerProps extends IListItemStaticContainerCallbackProps, IListItemStaticContainerDataProps {}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IListItemStaticContainerProps) => ({
  onItemOpened: () => dispatch(openItemForEditing(
    ownProps.item.id,
  )),
});

const ListItemStatic = connect(
  null,
  mapDispatchToProps,
)(ListItemStaticComponent);

ListItemStatic.propTypes = propTypes;

export { ListItemStatic };
