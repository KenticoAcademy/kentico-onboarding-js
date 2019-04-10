import { IStore } from '../../store/types/IStore';
import { ThunkDispatch } from 'redux-thunk';
import { IListAction } from './IListAction';

export type Dispatch = ThunkDispatch<IStore, undefined, IListAction>;
