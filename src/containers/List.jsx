import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';

const mapStateToProps = (state) => ({
  items: state.items,
});

export const List = connect(mapStateToProps)(ListComponent);
