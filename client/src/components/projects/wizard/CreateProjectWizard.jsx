import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

import StepIndicator from './StepIndicator';
import BasicInfoStep from './BasicInfoStep';
import ConfigurationStep from './ConfigurationStep';
import IntegrationsStep from './IntegrationsStep';
import TimelineStep from './TimelineStep';
import ReviewStep from './ReviewStep';
import { projectService } from '../../../services/api/projectService';

/**
 * 🎓 TEACHING MOMENT: CreateProjectWizard.jsx
 *
 * WHY ONE MODAL FOR BOTH CREATE AND EDIT?
 * The 5 step sub-components (BasicInfoStep, ConfigurationStep, …) are fully
 * controlled — they receive `projectData` and `onChange`, and know nothing
 * about whether we're creating or editing. This means the wizard shell can
 * simply seed state differently on open and call a different callback on submit.
 *
 * mode="create"  → seeds from INITIAL_PROJECT_DATA, submit calls onProjectCreated
 * mode="edit"    → seeds from initialData (existing project), submit calls onProjectUpdated
 *
 * WHY useEffect TO RE-SEED?
 * If we only seeded in useState() the state would be stale after the first open.
 * useEffect([isOpen]) ensures fresh data every time the dialog is toggled.
 *
 * FUTURE BACKEND INTEGRATION:
 * Create:  POST   /api/projects
 * Edit:    PATCH  /api/projects/:id
 * Only the callback body changes — zero component restructuring.
 */

const INITIAL_PROJECT_DATA = {
  name: '',
  description: '',
  category: '',
  visibility: 'private',
  isFavorite: false,
  templateId: 'blank',
  techStack: [],
  priority: 'Medium',
  estimatedDuration: '',
  githubUrl: '',
  figmaUrl: '',
  apiDocUrl: '',
  postmanUrl: '',
  deploymentUrl: '',
  startDate: '',
  deadline: '',
  reminderToggle: false,
  reminderDaysBefore: 1,
  teamMembers: []
};

/**
 * @param {object}  props
 * @param {boolean}  props.isOpen
 * @param {function} props.onClose
 * @param {'create'|'edit'} [props.mode='create']
 * @param {object|null}    [props.initialData=null]  — existing project's _raw wizard data
 * @param {function} [props.onProjectCreated]
 * @param {function} [props.onProjectUpdated]
 */
