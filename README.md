# BiteSpeed Frontend Task: Chatbot Flow Builder

## 🚀 Live Demo

🔗 [View Deployed App on Vercel](https://flowbuilder-one.vercel.app/)

## 📦 GitHub Repository

📁 [GitHub Source Code](https://github.com/aharshsingh/Chatbot-flow-builder)

---

## 📖 Overview

This project is a simple and extensible **Chatbot Flow Builder** built using **React.js** and **React Flow**. It allows users to visually create chatbot message flows by dragging and connecting nodes in a graph-like UI.

> **Extensibility**: The application is structured to allow for easy future expansion, such as adding new types of nodes.

---

## ⚙️ Features

### 🧩 Nodes Panel

- Displays all supported node types (currently only **Text Node**).
- Future-proof design for adding more node types easily.
- Allows drag-and-drop to add nodes to the canvas.

### 💬 Text Node

- Only one node type is currently supported (Text Message).
- Multiple text nodes can be added and edited.
- When selected, a **Settings Panel** is shown with a text input to edit the message.

### 🔗 Edges

- Used to connect nodes to define message flow.
- **Source Handle**:
  - Each node can have only **one edge** originating from it.
- **Target Handle**:
  - Can accept **multiple edges** from different source nodes.

### 🛠️ Settings Panel

- Replaces the Nodes Panel when a node is selected.
- Allows the user to edit the text of a selected node.

### 💾 Save Button

- Validates the flow when clicked.
- **Shows an error** if:
  - There are multiple nodes, and
  - More than one node has **no target handle (unconnected)**.

---

## 🛠️ Tech Stack

- **React.js**
- **React Flow** (`@xyflow/react`)
- **TypeScript** (Optional: Project supports JS and TS)
- **TailwindCSS** (for styling)
- **Deployed on Vercel**


