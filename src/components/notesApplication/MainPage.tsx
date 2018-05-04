import * as React from 'react';
import { ErrorPage } from '../../containers-redux/errorPage/ErrorPage';
import { Loader } from '../loader/Loader';
import { List } from '../../containers-redux/notesApplication/List';

export interface IMainPageDataProps {
  readonly isLoading: boolean;
  readonly errorId?: Guid;
}

const NotesMainPage: React.StatelessComponent<IMainPageDataProps> = (props: IMainPageDataProps): JSX.Element | null => {
  switch (props.isLoading) {
    case true:
      return <Loader message="Notes are loading from server. Please wait." />;

    case false:
      if (props.errorId) {
        return <ErrorPage errorMessage="Error while retrieving data from server. Please try again later." />;
      } else {
        return <List />;
      }

    default:
      return null;
  }
};

NotesMainPage.displayName = 'NotesMainPage';

export { NotesMainPage };
