import { useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  Input,
  Text,
  DeleteIcon,
  Switch,
  Modal,
  Pressable,
} from "native-base";
import { Calendar } from "react-native-calendars";

import { Machine, Field } from "../interfaces/machine";
import { useAppDispatch } from "../hooks";
import {
  removeMachineFromCategory,
  updateMachine,
} from "../redux/machineSlice";

interface Props {
  machine: Machine;
  fields: Array<Field>;
  categoryId: string;
}

export const MachineCard = ({ machine, fields, categoryId }: Props) => {
  const dispatch = useAppDispatch();

  const [fieldId, setFieldId] = useState("");

  const onFieldValueChange = (m: Machine) => {
    dispatch(updateMachine({ category: categoryId, machine: m }));
  };

  const getTitle = () => {
    const field = fields.find((f) => f.isTitle);
    return !field || field.type === "checkbox" ? "Untitled" : machine[field.id];
  };

  const deleteItem = () => {
    dispatch(
      removeMachineFromCategory({ category: categoryId, machine: machine.id })
    );
  };

  return (
    <>
      <VStack
        m="1.5"
        p="2"
        space="2"
        borderWidth={1}
        borderColor="light.500"
        borderRadius="md"
      >
        <Text fontSize="lg">{getTitle()}</Text>

        {fields.map((f, i) => (
          <FormControl key={i}>
            <FormControl.Label>{f.name}</FormControl.Label>
            {f.type === "text" && (
              <Input
                type="text"
                value={machine[f.id]}
                onChangeText={(v) =>
                  onFieldValueChange({ ...machine, [f.id]: v })
                }
              />
            )}
            {f.type === "number" && (
              <Input
                type="text"
                keyboardType="numeric"
                value={machine[f.id]}
                onChangeText={(v) =>
                  onFieldValueChange({ ...machine, [f.id]: v })
                }
              />
            )}
            {f.type === "checkbox" && (
              <Switch
                isChecked={machine[f.id]}
                onToggle={(v) => onFieldValueChange({ ...machine, [f.id]: v })}
              />
            )}
            {f.type === "date" && (
              <Pressable
                px="3"
                py="3"
                borderWidth={1}
                borderColor="muted.300"
                borderRadius="sm"
                onPress={() => setFieldId(f.id)}
              >
                <Text>{machine[f.id]}</Text>
              </Pressable>
            )}
          </FormControl>
        ))}

        <Button
          mt="3"
          startIcon={<DeleteIcon color="light.50" />}
          onPress={deleteItem}
        >
          Remove
        </Button>
      </VStack>

      <Modal isOpen={!!fieldId} onClose={() => setFieldId("")}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Calendar
              onDayPress={(day) => {
                onFieldValueChange({ ...machine, [fieldId]: day.dateString });
                setFieldId("");
              }}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
