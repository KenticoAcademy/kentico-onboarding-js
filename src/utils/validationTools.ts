import classNames from 'classnames';
import { isTextValid } from './isTextValid';

type ValidationTools = { tooltip: string, className: string };

export const createValidationTools = (text: string, isFocused: boolean): ValidationTools => {
  const tooltip = !isTextValid(text) ? 'You have to insert some text' : '';
  const className = classNames('form-group', {
    'has-success': isTextValid(text) && isFocused,
    'has-error': !isTextValid(text) && isFocused,
  });

  return {
    tooltip,
    className,
  };
};
