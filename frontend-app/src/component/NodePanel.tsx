import React from "react";
import SendMessageNode from "./SendMessageNode";
import { Workflow } from "lucide-react";

const nodeTypes = [
  {
    type: "sendMessage",
    label: "Send Message",
    preview: <SendMessageNode data={{ message: "New message node" }} />,
  },
];

export default function NodePanel() {
  return (
    <div className="w-72 p-4 border-l border-gray-300 bg-white overflow-y-auto">
      {/* Panel Header */}
      <div className="flex items-center gap-2 mb-4">
        <Workflow className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-lg">Node Types</h3>
      </div>

      {/* Node List */}
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="cursor-move mb-4"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/reactflow", node.type);
            event.dataTransfer.effectAllowed = "move";
          }}
        >
          {/* Mini preview */}
          <div className="pointer-events-none transform scale-90 origin-top-left">
            {node.preview}
          </div>
        </div>
      ))}
    </div>
  );
}
