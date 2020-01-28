import { DROP_ACTION, UPDATE_ITEM_ACTION } from "../types/dragTypes";

const initialState = {
  items: JSON.parse(localStorage.getItem("items")) || []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DROP_ACTION:
      const dragItems = [...state.items, { ...action.payload }];
      localStorage.setItem("items", JSON.stringify(dragItems));
      return {
        ...state,
        items: dragItems
      };
    case UPDATE_ITEM_ACTION:
      const { id, value } = action.payload;
      state.items[id]["value"] = value;
      localStorage.clear();
      localStorage.setItem("items", JSON.stringify(state.items));
      return {
        ...state,
        items: state.items
      };
    default:
      return state;
  }
};
