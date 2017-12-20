import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { IAppState } from '../interfaces/IAppState';
import { ListItemClass } from '../models/ListItem';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
};

interface IListItemContainerDataProps {
  itemNumber: number;
  itemId: string;
}

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerDataProps) => ({
  item: new ListItemClass(state.list.items.get(ownProps.itemId).toJS()),
});

const ListItem = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = propTypes;

export { ListItem };
