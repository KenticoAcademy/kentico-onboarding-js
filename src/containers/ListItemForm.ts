import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IListItemFormDataProps,
  IListItemFormOwnProps,
  ListItemForm as ListItemFormComponent,
} from '../components/ListItemForm';
import { ComponentClass } from 'react';
import { IAppState } from '../models/state/IAppState';
import { Uuid } from '../models/Uuid';
import { listItemSharedPropTypes } from '../components/ListItem';

interface IListItemFormContainerProps extends IListItemFormOwnProps {
  readonly itemId: Uuid;
}

const propTypes = {
  ...listItemSharedPropTypes,
  itemId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ list }: IAppState, { itemId }: IListItemFormContainerProps): IListItemFormDataProps => ({
  item: list.items.get(itemId)
});

const ListItemForm: ComponentClass<IListItemFormContainerProps> = connect(
  mapStateToProps,
)(ListItemFormComponent);

ListItemForm.propTypes = propTypes;

export { ListItemForm };
