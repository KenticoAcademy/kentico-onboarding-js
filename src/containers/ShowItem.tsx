import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import { ShowItem as ShowItemComponent } from '../components/ShowItem';

const mapStateToProps = (state: IState, { id }: {id: string}) => ({
  text: state.items.get(id).text,
});

export const ShowItem = connect(
  mapStateToProps,
)(ShowItemComponent);
