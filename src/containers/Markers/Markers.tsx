import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IMarkersDataProps,
  Markers as MarkersComponent
} from '../../components/Markers/Markers';
import { IAppState } from '../../reducers/IAppState';
import { ItemId } from '../../models/ItemId';

export interface IMarkersContainerProps {
  id: ItemId;
}

const mapStateToProps = (state: IAppState, {id}: IMarkersContainerProps): IMarkersDataProps => ({
  item: state.items.byId.get(id),
});

export const Markers: ComponentClass<IMarkersContainerProps> = connect(mapStateToProps)(MarkersComponent);
