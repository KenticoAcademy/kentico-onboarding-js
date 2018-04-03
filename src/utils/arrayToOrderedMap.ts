import { IHasId } from '../models/interfaces/IHasId';
import { OrderedMap } from 'immutable';
import { Guid } from '../models/Guid';
import { IHasConstructor } from '../models/interfaces/IHasConstructor';

export const arrayToOrderedMap = <TItem extends IHasId, TTargetType>(items: TItem[], TargetCreator: IHasConstructor<TItem, TTargetType>) =>
  OrderedMap<Guid, TTargetType>(items.map(item =>
    [item.id, new TargetCreator(item)],
  ));
