import { useState } from "react";
import { UserCircle2 } from "lucide-react";

interface WorkspaceNavbarProps {
  onSave: () => void;
}

export default function WorkspaceNavbar({ onSave }: WorkspaceNavbarProps) {
  const [title, setTitle] = useState("Untitled");
  const [editing, setEditing] = useState(false);

  return (
    <div className="w-full h-12 flex items-center justify-between px-4 border-b bg-white shadow-sm z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <UserCircle2 className="w-6 h-6 text-gray-600" />
        </div>
        <span className="text-sm text-gray-700 hidden sm:inline">My Flow</span>
      </div>
      <div
        className="text-center text-lg font-medium text-gray-800 truncate max-w-xs cursor-pointer"
        onClick={() => setEditing(true)}
      >
        {editing ? (
          <input
            className="text-lg font-medium border-b border-gray-300 outline-none text-center w-full bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
          />
        ) : (
          title
        )}
      </div>
      <div>
        <button
          onClick={onSave}
          className="text-sm px-4 py-1 rounded border border-[#1b3c3f] text-[#1b3c3f]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
