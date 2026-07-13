'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createTask, updateTask, deleteTask } from '@/app/actions/projects';

export function NotionTaskEngine({ projectId, tasks, readOnly = false }: { projectId: string, tasks: any[], readOnly?: boolean }) {
  // Build a tree from flat tasks array
  const buildTree = (parentId: string | null): any[] => {
    return tasks
      .filter(t => t.parent_id === parentId)
      .map(t => ({ ...t, children: buildTree(t.id) }));
  };

  const taskTree = buildTree(null);
  
  const [isAddingRoot, setIsAddingRoot] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');

  const handleCreateRoot = async () => {
    if (!newTaskTitle) return;
    await createTask(projectId, { title: newTaskTitle, target_date: newTaskDate || null });
    setNewTaskTitle('');
    setNewTaskDate('');
    setIsAddingRoot(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Task Engine</h2>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted mt-1">Infinite nested tasks with Markdown</p>
        </div>
        {!readOnly && (
          <button 
            onClick={() => setIsAddingRoot(true)}
            className="font-mono text-xs uppercase tracking-widest text-ink hover:text-accent transition-colors"
          >
            + Add Root Task
          </button>
        )}
      </div>

      {isAddingRoot && (
        <div className="flex gap-2 p-4 border border-accent/50 bg-accent/5 rounded-sm">
          <input 
            type="text" 
            placeholder="Task title..."
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm outline-none"
            autoFocus
          />
          <input 
            type="date"
            value={newTaskDate}
            onChange={e => setNewTaskDate(e.target.value)}
            className="bg-transparent border-none text-xs font-mono outline-none text-muted"
          />
          <button onClick={handleCreateRoot} className="font-mono text-xs uppercase text-accent ml-2">Save</button>
          <button onClick={() => setIsAddingRoot(false)} className="font-mono text-xs uppercase text-muted ml-2">Cancel</button>
        </div>
      )}

      {taskTree.length === 0 && !isAddingRoot && (
        <div className="p-8 border border-border border-dashed bg-card/10 text-center text-muted font-mono text-xs uppercase tracking-widest rounded-sm">
          No tasks created yet.
        </div>
      )}

      <div className="space-y-1">
        {taskTree.map(task => (
          <TaskNode key={task.id} task={task} projectId={projectId} readOnly={readOnly} />
        ))}
      </div>
    </div>
  );
}

function TaskNode({ task, projectId, readOnly, depth = 0 }: { task: any, projectId: string, readOnly: boolean, depth?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  
  // Edit state
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [editDate, setEditDate] = useState(task.target_date || '');

  // New child state
  const [childTitle, setChildTitle] = useState('');
  const [childDate, setChildDate] = useState('');

  const toggleComplete = async () => {
    if (readOnly) return;
    await updateTask(task.id, projectId, { is_completed: !task.is_completed });
  };

  const handleSaveEdit = async () => {
    await updateTask(task.id, projectId, { 
      title: editTitle, 
      description: editDesc, 
      target_date: editDate || null 
    });
    setIsEditing(false);
  };

  const handleCreateChild = async () => {
    if (!childTitle) return;
    await createTask(projectId, { 
      title: childTitle, 
      parent_id: task.id, 
      target_date: childDate || null 
    });
    setChildTitle('');
    setChildDate('');
    setIsAddingChild(false);
    setIsOpen(true); // Open to show new child
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task and all its subtasks?')) {
      await deleteTask(task.id, projectId);
    }
  };

  return (
    <div className={`ml-${Math.min(depth * 4, 12)} mt-2`}>
      <div className="group flex flex-col border border-border bg-card/25 rounded-sm overflow-hidden">
        
        {/* Task Header row */}
        <div className="flex items-center p-3 gap-3 hover:bg-card/50 transition-colors">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-4 h-4 flex items-center justify-center text-muted hover:text-ink transition-colors"
          >
            {task.children.length > 0 || task.description ? (isOpen ? '▼' : '▶') : '•'}
          </button>
          
          <button 
            onClick={toggleComplete}
            disabled={readOnly}
            className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
              task.is_completed ? 'bg-accent border-accent text-paper' : 'border-muted bg-transparent hover:border-accent disabled:hover:border-muted'
            }`}
          >
            {task.is_completed && '✓'}
          </button>
          
          <div className="flex-1 flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <span className={`text-sm ${task.is_completed ? 'line-through text-muted' : 'text-ink'}`}>
              {task.title}
            </span>
            {task.target_date && (
              <span className="font-mono text-[0.6rem] uppercase tracking-widest px-2 py-0.5 border border-border rounded-sm text-muted">
                {task.target_date}
              </span>
            )}
          </div>
          
          {!readOnly && (
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-3 transition-opacity pr-2">
              <button onClick={() => setIsEditing(!isEditing)} className="font-mono text-[0.6rem] uppercase tracking-widest text-muted hover:text-ink">Edit</button>
              <button onClick={() => setIsAddingChild(!isAddingChild)} className="font-mono text-[0.6rem] uppercase tracking-widest text-muted hover:text-ink">+ Sub</button>
              <button onClick={handleDelete} className="font-mono text-[0.6rem] uppercase tracking-widest text-muted hover:text-red-500">Del</button>
            </div>
          )}
        </div>

        {/* Edit Mode */}
        {isEditing && (
          <div className="p-4 bg-card/50 border-t border-border grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm"
              />
              <input 
                type="date" 
                value={editDate}
                onChange={e => setEditDate(e.target.value)}
                className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm font-mono"
              />
            </div>
            <textarea 
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              placeholder="Markdown supported description..."
              className="bg-card border border-border px-3 py-2 text-sm outline-none focus:border-accent rounded-sm min-h-[100px]"
            />
            <div className="flex gap-4">
              <button onClick={handleSaveEdit} className="font-mono text-xs uppercase tracking-widest bg-accent text-paper px-4 py-2 rounded-sm">Save</button>
              <button onClick={() => setIsEditing(false)} className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink">Cancel</button>
            </div>
          </div>
        )}

        {/* Expanded View (Description) */}
        {isOpen && task.description && !isEditing && (
          <div className="p-4 pl-10 border-t border-border/50 bg-card/10 text-sm text-muted prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-card prose-pre:border prose-pre:border-border">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{task.description}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Add Subtask Input */}
      {isAddingChild && (
        <div className="flex gap-2 p-3 mt-2 ml-4 border border-accent/30 bg-accent/5 rounded-sm">
          <span className="text-muted text-sm">↳</span>
          <input 
            type="text" 
            placeholder="Subtask title..."
            value={childTitle}
            onChange={e => setChildTitle(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm outline-none"
            autoFocus
          />
          <input 
            type="date"
            value={childDate}
            onChange={e => setChildDate(e.target.value)}
            className="bg-transparent border-none text-xs font-mono outline-none text-muted"
          />
          <button onClick={handleCreateChild} className="font-mono text-xs uppercase text-accent ml-2">Save</button>
          <button onClick={() => setIsAddingChild(false)} className="font-mono text-xs uppercase text-muted ml-2">Cancel</button>
        </div>
      )}

      {/* Render Children Recursively */}
      {(isOpen || isAddingChild) && task.children.length > 0 && (
        <div className="pl-4 mt-2 border-l border-border/50">
          {task.children.map((child: any) => (
            <TaskNode key={child.id} task={child} projectId={projectId} readOnly={readOnly} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
