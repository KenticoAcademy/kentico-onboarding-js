import { connect } from 'react-redux';
import { List } from '../components/List';
import { addNewItem } from '../actions';

const mapDispatchToProps = dispatch => ({
  onAddNewItem: text => {
    dispatch(addNewItem(
      text,
    ));
  },
});

const mapStateToProps = state => {
  return {
    list: state.list,
  };
};

export const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
