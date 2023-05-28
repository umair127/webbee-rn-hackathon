import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuid-random";

import { Machines, Machine } from "../interfaces/machine";

// {
//   categories: [
//     {
//       id: "123",
//       name: "category 1",
//       fields: [{ id: "123", name: "modal", type: "number" }],
//       // machines: [{ id: "123", modal: "modal 1" }],
//       machines: [{ id: "123", abc: "abc" }],
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
          const fieldId = uuid();
          // Add the field into field array and all of the machines.
          return {
            ...c,
            fields: [...c.fields, { id: fieldId, ...action.payload.field }],
            machines: c.machines.map((m) => ({
              ...m,
              [fieldId]: "",
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
              delete m[action.payload.field];
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
          // Creating new machine.
          let machine: Machine = { id: uuid() };
          c.fields.forEach((f) => {
            console.log("forEach: ", f);
            if (f.type === "checkbox") {
              machine[f.id] = false;
            } else {
              machine[f.id] = "";
            }
          });
          console.log('NEW MACHINE ARRAY', [...c.machines, machine]);
          // Add the machine item to machines.
          return {
            ...c,
            machines: [...c.machines, machine],
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
    updateMachine: (state, action) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.category) {
          // Update the machine in machine array.
          return {
            ...c,
            machines: c.machines.map((m) => {
              if (m.id === action.payload.machine.id) {
                return action.payload.machine;
              } else return m;
            }),
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
  updateMachine,
} = machineSlice.actions;

export default machineSlice.reducer;
