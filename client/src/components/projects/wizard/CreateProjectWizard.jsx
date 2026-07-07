import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

import StepIndicator from './StepIndicator';
import BasicInfoStep from './BasicInfoStep';
import ConfigurationStep from './ConfigurationStep';
import IntegrationsStep from './IntegrationsStep';
import TimelineStep from './TimelineStep';
import ReviewStep from './ReviewStep';

/**
 * 🎓 TEACHING MOMENT: CreateProjectWizard.jsx
 * 
 * WHY THIS EXISTS:
 * This orchestrator component acts as the parent container for the multi-step project creation flow.
 * It houses the active wizard state, manages transition animations, and implements validation.
 * 
 * WHY A SINGLE SHARED STATE?
 * Keeping a single shared state object `projectData` at the wizard level allows us to:
 * - Validate the form state seamlessly before step transitions.
 * - Share data inputs directly down to child form components as read/write props.
 * - Build a complete review schema on the final step without intermediate serialization.
 * 
 * FUTURE BACKEND INTEGRATION:
 * The "Create Project" action on Step 5 will later send the full `projectData` payload to the backend:
 *   const response = await fetch('/api/projects', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(projectData)
 *   });
 */

const INITIAL_PROJECT_DATA = {
  name: '',
  description: '',
  category: '',
  visibility: 'private',
  isFavorite: false,
  templateId: 'blank',
  themeColor: '#6366f1',
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

export default function CreateProjectWizard({ isOpen, onClose, onProjectCreated }) {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState(INITIAL_PROJECT_DATA);

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

  const handleCreateProject = () => {
    // Backend API would be called here: axios.post('/api/projects', projectData)
    toast.success(`Successfully initialized project: ${projectData.name}!`);
    onProjectCreated && onProjectCreated(projectData);
    
    // Reset state & Close modal
    setStep(1);
    setProjectData(INITIAL_PROJECT_DATA);
    onClose();
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
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Wizard Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Initialize Workspace</h2>
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
                  : 'bg-indigo-600 shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95'
              }`}
            >
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCreateProject}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
            >
              Create Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
