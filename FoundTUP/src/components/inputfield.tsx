type Props = {
    label: string;
    type: React.HTMLInputTypeAttribute;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, type, placeholder, onChange }: Props) {
    return (
        <div className="flex flex-col">
            <p>{label}</p>
            <input type={type} placeholder={placeholder} className="border-1 rounded-sm p-1" onChange={onChange} />
        </div>
    )
}