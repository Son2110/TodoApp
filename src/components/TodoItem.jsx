import React, { useState } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

const TodoItem = ({
  text,
  id,
  isComplete,
  tag,
  deadline,
  deleteTodo,
  toggle,
  onEdit,
  dragHandleProps,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = () => {
    if (editValue.trim() && editValue !== text) {
      onEdit(id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditValue(text);
      setIsEditing(false);
    }
  };

  //tag color
  const getTagColor = (tagName) => {
    const colors = {
      Work: "bg-blue-100 text-blue-800",
      Study: "bg-green-100 text-green-800",
      Personal: "bg-purple-100 text-purple-800",
      Health: "bg-red-100 text-red-800",
      Shopping: "bg-yellow-100 text-yellow-800",
    };
    return colors[tagName] || "bg-gray-100 text-gray-800";
  };

  //deadline logic
  const getDeadlineStatus = (deadlineDate) => {
    if (!deadlineDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineDate);
    deadline.setHours(0, 0, 0, 0);

    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return {
        status: "overdue",
        color: "bg-red-50  border-red-200",
        text: "text-red-600",
      };
    } else if (daysDiff === 0) {
      return {
        status: "today",
        color: "bg-yellow-50 border-yellow-200",
        text: "text-yellow-600",
      };
    } else if (daysDiff === 1) {
      return {
        status: "tomorrow",
        color: "bg-orange-50 border-orange-200",
        text: "text-orange-600",
      };
    } else if (daysDiff <= 3) {
      return {
        status: "soon",
        color: "bg-blue-50 border-blue-200",
        text: "text-blue-600",
      };
    }
    return { status: "future", color: "", text: "text-gray-500" };
  };

  const formatDeadline = (deadlineDate) => {
    if (!deadlineDate) return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(deadlineDate);
    deadline.setHours(0, 0, 0, 0);

    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return `Overdue by ${Math.abs(daysDiff)} day${
        Math.abs(daysDiff) !== 1 ? "s" : ""
      }`;
    } else if (daysDiff === 0) {
      return "Due today";
    } else if (daysDiff === 1) {
      return "Due tomorrow";
    } else return `Due in ${daysDiff} day${daysDiff !== 1 ? "s" : ""}`;
  };

  const deadlineInfo = getDeadlineStatus(deadline);

  return (
    <div
      className={`flex items-center my-3 gap-2 p-3 rounded-lg transition-colors
    ${!isComplete ? deadlineInfo?.color || "" : ""}  
    ${!isComplete && deadlineInfo?.color ? "border" : ""}
    ${isDragging ? "bg-white shadow-2xl border-2 border-blue-300" : ""} `}
    >
      {/* Drag Handle - only show when not editing */}
      {!isEditing && (
        <div
          {...dragHandleProps}
          className="drag-handle cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mr-2 p-1"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            className="opacity-60"
          >
            <circle cx="2" cy="2" r="1" />
            <circle cx="2" cy="6" r="1" />
            <circle cx="2" cy="10" r="1" />
            <circle cx="6" cy="2" r="1" />
            <circle cx="6" cy="6" r="1" />
            <circle cx="6" cy="10" r="1" />
          </svg>
        </div>
      )}

      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={isComplete ? tick : not_tick} alt="" className="w-7" />
        {isEditing ? (
          <input
            className="ml-4 text-[17px] flex-1 border rounded px-2 py-1"
            value={editValue}
            onChange={handleEditChange}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className="flex-1">
            <p
              className={`text-slate-700 ml-4 text-[17px] 
            ${isComplete ? "line-through" : ""}`}
            >
              {text}
            </p>
            <div className="ml-4 flex flex-wrap gap-2 mt-1">
              {tag && (
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs 
                font-medium capitalize
                ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              )}
              {deadline && !isComplete && (
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                  ${deadlineInfo?.text || "text-gray-500"} ${
                    deadlineInfo?.status === "overdue"
                      ? "bg-red-100"
                      : deadlineInfo?.status === "today"
                      ? "bg-yellow-100"
                      : deadlineInfo?.status === "tomorrow"
                      ? "bg-orange-100"
                      : deadlineInfo?.status === "soon"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  {formatDeadline(deadline)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <img
        src={edit_icon}
        alt=""
        className="w-3.5 cursor-pointer"
        onClick={handleEdit}
      />
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

export default TodoItem;
