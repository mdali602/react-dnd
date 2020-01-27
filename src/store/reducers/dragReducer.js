import { DROP_ACTION } from "../types/dragTypes";

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
    default:
      return state;
  }
};
