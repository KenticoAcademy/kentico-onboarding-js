import { connect } from 'react-redux';
import { UneditedListItem as UneditedListItemComponent } from '../components/UneditedListItem';
import {
  toggleEditing,
} from '../actions/actionCreators';

const mapStateToProps = (state, { itemId }) => ({
  itemText: state.itemsById.get(itemId).text,
});

const mapDispatchToProps = (dispatch, { itemId }) => ({
  toggleEditing: () => dispatch(toggleEditing(itemId)),
});

export const UneditedListItem = connect(mapStateToProps, mapDispatchToProps)(UneditedListItemComponent);
