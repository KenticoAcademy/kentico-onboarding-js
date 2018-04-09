import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IItemDataProps, Item } from '../../../components/todo-list/item/Item';
import { IAppState } from '../../../models/IAppState';
import { getIndexedItem } from '../../../selectors/getIndexedItem';
import { Uuid } from '../../../utils/generateId';

interface IProps {
  readonly id: Uuid;
  readonly index: number;
}

const mapStateToProps = (state: IAppState, { id, index }: IProps): IItemDataProps => ({
  item: getIndexedItem(state, index, id),
});

const connectedComponent = connect(mapStateToProps)(Item);

connectedComponent.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export { connectedComponent as Item };
