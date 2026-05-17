import { useMoneyEarnedStore } from "@/stores/useMoneyEarnedStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { Products } from "@/types";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { AddManyQuantityModal, DeleteProductModal, EditProductModal } from "../modals";

type Props = {
  product: Products;
};

export function ProductCard({ product }: Props) {
  const updateProduct = useProductsStore((s) => s.updateProduct);
  const removeProduct = useProductsStore((s) => s.removeProduct);
  const addMoney = useMoneyEarnedStore((s) => s.addMoney);

  const [bulkVisible, setBulkVisible] = useState(false);
  const [bulkQty, setBulkQty] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

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

  const handleEditSave = (newName: string, newQty: number, newPrice: number) => {
    const oldTotal = product.price * product.quantity;
    const newTotal = newPrice * newQty;
    addMoney(newTotal - oldTotal);
    updateProduct(product.name, { name: newName, quantity: newQty, price: newPrice });
  };

  const canDecrement = product.quantity > 0;

  return (
    <>
      <View className="flex-row items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 mb-2">
        <View className="flex-row items-center gap-3 flex-1">
          <TouchableOpacity onPress={() => setDeleteVisible(true)} hitSlop={8}>
            <Feather name="trash-2" size={20} color={"#C91B00"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditVisible(true)} hitSlop={8}>
            <Feather name="edit" size={18} color="#64748b" />
          </TouchableOpacity>
          <View>
            <Text className="text-base font-semibold text-slate-800">
              {product.name}
            </Text>
            <Text className="text-sm text-slate-400">
              {formattedPrice} cada
            </Text>
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
                color={canDecrement ? "red" : "#cbd5e1"}
              />
            </TouchableOpacity>
            <Text className="text-base text-slate-800 min-w-4 text-center">
              {product.quantity}
            </Text>
            <TouchableOpacity onPress={handleIncrement} hitSlop={8}>
              <MaterialIcons name="add-circle" size={22} color="#059669" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBulkVisible(true)} hitSlop={8}>
              <MaterialIcons name="addchart" size={22} color="#4052D6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <EditProductModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        product={product}
        onSave={handleEditSave}
      />

      <DeleteProductModal
        visible={deleteVisible}
        productName={product.name}
        onClose={() => setDeleteVisible(false)}
        onConfirm={() => { handleRemove(); setDeleteVisible(false); }}
      />

      <AddManyQuantityModal
        bulkVisible={bulkVisible}
        setBulkVisible={setBulkVisible}
        productName={product.name}
        bulkQty={bulkQty}
        setBulkQty={setBulkQty}
        handleBulkAdd={handleBulkAdd}
      />
    </>
  );
}
