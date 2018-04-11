import { connect } from 'react-redux';

import { ListItem as ListItemComponent } from '../components/ListItem';
import { createMemoizedViewModel } from '../models/itemViewModel';

const mapStateToProps = ({ list }, { itemKey, bullet }) => ({
  item: createMemoizedViewModel(list.items
      .get(itemKey),
    bullet),
});

export const ListItem = connect(mapStateToProps)(ListItemComponent);
