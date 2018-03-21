export const saveItem = (state) => state.merge({
  value: state.temporaryValue,
  isBeingEdited: false,
});

export const cancelItemEditing = (state) => state.merge({
  temporaryValue: state.value,
  isBeingEdited: false,
});
