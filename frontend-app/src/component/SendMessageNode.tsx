import React from "react";
import { Handle, Position } from "@xyflow/react";
import { MessageCircle } from "lucide-react";

export default function SendMessageNode({ data }: any) {
  return (
    <div className=" w-[300px] rounded-lg overflow-hidden bg-white border border-gray-300 shadow-md font-sans">
      <div className="fex items-center justify-between px-3 py-2 font-bold" style={{
        background: "linear-gradient(135deg, #e0f7fa, #e1bee7)"
      }}>
        <div className="flex items-center gap-2">
          <MessageCircle size={16} strokeWidth={2} />
          <span>Send Message</span>
        </div>
      </div>
      <div className="p-3 text-sm">
        {data.message || "No message"}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

