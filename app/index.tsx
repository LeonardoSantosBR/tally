import { CloseMarketModal, Header, NewItemBottomSheet, ProductCard } from "@/components";
import { useProductsStore } from "@/stores/useProductsStore";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): React.JSX.Element {
  const products = useProductsStore((s) => s.products);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [closeDayVisible, setCloseDayVisible] = useState(false);
  const noProducts = products.length === 0 ? true : false

  const handleCloseDay = () => {
    setCloseDayVisible(false);
    router.push("/summary");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-slate-100 px-4"
      edges={["top", "bottom"]}
    >
      <Header />

      <TouchableOpacity
        className="bg-emerald-700 rounded-2xl py-4 items-center mb-4"
        onPress={() => setSheetVisible(true)}
      >
        <Text className="text-white text-base font-semibold">+ Novo item</Text>
      </TouchableOpacity>

      <NewItemBottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
        <View className="h-4" />
      </ScrollView>

      <TouchableOpacity
        className={`bg-black border border-slate-300 rounded-2xl py-4 items-center mb-4 ${noProducts ? "opacity-40" : "opacity-100"}`}
        onPress={() => setCloseDayVisible(true)}
        disabled={noProducts ? true : false}
      >
        <Text className="text-white text-base font-semibold">
          Fechar dia
        </Text>
      </TouchableOpacity>

      <CloseMarketModal
        visible={closeDayVisible}
        onClose={() => setCloseDayVisible(false)}
        onConfirm={handleCloseDay}
      />
    </SafeAreaView>
  );
}
