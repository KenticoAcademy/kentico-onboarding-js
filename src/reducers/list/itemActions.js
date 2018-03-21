export const saveItem = (state) => state.merge({
  value: state.temporaryValue,
  isBeingEdited: false,
});
