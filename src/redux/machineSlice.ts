import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuid-random";

import { Machines } from "../interfaces/machine";

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
const initialState: Machines = {
  categories: [],
};

// Creating state slice.
const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({ id: uuid(), ...action.payload });
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload.category
      );
    },
    setCategoryName: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Update category name.
          return { ...c, name: action.payload.name };
        } else return c;
      });
    },
    addFieldToCategory: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Add the field into field array and all of the machines.
          return {
            ...c,
            fields: [...c.fields, { id: uuid(), ...action.payload.field }],
            machines: c.machines.map((m) => ({
              ...m,
              [action.payload.field.name]: "",
            })),
          };
        } else return c;
      });
    },
    removeFieldFromCategory: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Remove the field from field array and all of the machines.
          return {
            ...c,
            fields: c.fields.filter((f) => f.id !== action.payload.field),
            machines: c.machines.map((m) => {
              delete m[action.payload.filed];
              return m;
            }),
          };
        } else return c;
      });
    },
    updateField: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Set field value.
          return {
            ...c,
            fields: c.fields.map((f) => {
              if (f.id === action.payload.field.id) {
                return action.payload.field;
              } else return f;
            }),
          };
        } else return c;
      });
    },
    setFieldAsTitle: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Set field as title for category.
          return {
            ...c,
            fields: c.fields.map((f) => ({
              ...f,
              isTitle: f.id === action.payload.field,
            })),
          };
        } else return c;
      });
    },
    addMachineToCategory: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Add the machine item to machines.
          return {
            ...c,
            machines: [
              ...c.machines,
              { id: uuid(), ...action.payload.machine },
            ],
          };
        } else return c;
      });
    },
    removeMachineFromCategory: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Remove the machine from machine array.
          return {
            ...c,
            machines: c.machines.filter((m) => m.id !== action.payload.machine),
          };
        } else return c;
      });
    },
  },
});

export const {
  addCategory,
  removeCategory,
  setCategoryName,
  addFieldToCategory,
  removeFieldFromCategory,
  updateField,
  setFieldAsTitle,
  addMachineToCategory,
  removeMachineFromCategory,
} = machineSlice.actions;

export default machineSlice.reducer;
