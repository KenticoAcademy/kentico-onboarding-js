import { IHasId } from '../models/interfaces/IHasId';
import { OrderedMap } from 'immutable';
import { Uuid } from '../models/Uuid';
import { IHasConstructorWithParams } from '../models/interfaces/IHasConstructorWithParams';
import moize from 'moize';

const _arrayToOrderedMap = <TItem extends IHasId, TTargetType>(items: TItem[], TargetCreator: IHasConstructorWithParams<TItem, TTargetType>) =>
  OrderedMap<Uuid, TTargetType>(items.map(item =>
    [item.id, new TargetCreator(item)],
  ));

export const arrayToOrderedMap = moize(_arrayToOrderedMap) as typeof _arrayToOrderedMap;
