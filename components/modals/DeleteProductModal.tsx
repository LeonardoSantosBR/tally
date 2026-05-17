import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteProductModal({
  visible,
  productName,
  onClose,
  onConfirm,
}: Props) {
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
        <Pressable
          onPress={() => {}}
          className="bg-white rounded-3xl p-6 w-full items-center"
        >
          <View className="w-14 h-14 rounded-full bg-red-50 items-center justify-center mb-4">
            <Feather name="trash-2" size={26} color="#ef4444" />
          </View>

          <Text className="text-lg font-bold text-slate-800 mb-1">
            Remover produto?
          </Text>
          <Text className="text-sm text-slate-400 text-center mb-6">
            {productName} será removido da lista.
          </Text>

          <View className="flex-row gap-3 w-full">
            <TouchableOpacity
              className="flex-1 border border-slate-300 rounded-2xl py-3 items-center"
              onPress={onClose}
            >
              <Text className="text-slate-800 font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-red-500 rounded-2xl py-3 items-center"
              onPress={onConfirm}
            >
              <Text className="text-white font-semibold">Remover</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
