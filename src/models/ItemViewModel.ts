import mem from 'mem';

const getViewModel = (itemValues, bullet) => ({
  ...itemValues.toJS(),
  bullet,
});

export const createMemoizedViewModel = mem(getViewModel);
