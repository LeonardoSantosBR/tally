import { useMoneyEarnedStore } from "@/stores/useMoneyEarnedStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CloseMarketModal({ visible, onClose, onConfirm }: Props) {
  const moneyEarned = useMoneyEarnedStore((s) => s.moneyEarned);
  const products = useProductsStore((s) => s.products);

  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);

  const formattedTotal = moneyEarned.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const itemsLabel = `${totalItems} ${totalItems === 1 ? "item vendido" : "itens vendidos"}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center px-8"
        onPress={onClose}
      >
        <Pressable
          onPress={() => {}}
          className="bg-white border border-slate-200 rounded-3xl p-6 w-full items-center"
        >
          <View className="w-14 h-14 rounded-full bg-emerald-50 items-center justify-center mb-4">
            <Feather name="check" size={28} color="#059669" />
          </View>

          <Text className="text-xl font-bold text-slate-800 mb-3">
            Fechar o caixa?
          </Text>

          <Text className="text-base text-emerald-600 font-semibold">
            Total do dia: {formattedTotal}
          </Text>
          <Text className="text-sm text-slate-400 mt-1 mb-6">{itemsLabel}</Text>

          <View className="flex-row gap-3 w-full">
            <TouchableOpacity
              className="flex-1 border border-slate-300 rounded-2xl py-3 items-center"
              onPress={onClose}
            >
              <Text className="text-slate-800 font-semibold">Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-emerald-700 rounded-2xl py-3 items-center"
              onPress={onConfirm}
            >
              <Text className="text-white font-semibold">Fechar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
