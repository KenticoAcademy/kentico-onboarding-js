import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store/AppState';
import {
  ViewItemDispatchProps,
  ViewItem,
  ViewItemOwnProps,
  ViewItemStateProps,
} from '../components/ViewItem';
import { toggleEdited } from '../actions/baseActions';


const mapStateToProps = (state: AppState, ownProps: ViewItemOwnProps): ViewItemStateProps => ({
  failedAction: state.failedActions.get(ownProps.item.id, undefined)
});

const mapDispatchToProps = (dispatch: ListDispatch, ownProps: ViewItemOwnProps): ViewItemDispatchProps => ({
  onItemClick: () => dispatch(toggleEdited(ownProps.item.id))
});

const ViewItemContainer: React.ComponentClass<ViewItemOwnProps> = connect(mapStateToProps, mapDispatchToProps)(ViewItem);
export { ViewItemContainer as ViewItem };

