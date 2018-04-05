import { IHasId } from '../models/interfaces/IHasId';
import { OrderedMap } from 'immutable';
import { Uuid } from '../models/Uuid';
import { IHasConstructor } from '../models/interfaces/IHasConstructor';

export const arrayToOrderedMap = <TItem extends IHasId, TTargetType>(items: TItem[], TargetCreator: IHasConstructor<TItem, TTargetType>) =>
  OrderedMap<Uuid, TTargetType>(items.map(item =>
    [item.id, new TargetCreator(item)],
  ));
