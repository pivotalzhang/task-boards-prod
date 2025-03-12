import React from 'react';
import { Task } from '../types';
import { Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string, columnId: string) => void;
  columnId: string;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, columnId, onDeleteTask }) => {
  return (
    <div
      className="bg-white p-3 rounded-md shadow-sm mb-2 cursor-move hover:shadow-md transition-shadow group"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(task.id, columnId);
          }}
          className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
