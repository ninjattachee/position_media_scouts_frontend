import { XIcon } from "lucide-react";

export const Tag = ({
  text,
  onRemove,
}: {
  text: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-sm">{text}</span>
      <button type="button" onClick={onRemove}>
        <XIcon className="bg-stone-300 rounded-full w-3 h-3 text-red-500 cursor-pointer hover:text-red-700 hover:scale-120 transition-all duration-300" />
      </button>
    </div>
  );
};
