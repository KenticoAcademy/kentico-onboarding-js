import { IHasId } from '../models/interfaces/IHasId';
import { OrderedMap } from 'immutable';
import { Guid } from '../models/Guid';
import { IHasConstructor } from '../models/interfaces/IHasConstructor';

export const arrayToOrderedMap = <Item extends IHasId, TargetType>(items: Item[], TargetCreator: IHasConstructor<Item, TargetType>) =>
  OrderedMap<Guid, TargetType>(items.map(item =>
    [item.id, new TargetCreator(item)],
  ));
