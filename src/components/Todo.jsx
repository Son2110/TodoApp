import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItem from "./TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();

  //tag
  const [selectedTag, setSelectedTag] = useState("work");
  const [customTag, setCustomTag] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [filterTag, setFilterTag] = useState("all");

  //deadline
  const [selectedDeadline, setSelectedDeadline] = useState("");

  const predefinedTags = ["Work", "Study", "Personal", "Health", "Shopping"];

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const tagToUse = selectedTag === "custom" ? customTag : selectedTag;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      tag: tagToUse,
      deadline: selectedDeadline || null,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";

    // Reset form fields
    setSelectedTag("Work");
    setSelectedDeadline("");

    //reset custom tag input
    if (selectedTag === "custom") {
      setCustomTag("");
      setShowCustomInput(false);
    }
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const editTodo = (id, newText) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  //handle tag change
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    if (tag === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomTag("");
    }
  };

  //filter
  const filteredTodos =
    filterTag === "all"
      ? todoList
      : todoList.filter((todo) => todo.tag === filterTag);

  const allTags = [
    "all",
    ...new Set(todoList.map((todo) => todo.tag).filter(Boolean)),
  ];

  //drag and drop handle
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return; //dropped outside the list
    }

    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoList(items);
  };
  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md
     flex flex-col p-7 min-h-[550px] rounded-xl"
    >
      {/* title */}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="todo_icon" />
        <h1 className="text-3xl font-semibold">Todo List</h1>
      </div>
      {/* tag add */}
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Tag:
        </label>
        <div className="flex flex-wrap gap-2">
          {predefinedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 rounded-full text-sm capitalize
              ${
                selectedTag === tag
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
          <button
            onClick={() => handleTagChange("custom")}
            className={`px-3 py-1 rounded-full text-sm 
            ${
              selectedTag === "custom"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Custom
          </button>
        </div>
      </div>
      {showCustomInput && (
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          placeholder="Enter custom tag"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-4"
        />
      )}

      {/* deadline */}
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deadline (Optional)
        </label>
        <input
          type="date"
          value={selectedDeadline}
          onChange={(e) => setSelectedDeadline(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* input box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none 
          flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 
        w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add
        </button>
      </div>

      {/* tag filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by tag:
        </label>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1 rounded-full text-sm capitalize
            ${
              filterTag === tag
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            >
              {tag} (
              {tag === "all"
                ? todoList.length
                : todoList.filter((todo) => todo.tag === tag).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* todolist with drag and drop */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? "bg-blue-50 rounded-lg" : ""
              }`}
            >
              {filteredTodos.map((item, index) => {
                return (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${
                          snapshot.isDragging
                            ? "transform rotate-2 shadow-lg"
                            : ""
                        }`}
                      >
                        <TodoItem
                          text={item.text}
                          id={item.id}
                          isComplete={item.isComplete}
                          tag={item.tag}
                          deadline={item.deadline}
                          deleteTodo={deleteTodo}
                          toggle={toggle}
                          onEdit={editTodo}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todo;
