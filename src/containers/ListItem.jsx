import { connect } from 'react-redux';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { openItemForEditing } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onItemOpened: () => dispatch(openItemForEditing(
    ownProps.item.id,
  )),
});

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};

export const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItemComponent);
