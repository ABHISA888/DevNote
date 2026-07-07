import ActionButton from './ActionButton';
import { Plus, CheckSquare, FileText, Code2, Github } from 'lucide-react';

/**
 * 🎓 TEACHING MOMENT: QuickActions.jsx
 * 
 * WHY THIS EXISTS:
 * Groups the primary actions the user can take. We separate this from the rest of the layout
 * because these buttons might later need to dispatch modals or context menus.
 */
export default function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <ActionButton label="New Project" icon={Plus} variant="primary" />
      <ActionButton label="Add Task" icon={CheckSquare} variant="outline" />
      <ActionButton label="Create Note" icon={FileText} variant="outline" />
      <ActionButton label="Save API" icon={Code2} variant="outline" />
      
      {/* Spacer to push Github button to right if there is room */}
      <div className="flex-1" />
      
      <ActionButton label="Import GitHub Repository" icon={Github} variant="dark" />
    </div>
  );
}
