import { useMoneyEarnedStore } from "@/stores/useMoneyEarnedStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { getDateInfo } from "@/utils";
import { Text, View } from "react-native";

export function Header() {
  const moneyEarned = useMoneyEarnedStore((s) => s.moneyEarned);
  const productsCount = useProductsStore((s) => s.products.length);

  const { weekday, day, monthName } = getDateInfo();
  const dateLabel = `${weekday}, ${day} de ${monthName}`;

  const formattedMoney = moneyEarned.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const itemsLabel = `${productsCount} ${productsCount === 1 ? "item" : "itens"}`;

  return (
    <View className="px-5 py-4">
      <Text className="text-xl text-slate-400">{dateLabel}</Text>
      <Text className="mt-1 text-3xl font-bold text-emerald-700">
        {formattedMoney}
      </Text>
      <Text className="mt-1 text-base text-slate-400">
        {itemsLabel} · dia em aberto
      </Text>
    </View>
  );
}
