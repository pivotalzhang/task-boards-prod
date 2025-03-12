import React from 'react';
import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

interface ColumnProps {
  column: ColumnType;
  onDragStart: (e: React.DragEvent, taskId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onAddTask: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask,
}) => {
  return (
    <div
      className="bg-gray-100 rounded-md p-3 w-72 flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-gray-700">{column.title}</h2>
        <span className="text-gray-500 text-sm">{column.tasks.length}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            columnId={column.id}
          />
        ))}
      </div>
      
      <button
        className="mt-2 flex items-center justify-center w-full py-2 bg-white rounded-md text-gray-600 hover:bg-gray-200 transition-colors"
        onClick={() => onAddTask(column.id)}
      >
        <Plus size={16} className="mr-1" />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default Column;