export default function CreateProjectWizard({
  isOpen,
  onClose,
  mode = 'create',
  initialData = null,
  onProjectCreated,
  onProjectUpdated,
}) {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState(INITIAL_PROJECT_DATA);

  // Helper to format Date string to YYYY-MM-DD for date inputs
  const formatDateToInput = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return '';
      return d.toISOString().split('T')[0];
    } catch (err) {
      return '';
    }
  };

  // Re-seed state each time the modal opens so stale data never leaks.
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (mode === 'edit' && initialData) {
        setProjectData({
          ...INITIAL_PROJECT_DATA,
          ...initialData,
          startDate: formatDateToInput(initialData.startDate),
          deadline: formatDateToInput(initialData.deadline),
        });
      } else {
        setProjectData(INITIAL_PROJECT_DATA);
      }
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleUpdate = (fields) => {
    setProjectData((prev) => ({ ...prev, ...fields }));
  };

  const handleEditStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          projectData.name.trim() !== '' &&
          projectData.description.trim() !== '' &&
          projectData.category !== ''
        );
      case 2:
        return projectData.techStack.length > 0;
      case 3:
        return true; // Optional fields
      case 4:
        if (!projectData.deadline) return false;
        if (projectData.startDate && projectData.deadline) {
          return new Date(projectData.deadline) >= new Date(projectData.startDate);
        }
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    } else {
      toast.error('Please complete all required fields and verify configurations.');
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateProject = async () => {
    try {
      // 🎓 TEACHING MOMENT: Data Integrity Mapping
      // Before posting, we transform the local UI state fields to strict backend schema types.
      const payload = {
        name: String(projectData.name || '').trim(),
        description: String(projectData.description || '').trim(),
        category: projectData.category || undefined,
        visibility: projectData.visibility || 'private',
        isFavorite: Boolean(projectData.isFavorite),
        isPinned: Boolean(projectData.isPinned),
        templateId: projectData.templateId || 'blank',
        themeColor: projectData.themeColor || '#6366f1',
        techStack: Array.isArray(projectData.techStack) ? projectData.techStack.map(String) : [],
        priority: projectData.priority || 'Medium',
        estimatedDuration: String(projectData.estimatedDuration || '').trim() || undefined,
        githubUrl: String(projectData.githubUrl || '').trim() || undefined,
        figmaUrl: String(projectData.figmaUrl || '').trim() || undefined,
        apiDocUrl: String(projectData.apiDocUrl || '').trim() || undefined,
        postmanUrl: String(projectData.postmanUrl || '').trim() || undefined,
        deploymentUrl: String(projectData.deploymentUrl || '').trim() || undefined,
        reminderToggle: Boolean(projectData.reminderToggle),
        reminderDaysBefore: Number(projectData.reminderDaysBefore || 1),
        teamMembers: projectData.teamMembers || [],
        status: projectData.status || 'Todo'
      };

      // Ensure dates are parsed only if they are not empty, preventing CastError
      if (projectData.startDate && projectData.startDate.trim() !== '') {
        payload.startDate = new Date(projectData.startDate).toISOString();
      }
      if (projectData.deadline && projectData.deadline.trim() !== '') {
        payload.deadline = new Date(projectData.deadline).toISOString();
      }

      console.log('Final serialized payload for backend:', payload);

      const result = await projectService.createProject(payload);
      
      if (result.success) {
        toast.success(`Successfully initialized project: ${result.data.name}!`);
        onProjectCreated && onProjectCreated(result.data);
        
        // Reset state & Close modal
        setStep(1);
        setProjectData(INITIAL_PROJECT_DATA);
        onClose();
      } else {
        toast.error(result.message || 'Failed to create project.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      const serverMessage = error.response?.data?.message || error.response?.data?.errors?.join(', ') || 'Failed to connect to server.';
      toast.error(serverMessage);
    }
  };

  const handleUpdateProject = async () => {
    try {
      const payload = {
        name: String(projectData.name || '').trim(),
        description: String(projectData.description || '').trim(),
        category: projectData.category || undefined,
        visibility: projectData.visibility || 'private',
        isFavorite: Boolean(projectData.isFavorite),
        isPinned: Boolean(projectData.isPinned),
        templateId: projectData.templateId || 'blank',
        themeColor: projectData.themeColor || '#6366f1',
        techStack: Array.isArray(projectData.techStack) ? projectData.techStack.map(String) : [],
        priority: projectData.priority || 'Medium',
        estimatedDuration: String(projectData.estimatedDuration || '').trim() || undefined,
        githubUrl: String(projectData.githubUrl || '').trim() || undefined,
        figmaUrl: String(projectData.figmaUrl || '').trim() || undefined,
        apiDocUrl: String(projectData.apiDocUrl || '').trim() || undefined,
        postmanUrl: String(projectData.postmanUrl || '').trim() || undefined,
        deploymentUrl: String(projectData.deploymentUrl || '').trim() || undefined,
        reminderToggle: Boolean(projectData.reminderToggle),
        reminderDaysBefore: Number(projectData.reminderDaysBefore || 1),
        teamMembers: projectData.teamMembers || [],
        status: projectData.status || 'Todo'
      };

      if (projectData.startDate && projectData.startDate.trim() !== '') {
        payload.startDate = new Date(projectData.startDate).toISOString();
      }
      if (projectData.deadline && projectData.deadline.trim() !== '') {
        payload.deadline = new Date(projectData.deadline).toISOString();
      }

      const projectId = projectData._id || projectData.id;
      const result = await projectService.updateProject(projectId, payload);
      
      if (result.success) {
        toast.success(`Successfully updated project: ${result.data.name}!`);
        onProjectUpdated && onProjectUpdated(result.data);
        onClose();
      } else {
        toast.error(result.message || 'Failed to update project.');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      const serverMessage = error.response?.data?.message || error.response?.data?.errors?.join(', ') || 'Failed to connect to server.';
      toast.error(serverMessage);
    }
  };

  const handleSubmit = async () => {
    if (mode === 'edit') {
      await handleUpdateProject();
    } else {
      await handleCreateProject();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep projectData={projectData} onChange={handleUpdate} />;
      case 2:
        return <ConfigurationStep projectData={projectData} onChange={handleUpdate} />;
      case 3:
        return <IntegrationsStep projectData={projectData} onChange={handleUpdate} />;
      case 4:
        return <TimelineStep projectData={projectData} onChange={handleUpdate} />;
      case 5:
        return <ReviewStep projectData={projectData} onEditStep={handleEditStep} />;
      default:
        return null;
    }
  };

  const progressPercent = (step / 5) * 100;
  const isNextDisabled = !validateStep();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4">
      {/* Centered modal container */}
      <div className="relative flex h-full w-full flex-col bg-[#f8f9fe] shadow-2xl transition-all sm:max-w-4xl sm:h-[85vh] sm:rounded-2xl overflow-hidden">
        
        {/* Progress Bar Header wrapper */}
        <div className="h-1 w-full bg-gray-100">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              {mode === 'edit' ? <Pencil size={16} /> : <Sparkles size={16} />}
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                {mode === 'edit' ? 'Edit Project' : 'Initialize Workspace'}
              </h2>
              <p className="text-[10px] font-semibold text-slate-400">DEVNOTE SYSTEM BUILDER</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close wizard"
          >
            <X size={18} />
          </button>
        </div>

        {/* Horizontal Step Nav Indicators */}
        <StepIndicator currentStep={step} />

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {renderStepContent()}
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={step === 1 ? onClose : handlePrev}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            {step === 1 ? 'Cancel' : <><ChevronLeft size={14} /> Back</>}
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`flex items-center gap-1.5 rounded-lg px-5 py-2 text-xs font-bold text-white shadow-md transition ${
                isNextDisabled
                  ? 'bg-slate-300 shadow-none cursor-not-allowed'
                  : 'bg-primary-600 shadow-primary-600/20 hover:bg-primary-700 active:scale-95'
              }`}
            >
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-primary-600/20 transition hover:bg-primary-700 active:scale-95"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Project'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
