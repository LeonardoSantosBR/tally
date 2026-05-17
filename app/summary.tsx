import { useMoneyEarnedStore } from "@/stores/useMoneyEarnedStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { getDateInfo } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SummaryScreen() {
  const products = useProductsStore((s) => s.products);
  const clearProducts = useProductsStore((s) => s.clearProducts);
  const moneyEarned = useMoneyEarnedStore((s) => s.moneyEarned);
  const resetMoneyEarned = useMoneyEarnedStore((s) => s.resetMoneyEarned);

  const { weekday, day, monthName, year } = getDateInfo();
  const dateLabel = `${weekday}, ${day} de ${monthName} de ${year}`;

  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);

  const formattedTotal = moneyEarned.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleClose = () => {
    clearProducts();
    resetMoneyEarned();
    router.back();
  };

  const handleShare = async () => {
    const lines = products
      .map((p) => {
        const lineTotal = (p.price * p.quantity).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        return `• ${p.name}  ${p.quantity}x  ${lineTotal}`;
      })
      .join("\n");

    const message = [
      `🏪 Tally — Resumo do dia`,
      `📅 ${dateLabel}`,
      ``,
      lines,
      ``,
      `─────────────────────`,
      `💰 Total: ${formattedTotal}`,
      `📦 ${totalItems} ${totalItems === 1 ? "item vendido" : "itens vendidos"}`,
    ].join("\n");

    await Share.share({ message });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white rounded-3xl overflow-hidden">
          <View className="bg-emerald-700 items-center py-6 px-4">
            <Text className="text-white text-xs font-semibold tracking-widest uppercase mb-1">
              Tally
            </Text>
            <Text className="text-white text-lg font-bold">Resumo do dia</Text>
            <Text className="text-emerald-200 text-sm mt-1">{dateLabel}</Text>
          </View>

          {/* Serrated edge effect */}
          <View className="flex-row justify-between px-2 -mt-1">
            {Array.from({ length: 18 }).map((_, i) => (
              <View
                key={i}
                className="w-4 h-4 rounded-full bg-slate-100"
              />
            ))}
          </View>

          <View className="px-5 pt-2 pb-4">
            {products.length === 0 ? (
              <Text className="text-slate-400 text-sm text-center py-4">
                Nenhum produto registrado.
              </Text>
            ) : (
              products.map((product, index) => {
                const lineTotal = (
                  product.price * product.quantity
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
                const unitPrice = product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });

                return (
                  <View key={product.name}>
                    <View className="flex-row justify-between items-center py-3">
                      <View className="flex-1">
                        <Text className="text-slate-800 font-semibold text-base">
                          {product.name}
                        </Text>
                        <Text className="text-slate-400 text-xs">
                          {unitPrice} cada
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text className="text-slate-800 font-bold">{lineTotal}</Text>
                        <Text className="text-slate-400 text-xs">
                          {product.quantity}x
                        </Text>
                      </View>
                    </View>
                    {index < products.length - 1 && (
                      <View className="border-b border-dashed border-slate-200" />
                    )}
                  </View>
                );
              })
            )}

            <View className="border-t-2 border-slate-200 mt-2 pt-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 text-sm">
                  {totalItems} {totalItems === 1 ? "item vendido" : "itens vendidos"}
                </Text>
                <View className="items-end">
                  <Text className="text-xs text-slate-400 uppercase tracking-wide">
                    Total
                  </Text>
                  <Text className="text-2xl font-bold text-emerald-700">
                    {formattedTotal}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between px-2 mb-1">
            {Array.from({ length: 18 }).map((_, i) => (
              <View
                key={i}
                className="w-4 h-4 rounded-full bg-slate-100"
              />
            ))}
          </View>

          <View className="items-center pb-5">
            <Text className="text-slate-300 text-xs tracking-widest">
              * * * OBRIGADO * * *
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="px-4 pb-4 gap-3">
        <TouchableOpacity
          className="bg-emerald-700 rounded-2xl py-4 flex-row items-center justify-center gap-2"
          onPress={handleShare}
        >
          <Feather name="share-2" size={18} color="white" />
          <Text className="text-white font-semibold text-base">
            Compartilhar comprovante
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-slate-300 rounded-2xl py-4 items-center"
          onPress={handleClose}
        >
          <Text className="text-slate-800 font-semibold text-base">
            Fechar caixa
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
