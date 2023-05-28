import { Alert } from "react-native";
import {
  VStack,
  HStack,
  Text,
  Button,
  Box,
  FlatList,
  useMediaQuery,
} from "native-base";

import { MachineCard } from "../../components/machine-card.component";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addMachineToCategory } from "../../redux/machineSlice";

export const MachineCategoryItemListScreen = ({ route }: any) => {
  const { category } = route.params;

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.machine);

  const [isSmallScreen] = useMediaQuery({
    minWidth: 280,
    maxWidth: 768,
  });

  const getCategory = () => {
    const cat = categories.find((c) => c.id === category);
    return !cat ? null : cat;
  };

  const categoryDetails = getCategory();

  const addMachine = () => {
    if (!!categoryDetails && categoryDetails?.fields?.length > 0) {
      dispatch(addMachineToCategory({ category }));
    } else {
      Alert.alert(
        "Missing fields",
        "Please add some fields first in the category"
      );
    }
  };

  return (
    <VStack flex={1} p="2" space="4" safeAreaBottom>
      <HStack space="4" alignItems="center" justifyContent="space-between">
        <Text fontSize="lg" bold>
          {categoryDetails?.name || "Untitled Category"}
        </Text>
        <Button onPress={addMachine}>Add new Item</Button>
      </HStack>

      <Box flex={1}>
        {!!categoryDetails && categoryDetails?.machines?.length > 0 ? (
          <FlatList
            key={isSmallScreen ? "one-col" : "two-col"}
            numColumns={isSmallScreen ? 1 : 2}
            data={categoryDetails.machines}
            renderItem={({ item }) => (
              <Box flex={{ base: 1, md: 0.5 }}>
                <MachineCard
                  machine={item}
                  fields={categoryDetails.fields}
                  categoryId={category}
                />
              </Box>
            )}
          />
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text alignSelf="center">No items available</Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
};
