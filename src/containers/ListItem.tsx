import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { IListItemDataProps, ListItem as ListItemComponent } from '../components/ListItem';
import { IAppState } from '../models/IAppState';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
};

interface IListItemContainerDataProps {
  itemNumber: number;
  itemId: string;
}

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerDataProps): IListItemDataProps => ({
  item: state.list.items.get(ownProps.itemId),
});

const ListItem = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = propTypes;

export { ListItem };
