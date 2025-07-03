import * as ReactFlow from "@xyflow/react";
import { MessageCircle } from "lucide-react";

const SendMessageNode = ({ data }: any) => {
  const { Handle, Position } = ReactFlow;

  return (
    <div className="w-[300px] rounded-lg overflow-hidden bg-white border border-gray-300 shadow-md font-sans">
      <div
        className="flex items-center justify-between px-3 py-2 font-bold"
        style={{
          background: "linear-gradient(135deg, #b2dfdb, #e0f2f1)",
        }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle size={16} strokeWidth={2} />
          <span>Send Message</span>
        </div>
      </div>

      <div className="p-3 text-sm">{data.message || "No message"}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default SendMessageNode;
