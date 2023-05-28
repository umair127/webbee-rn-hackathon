import { VStack, Box, Button, Text, FlatList } from "native-base";
import uuid from "uuid-random";

import { CategoryCard } from "../../components/category-card.component";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCategory } from "../../redux/machineSlice";

export const MachineCategoryListScreen = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.machine);

  const onPress = () => {
    dispatch(
      addCategory({
        name: "",
        fields: [{ id: uuid(), name: "", type: "text" }],
        machines: [],
      })
    );
  };

  return (
    <VStack flex={1} p="2" space="4" safeAreaBottom>
      <Box flex={1}>
        {categories.length === 0 ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text alignSelf="center">No categories available</Text>
          </Box>
        ) : (
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryCard category={item} />}
          />
        )}
      </Box>

      <Button mb="2" onPress={onPress}>
        Add Category
      </Button>
    </VStack>
  );
};
