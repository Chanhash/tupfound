import { motion } from "motion/react";
import Spinner from "../Spinner";

type SubmitButtonProps = {
    ready: boolean;
    loading: boolean;
    label: string;
    loadingLabel: string;
};

export default function SubmitButton({ ready, loading, label, loadingLabel }: SubmitButtonProps) {
    const active = ready && !loading;

    return (
        <motion.button
            whileHover={{ scale: active ? 1.05 : 1 }}
            whileTap={{ scale: 0.99 }}
            animate={{ backgroundPosition: active ? "0% 0%" : "100% 0%" }}
            transition={{ duration: 0.2 }}
            style={{
                backgroundSize: "200% 100%",
                backgroundPosition: "100% 0%",
                backgroundImage: "linear-gradient(to right, #a1ffb1 50%, #afafaf 50%)",
            }}
            className="px-6 py-4 rounded-lg border mt-2 flex items-center justify-center gap-2"
            type="submit"
            disabled={loading}
        >
            {loading ? loadingLabel : label}
            {loading && <Spinner />}
        </motion.button>
    );
}
