import { DROP_ACTION } from "../types/dragTypes";

/*
 src/actions/simpleAction.js
*/
export const dragAction = item => ({
  type: DROP_ACTION,
  payload: item
});
