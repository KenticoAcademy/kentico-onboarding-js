import * as React from 'react';
import { StatelessComponent } from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { PulseLoader } from 'react-spinners';
import { ListItem } from '../containers/ListItem';
import { NewListItem } from '../containers/NewListItem';

export type ListStateProps = {
  readonly itemIds: Array<Guid>,
  readonly isLoading: boolean,
  readonly error: string,
};

type ListProps = ListStateProps;

const listPropTypes: ValidationMap<ListProps> = {
  itemIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export const List: StatelessComponent<ListProps> = ({ itemIds, isLoading, error }): JSX.Element => {
  const items: JSX.Element[] = itemIds.map((itemId: Guid, index: number) =>
    <ListItem key={itemId} order={index + 1} id={itemId} />,
  );

  return (
    <div className="row">
      <div className="row">
        {isLoading
          ? <div className="loader">
              <PulseLoader sizeUnit={'px'} size={15} color="#36D7B7"/>
            </div>
          : <div className="col-sm-12 col-md-offset-2 col-md-8">
              <pre>
                <ul className="list-group list-group-flush">
                  {items}
                </ul>
                <NewListItem />
              </pre>
            </div>
        }
        <p>{error}</p>
      </div>
    </div>
  );
};

List.displayName = 'List';
List.propTypes = listPropTypes;
