import {
  List,
  Map
} from 'immutable';
import { IListItemData } from './models/ListItemData';
import { IListItemFlags } from './models/ListItemFlag';

/**
 * Action generated by user
 */
export interface IAction {
  /** Type of action */
  type: string;
  /** Data passed with action */
  payload: any;
}

/**
 * Merged Item data with Flags
 */
export interface IItemViewModel {
  /** Guid of item */
  guid: string;
  /** Value held by item */
  value: string;
  /** Shows whether item is opened for editation */
  isBeingEdited: boolean;
}

/* Stores */

/**
 * Holds all stores used in application
 */
export namespace Store {
  export interface IRoot {
    items: IItems;
  }

  export interface IItems {
    ids: IIds;
    data: IData;
    flags: IFlags;
  }

  export type IIds = List<string>;
  export type IData = Map<string, IListItemData>;
  export type IFlags = Map<string, IListItemFlags>;
}

/* Reducers */

/**
 * Represents a generic reducer
 * @param state - state of reducer that is handled and returned
 * @param action - action to be executed
 */
export interface IReducer<T> {
  (state: T, action: IAction): T;
}

/**
 * Holds all reducers used in application
 */
export namespace Reducer {
  export type Root = IReducer<Store.IRoot>;
  export type Items = IReducer<Store.IItems>;
  export type Ids = IReducer<Store.IIds>;
  export type Data = IReducer<Store.IData>;
  export type Flags = IReducer<Store.IFlags>;
}
