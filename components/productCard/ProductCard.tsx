import { useMoneyEarnedStore } from "@/stores/useMoneyEarnedStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { Products } from "@/types";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  product: Products;
};

export function ProductCard({ product }: Props) {
  const updateProduct = useProductsStore((s) => s.updateProduct);
  const removeProduct = useProductsStore((s) => s.removeProduct);
  const addMoney = useMoneyEarnedStore((s) => s.addMoney);

  const [bulkVisible, setBulkVisible] = useState(false);
  const [bulkQty, setBulkQty] = useState("");

  const total = product.price * product.quantity;

  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formattedTotal = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleIncrement = () => {
    updateProduct(product.name, { quantity: product.quantity + 1 });
    addMoney(product.price);
  };

  const handleDecrement = () => {
    if (product.quantity <= 0) return;
    updateProduct(product.name, { quantity: product.quantity - 1 });
    addMoney(-product.price);
  };

  const handleRemove = () => {
    addMoney(-(product.price * product.quantity));
    removeProduct(product.name);
  };

  const handleBulkAdd = () => {
    const qty = parseInt(bulkQty, 10);
    if (!isNaN(qty) && qty > 0) {
      updateProduct(product.name, { quantity: product.quantity + qty });
      addMoney(product.price * qty);
    }
    setBulkQty("");
    setBulkVisible(false);
  };

  const canDecrement = product.quantity > 0;

  return (
    <>
      <View className="flex-row items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 mb-2">
        <View className="flex-row items-center gap-3 flex-1">
          <TouchableOpacity onPress={handleRemove} hitSlop={8}>
            <Feather name="trash-2" size={20} color="red" />
          </TouchableOpacity>
          <View>
            <Text className="text-base font-semibold text-slate-800">
              {product.name}
            </Text>
            <Text className="text-sm text-slate-400">{formattedPrice} cada</Text>
          </View>
        </View>

        <View className="items-end gap-1">
          <Text className="text-base font-semibold text-slate-800">
            {formattedTotal}
          </Text>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={handleDecrement}
              hitSlop={8}
              disabled={!canDecrement}
            >
              <Entypo
                name="circle-with-minus"
                size={22}
                color={canDecrement ? "#059669" : "#cbd5e1"}
              />
            </TouchableOpacity>
            <Text className="text-base text-slate-800 min-w-4 text-center">
              {product.quantity}
            </Text>
            <TouchableOpacity onPress={handleIncrement} hitSlop={8}>
              <MaterialIcons name="add-circle" size={22} color="#059669" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBulkVisible(true)}
              hitSlop={8}
            >
              <MaterialIcons name="addchart" size={22} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={bulkVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBulkVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/40 px-10"
          onPress={() => setBulkVisible(false)}
        >
          <Pressable
            onPress={() => {}}
            className="bg-white rounded-3xl p-5 w-full"
          >
            <Text className="text-base font-bold text-slate-800 mb-1">
              Adicionar em massa
            </Text>
            <Text className="text-sm text-slate-400 mb-3">
              Quantas unidades de {product.name}?
            </Text>
            <TextInput
              className="bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 text-base text-slate-800 mb-4"
              value={bulkQty}
              onChangeText={setBulkQty}
              keyboardType="numeric"
              placeholder="Ex: 20"
              placeholderTextColor="#94a3b8"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleBulkAdd}
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 border border-slate-300 rounded-2xl py-3 items-center"
                onPress={() => {
                  setBulkQty("");
                  setBulkVisible(false);
                }}
              >
                <Text className="text-slate-800 font-semibold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-emerald-700 rounded-2xl py-3 items-center"
                onPress={handleBulkAdd}
              >
                <Text className="text-white font-semibold">Adicionar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
