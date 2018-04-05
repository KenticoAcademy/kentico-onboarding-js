import { connect, ComponentClass } from 'react-redux';

import {
  Error as ErrorComponent,
  IErrorProps,
} from '../components/Error';
import { IState } from '../store/IState';
import { Key } from '../@types/Key';

type IErrorComponentType = {
  itemKey: Key | undefined
};

const mapStateToProps = ({ list: { error }}: IState, { itemKey }: IErrorComponentType): IErrorProps => ({
  error: itemKey ? error.itemsError.get(itemKey) : error.globalError,
  itemKey,
});

export const Error: ComponentClass<IErrorComponentType> = connect(mapStateToProps)(ErrorComponent);
