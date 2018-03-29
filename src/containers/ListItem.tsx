import { connect } from 'react-redux';

import {
  IListItemStateProps,
  ListItem as ListItemComponent,
} from '../components/ListItem';
import { createMemoizedViewModel } from '../models/ItemViewModel';
import { IState } from '../store/IState';
import { key } from '../@types/key';

interface IOwnProps {
  readonly itemKey: key;
  readonly bullet: string;
}

const mapStateToProps =
  ({ list: { items }}: IState, { itemKey, bullet }: IOwnProps): IListItemStateProps => ({
    item: createMemoizedViewModel(items.get(itemKey), bullet),
  });

export const ListItem = connect(mapStateToProps)(ListItemComponent);
