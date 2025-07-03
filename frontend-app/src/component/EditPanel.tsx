interface EditPanelProps {
  node: any;
  onChangeMessage: (nodeId: string, message: string) => void;
  onClose: () => void;
}

type SendMessageNodeData = {
  message: string;
};

export default function EditPanel({
  node,
  onChangeMessage,
  onClose,
}: EditPanelProps) {
  const data = node.data as SendMessageNodeData;
  return (
    <div className="w-72 min-w-[288px] p-4 border-l border-gray-300 bg-white flex flex-col">
      <h3 className="font-semibold mb-2">Edit Node</h3>
      <input
        className="border p-2 rounded mb-4"
        value={data?.message ?? ""}
        onChange={(e) => onChangeMessage(node.id, e.target.value)}
      />
      <button
        className="bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-700 mt-auto"
        onClick={onClose}
      >
        Done
      </button>
    </div>
  );
}
