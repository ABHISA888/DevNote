import ActionButton from './ActionButton';
import { Plus, CheckSquare, FileText, Code2 } from 'lucide-react';
import { Github } from '../common/BrandIcons';

/**
 * 🎓 TEACHING MOMENT: QuickActions.jsx
 * 
 * WHY THIS EXISTS:
 * Groups the primary actions the user can take. We separate this from the rest of the layout
 * because these buttons might later need to dispatch modals or context menus.
 */
export default function QuickActions({
  onNewProject,
  onAddTask,
  onCreateNote,
  onSaveApi,
  onImportGithub
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <ActionButton label="New Project" icon={Plus} variant="primary" onClick={onNewProject} />
      <ActionButton label="Add Task" icon={CheckSquare} variant="outline" onClick={onAddTask} />
      <ActionButton label="Create Note" icon={FileText} variant="outline" onClick={onCreateNote} />
      
      {/* Spacer to push Github button to right if there is room */}
      <div className="flex-1" />
      
      <ActionButton label="Import GitHub Repository" icon={Github} variant="dark" onClick={onImportGithub} />
    </div>
  );
}
