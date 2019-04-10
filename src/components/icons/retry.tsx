import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

library.add(faRedo);

export const Retry: React.StatelessComponent = (): JSX.Element => <FontAwesomeIcon icon="redo" />;
