import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string, columnId: string) => void;
  columnId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, columnId }) => {
  return (
    <div
      className="bg-white p-3 rounded-md shadow-sm mb-2 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
    >
      <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskCard;
