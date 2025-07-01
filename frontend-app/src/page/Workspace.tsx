import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
} from "@xyflow/react";
import SendMessageNode from "../component/SendMessageNode";
import NodePanel from "../component/NodePanel";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  sendMessage: SendMessageNode,
};

let id = 3;
const getId = () => `${id++}`;

const initialNodes: any = [];
const initialEdges: any = [];

export default function Workspace() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      const alreadyConnected = edges.some(
        (e) =>
          e.target === params.target && e.targetHandle === params.targetHandle
      );
      if (!alreadyConnected) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!event.dataTransfer || !reactFlowWrapper.current) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode = {
        id: getId(),
        type,
        position,
        data: { message: "New message node" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <ReactFlowProvider>
      <div className="flex w-screen h-screen">
        {/* 🧠 Left: React Flow Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background
              variant={BackgroundVariant.Dots}
              color="#691b9aa7"
              gap={30}
              size={3}
            />
          </ReactFlow>
        </div>

        {/* 📌 Right: MiniMap + Node Panel */}
        <div className="w-60 flex flex-col border-l border-gray-300 bg-white">
          <div>
            <MiniMap />
          </div>
          <div className="flex-1 overflow-y-auto">
            <NodePanel />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
