import { DROP_ACTION, UPDATE_ITEM_ACTION } from "../types/dragTypes";

/*
 src/actions/simpleAction.js
*/
export const dragAction = item => ({
  type: DROP_ACTION,
  payload: item
});

export const updateItemAction = (id, value) => ({
  type: UPDATE_ITEM_ACTION,
  payload: { id, value }
});
