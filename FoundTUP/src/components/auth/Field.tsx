import type { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string | false;
};

export default function Field({ label, error, ...input }: FieldProps) {
    return (
        <label className="flex flex-col gap-1">
            <span className="flex items-center justify-between">
                <span className="font-bold text-sm">{label}</span>
                {error && <span className="text-red-500 text-xs">{error}</span>}
            </span>
            <input className="p-2 px-4 rounded-xl border-2" {...input} />
        </label>
    );
}
