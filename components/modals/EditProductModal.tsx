import { Products } from "@/types";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  product: Products;
  onSave: (name: string, quantity: number, price: number) => void;
};

export function EditProductModal({ visible, onClose, product, onSave }: Props) {
  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(String(product.quantity));
  const [price, setPrice] = useState(String(product.price).replace(".", ","));

  useEffect(() => {
    if (visible) {
      setName(product.name);
      setQuantity(String(product.quantity));
      setPrice(String(product.price).replace(".", ","));
    }
  }, [visible]);

  const handleSave = () => {
    const qty = parseInt(quantity, 10);
    const prc = parseFloat(price.replace(",", "."));
    if (!name.trim() || isNaN(qty) || qty < 0 || isNaN(prc) || prc <= 0) return;
    onSave(name.trim(), qty, prc);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/40 px-8"
        onPress={onClose}
      >
        <Pressable onPress={() => {}} className="bg-white rounded-3xl p-5 w-full">
          <Text className="text-base font-bold text-slate-800 mb-4">
            Editar produto
          </Text>

          <Text className="text-sm text-emerald-700 mb-1">Nome</Text>
          <TextInput
            className="bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-800 mb-3"
            value={name}
            onChangeText={setName}
            placeholder="Nome do produto"
            placeholderTextColor="#94a3b8"
            returnKeyType="next"
          />

          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm text-emerald-700 mb-1">Quantidade</Text>
              <TextInput
                className="bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-800"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#94a3b8"
                returnKeyType="next"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-emerald-700 mb-1">
                Preço unitário
              </Text>
              <TextInput
                className="bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-800"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                placeholder="0,00"
                placeholderTextColor="#94a3b8"
                returnKeyType="done"
                onSubmitEditing={handleSave}
              />
            </View>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 border border-slate-300 rounded-2xl py-3 items-center"
              onPress={onClose}
            >
              <Text className="text-slate-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-emerald-700 rounded-2xl py-3 items-center"
              onPress={handleSave}
            >
              <Text className="text-white font-semibold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
