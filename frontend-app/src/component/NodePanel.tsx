import React from "react";

const nodeTypes = [
  { type: "sendMessage", label: "Send Message" },
  // Add more node types here if needed
];

export default function NodePanel() {
  return (
    <div className="w-48 p-4 border-r border-gray-300 bg-white">
      <h3 className="font-semibold mb-2">Node Types</h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="cursor-pointer p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/reactflow", node.type);
            event.dataTransfer.effectAllowed = "move";
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
};

