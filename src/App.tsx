import React from 'react';
import Board from './components/Board';
import { Board as BoardType } from './types';
import { Trello } from 'lucide-react';

const initialBoard: BoardType = {
  columns: [
    {
      id: '1',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Research competitors',
          description: 'Analyze top 5 competitors in the market'
        },
        {
          id: '2',
          title: 'Create wireframes',
          description: 'Design initial wireframes for the dashboard'
        }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Implement authentication',
          description: 'Set up user login and registration'
        }
      ]
    },
    {
      id: '3',
      title: 'Review',
      tasks: [
        {
          id: '4',
          title: 'Code review',
          description: 'Review pull request #42'
        }
      ]
    },
    {
      id: '4',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Project setup',
          description: 'Initialize repository and configure build tools'
        }
      ]
    }
  ]
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Trello size={24} className="mr-2" />
          <h1 className="text-xl font-bold">React Task Board</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <Board initialBoard={initialBoard} />
      </main>
    </div>
  );
}

export default App;
