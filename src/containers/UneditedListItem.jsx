import { connect } from 'react-redux';
import { UneditedListItem as UneditedListItemComponent } from '../components/UneditedListItem';
import {
  toggleEditing,
} from '../actions/actionCreators.ts';

const mapStateToProps = (state, { itemId }) => ({
  itemText: state.items.byId.get(itemId).text,
});

const mapDispatchToProps = (dispatch, { itemId }) => ({
  onTextClick: () => dispatch(toggleEditing(itemId)),
});

export const UneditedListItem = connect(mapStateToProps, mapDispatchToProps)(UneditedListItemComponent);
