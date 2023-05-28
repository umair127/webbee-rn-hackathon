import { Alert } from "react-native";
import { VStack, HStack, Button, Text, Box, ScrollView } from "native-base";

import { MachineCard } from "../../components/machine-card.component";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addMachineToCategory } from "../../redux/machineSlice";
import { Category } from "../../interfaces/machine";

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.machine);

  const addMachine = (category: Category) => {
    if (category.fields.length > 0) {
      dispatch(addMachineToCategory({ category: category.id }));
    } else {
      Alert.alert(
        "Missing fields",
        "Please add some fields first in the category"
      );
    }
  };

  return (
    <VStack flex={1} p="2" space="4" safeAreaBottom>
      <ScrollView>
        {categories.map((c, i) => {
          return (
            <VStack key={i} p="2" space="4">
              <HStack
                space="4"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="lg" bold>
                  {c.name || "Untitled Category"}
                </Text>
                <Button onPress={() => addMachine(c)}>Add new Item</Button>
              </HStack>

              <Box flex={1}>
                {c.machines.length > 0 ? (
                  <>
                    {c.machines.map((m, idx) => (
                      <MachineCard
                        key={idx}
                        machine={m}
                        fields={c.fields}
                        categoryId={c.id}
                      />
                    ))}
                  </>
                ) : (
                  <Box flex={1} justifyContent="center" alignItems="center">
                    <Text alignSelf="center">No items available</Text>
                  </Box>
                )}
              </Box>
            </VStack>
          );
        })}
      </ScrollView>
    </VStack>
  );
};
