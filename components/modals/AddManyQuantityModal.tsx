import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function AddManyQuantityModal({
  bulkVisible,
  setBulkVisible,
  productName,
  bulkQty,
  setBulkQty,
  handleBulkAdd,
}: {
  bulkVisible: boolean;
  setBulkVisible: React.Dispatch<React.SetStateAction<boolean>>;
  productName: string;
  bulkQty: string;
  setBulkQty: React.Dispatch<React.SetStateAction<string>>;
  handleBulkAdd: () => void;
}) {
  return (
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
            Quantas unidades de {productName}?
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
  );
}
