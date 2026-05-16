import { Header } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): React.JSX.Element {
    return (
        <SafeAreaView className="flex-1 bg-slate-100 px-4" edges={["top"]}>
            <Header />
        </SafeAreaView>
    )
}
