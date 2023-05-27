import { createSlice } from "@reduxjs/toolkit";

// {
//   categories: [
//     {
//       name: "category 1",
//       fields: [{ name: "modal", type: "number" }],
//       machines: [{ id: "123", modal: "modal 1" }],
//     },
//   ];
// }

// Defining type of state.
interface Field {
  name: string;
  type: string;
}

interface Machine {
  id: string;
  [key: string]: any;
}

interface Category {
  name: string;
  fields: Array<Field>;
  machines: Array<Machine>;
}

interface Machines {
  categories: Array<Category>;
}

const initialState: Machines = {
  categories: [],
};

// Creating state slice.
const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.name !== action.payload
      );
    },
  },
});

export const { addCategory } = machineSlice.actions;

export default machineSlice.reducer;
