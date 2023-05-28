import {
  VStack,
  HStack,
  Box,
  Button,
  Text,
  FormControl,
  Input,
  DeleteIcon,
  IconButton,
  Menu,
} from "native-base";

import { Category, Field } from "../interfaces/machine";
import { useAppDispatch } from "../hooks";
import {
  removeFieldFromCategory,
  updateField,
  setCategoryName,
  addFieldToCategory,
  setFieldAsTitle,
  removeCategory,
} from "../redux/machineSlice";

interface Props {
  category: Category;
}

export const CategoryCard = ({ category }: Props) => {
  const dispatch = useAppDispatch();

  const onDeleteField = (id: string) => {
    dispatch(removeFieldFromCategory({ category: category.id, field: id }));
  };

  const onFieldChange = (field: Field) => {
    dispatch(updateField({ category: category.id, field }));
  };

  const setTitleField = (id: string) => {
    dispatch(setFieldAsTitle({ category: category.id, field: id }));
  };

  const getTitleField = () => {
    const field = category.fields.find((f) => f.isTitle);
    return !field ? "Untitled" : field.name;
  };

  const addField = (type: string) => {
    dispatch(
      addFieldToCategory({ category: category.id, field: { name: "", type } })
    );
  };

  const onCategoryNameChange = (val: string) => {
    dispatch(setCategoryName({ category: category.id, name: val }));
  };

  const deleteCategory = () => {
    dispatch(removeCategory({ category: category.id }));
  };

  return (
    <VStack
      m="1.5"
      p="2"
      space="2"
      borderWidth={1}
      borderColor="light.500"
      borderRadius="md"
    >
      <Text fontSize="lg">
        {!category.name ? "Untitled Category" : category.name}
      </Text>
      <FormControl>
        <FormControl.Label>Category Name</FormControl.Label>
        <Input type="text" value={category.name} onChangeText={(v) => onCategoryNameChange(v)} />
      </FormControl>

      {category.fields.map((f, i) => (
        <FormControl key={i}>
          <HStack space="1.5" alignItems="center">
            <Box flex={1}>
              <Input
                type="text"
                value={f.name}
                onChangeText={(v) => onFieldChange({ ...f, name: v })}
              />
            </Box>
            <Text color="primary.600" textTransform="uppercase" fontSize="md">
              {f.type}
            </Text>
            <IconButton
              icon={<DeleteIcon />}
              borderRadius="full"
              onPress={() => onDeleteField(f.id)}
            />
          </HStack>
        </FormControl>
      ))}

      <Menu
        w="full"
        trigger={(triggerProps) => (
          <Button accessibilityLabel="" {...triggerProps}>
            {`Title Field: ${getTitleField()}`}
          </Button>
        )}
      >
        {category.fields.map((f, i) => (
          <Menu.Item key={i} onPress={() => setTitleField(f.id)}>
            {f.name}
          </Menu.Item>
        ))}
      </Menu>

      <HStack mt="3" space="2">
        <Menu
          w="190"
          trigger={(triggerProps) => (
            <Button accessibilityLabel="" {...triggerProps}>
              Add new field
            </Button>
          )}
        >
          {["text", "number", "checkbox", "date"].map((t) => (
            <Menu.Item
              key={t}
              _text={{ textTransform: "capitalize" }}
              onPress={() => addField(t)}
            >
              {t}
            </Menu.Item>
          ))}
        </Menu>
        <Button
          startIcon={<DeleteIcon color="light.50" />}
          onPress={deleteCategory}
        >
          Remove
        </Button>
      </HStack>
    </VStack>
  );
};
