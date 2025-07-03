import SendMessageNode from "./SendMessageNode";
import { Workflow } from "lucide-react";

const nodeTypes = [           //This array has the types of nodes in future to scale we can just make a new node and add it to this array
  {
    type: "sendMessage",
    label: "Send Message",
    preview: <SendMessageNode data={{ message: "New message node" }} />,
    comingSoon: false,
  },
  {
    type: "imageNode",
    label: "Send Image",
    preview: <SendMessageNode data={{ message: "Image Node" }} />,
    comingSoon: true,
  },
  {
    type: "delayNode",
    label: "Delay Node",
    preview: <SendMessageNode data={{ message: "Delay Node" }} />,
    comingSoon: true,
  },
];

export default function NodePanel() {
  return (
    <div className="w-72 p-4 border-l border-gray-300 bg-white overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Workflow className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-lg">Node Types</h3>
      </div>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className={`relative mb-4 ${
            node.comingSoon ? "cursor-not-allowed" : "cursor-move"
          }`}
          draggable={!node.comingSoon}
          onDragStart={(event) => {
            if (node.comingSoon) return;
            event.dataTransfer.setData("application/reactflow", node.type);
            event.dataTransfer.effectAllowed = "move";
          }}
        >
          <div className="pointer-events-none transform scale-90 origin-top-left">
            {node.preview}
          </div>
          {node.comingSoon && (
            <div className="absolute inset-0 w-[270px] bg-white/70 flex items-center justify-center text-sm font-semibold text-gray-700 rounded">
              Coming Soon
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
