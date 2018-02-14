import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import {
  IListItemDataProps,
  ListItem as ListItemComponent,
} from '../components/ListItem';
import { IAppState } from '../models/state/IAppState';
import { Guid } from '../models/Guid';

const propTypes = {
  itemNumber: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
};

interface IListItemContainerDataProps {
  readonly itemNumber: number;
  readonly itemId: Guid;
}

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerDataProps): IListItemDataProps => ({
  item: state.list.items.get(ownProps.itemId),
});

const ListItem: ComponentClass<IListItemContainerDataProps> = connect(
  mapStateToProps,
)(ListItemComponent);

ListItem.propTypes = propTypes;

export { ListItem };
