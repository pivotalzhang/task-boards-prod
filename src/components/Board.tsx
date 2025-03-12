import React, { useState } from 'react';
import { Board as BoardType, Column as ColumnType, Task } from '../types';
import Column from './Column';
import AddTaskModal from './AddTaskModal';
import { Plus } from 'lucide-react';

interface BoardProps {
  initialBoard: BoardType;
}

const Board: React.FC<BoardProps> = ({ initialBoard }) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [activeTask, setActiveTask] = useState<{ id: string; columnId: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [addingColumn, setAddingColumn] = useState(false);

  const handleDragStart = (e: React.DragEvent, taskId: string, columnId: string) => {
    setActiveTask({ id: taskId, columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    
    if (activeTask) {
      const { id: taskId, columnId: sourceColumnId } = activeTask;
      
      if (sourceColumnId === columnId) return;
      
      const updatedBoard = { ...board };
      const sourceColumnIndex = updatedBoard.columns.findIndex(col => col.id === sourceColumnId);
      const targetColumnIndex = updatedBoard.columns.findIndex(col => col.id === columnId);
      
      if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
        const taskIndex = updatedBoard.columns[sourceColumnIndex].tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
          // Remove task from source column
          const [task] = updatedBoard.columns[sourceColumnIndex].tasks.splice(taskIndex, 1);
          
          // Add task to target column
          updatedBoard.columns[targetColumnIndex].tasks.push(task);
          
          setBoard(updatedBoard);
        }
      }
      
      setActiveTask(null);
    }
  };

  const handleAddTask = (columnId: string) => {
    setActiveColumn(columnId);
    setModalOpen(true);
  };

  const createTask = (title: string, description: string) => {
    if (!activeColumn) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description
    };
    
    const updatedBoard = { ...board };
    const columnIndex = updatedBoard.columns.findIndex(col => col.id === activeColumn);
    
    if (columnIndex !== -1) {
      updatedBoard.columns[columnIndex].tasks.push(newTask);
      setBoard(updatedBoard);
    }
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    const updatedBoard = { ...board };
    const columnIndex = updatedBoard.columns.findIndex(col => col.id === columnId);
    
    if (columnIndex !== -1) {
      updatedBoard.columns[columnIndex].tasks = updatedBoard.columns[columnIndex].tasks.filter(
        task => task.id !== taskId
      );
      setBoard(updatedBoard);
    }
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === '') return;
    
    const newColumn: ColumnType = {
      id: Date.now().toString(),
      title: newColumnTitle,
      tasks: []
    };
    
    setBoard({
      ...board,
      columns: [...board.columns, newColumn]
    });
    
    setNewColumnTitle('');
    setAddingColumn(false);
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 h-[calc(100vh-120px)]">
        {board.columns.map(column => (
          <Column
            key={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
        
        {addingColumn ? (
          <div className="bg-gray-100 rounded-md p-3 w-72 flex flex-col">
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Enter column title"
              className="p-2 border border-gray-300 rounded-md mb-2"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddColumn}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setAddingColumn(false);
                  setNewColumnTitle('');
                }}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAddingColumn(true)}
            className="bg-gray-100 rounded-md p-3 w-72 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            <span>Add Column</span>
          </button>
        )}
      </div>
      
      <AddTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTask={createTask}
      />
    </div>
  );
};

export default Board;
