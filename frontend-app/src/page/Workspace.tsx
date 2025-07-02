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
import EditPanel from "../component/EditPanel";
import "@xyflow/react/dist/style.css";
import WorkspaceNavbar from "../component/Navbar";
import { toast } from "sonner";
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
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null
  );
  const handleSave = () => {
    if (nodes.length === 0) {
      toast.error("No nodes to save.");
      return;
    }

    if (nodes.length === 1) {
      toast.success("Saved successfully!");
      return;
    }

    const nodesWithNoIncoming = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodesWithNoIncoming.length > 1) {
      toast.error(
        "Multiple nodes are unconnected. Each node must have at least one incoming connection."
      );
      return;
    }

    toast.success("Saved successfully!");
  };

  const onNodeClick = useCallback((_event: any, node: any) => {
    setSelectedNodeId(node.id);
  }, []);

  const updateNodeMessage = (id: string, message: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, message } } : node
      )
    );
  };

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

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <ReactFlowProvider>
      <div className="flex flex-col w-screen h-screen">
        <WorkspaceNavbar onSave={handleSave} />

        <div className="flex flex-1 overflow-hidden">
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
              onNodeClick={onNodeClick}
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
          <div className="w-80 flex flex-col border-l border-gray-300 bg-white">
            <div className="flex-1 overflow-y-auto">
              {selectedNode ? (
                <EditPanel
                  node={selectedNode}
                  onChangeMessage={updateNodeMessage}
                  onClose={() => setSelectedNodeId(null)}
                />
              ) : (
                <NodePanel />
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
