import { useMoneyEarnedStore } from "@/stores/useMoneyEarnedStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function NewItemBottomSheet({ visible, onClose }: Props) {
  const addProduct = useProductsStore((s) => s.addProduct);
  const addMoney = useMoneyEarnedStore((s) => s.addMoney);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    const qty = parseInt(quantity, 10);
    const prc = parseFloat(price.replace(",", "."));

    if (!name.trim() || isNaN(qty)  || isNaN(prc) || prc <= 0)
      return;

    addProduct({ name: name.trim(), quantity: qty, price: prc });
    addMoney(prc * qty);

    setName("");
    setQuantity("");
    setPrice("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setQuantity("");
    setPrice("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable className="flex-1" onPress={handleClose} />

        <View className="bg-white border-slate-300 rounded-t-3xl px-4 pt-5 pb-10">
          <View className="w-10 h-1 bg-slate-300 rounded-full self-center mb-6" />

          <Text className="text-xl font-bold text-slate-800 mb-5">
            Novo item
          </Text>

          <Text className="text-sm text-emerald-700 mb-1">Nome</Text>
          <TextInput
            className="bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-base text-slate-800 mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Ex: Halls"
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />

          <View className="flex-row gap-3 mb-6">
            <View className="flex-1">
              <Text className="text-sm text-emerald-700 mb-1">Quantidade</Text>
              <TextInput
                className="bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-base text-slate-800"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="1"
                placeholderTextColor="#94a3b8"
                returnKeyType="next"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-emerald-700 mb-1">
                Preço unitário
              </Text>
              <TextInput
                className="bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-base text-slate-800"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholder="0,00"
                placeholderTextColor="#94a3b8"
                returnKeyType="done"
                onSubmitEditing={handleAdd}
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-emerald-700 rounded-2xl py-4 items-center"
            onPress={handleAdd}
          >
            <Text className="text-white text-base font-semibold">
              Adicionar
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
