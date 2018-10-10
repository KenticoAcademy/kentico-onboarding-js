import classNames from 'classnames';

export const createTooltip = (isItemTextValid) => {
  return !isItemTextValid ? 'You have to insert some text' : '';
};

export const createClassNamesFormValidation = (isItemTextValid, isItemFocused) =>
  classNames('form-group', {
    'has-success': isItemTextValid && isItemFocused,
    'has-error': !isItemTextValid && isItemFocused
  });
