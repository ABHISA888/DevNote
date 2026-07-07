import { useState } from 'react';
import ApiHeader from './ApiHeader';
import ApiStats from './ApiStats';
import CollectionSidebar from './CollectionSidebar';
import ApiViewer from './ApiViewer';
import EnvironmentSelector from './EnvironmentSelector';
import AuthenticationCard from './AuthenticationCard';

import { 
  MOCK_COLLECTIONS, 
  MOCK_ENDPOINTS, 
  RECENTLY_VIEWED, 
  API_STATS,
  ACTIVE_ENVIRONMENTS 
} from '../../../mock/apis';

/**
 * 🎓 TEACHING MOMENT: ApisTab.jsx
 * 
 * WHY THIS EXISTS:
 * This component is the orchestrator for the entire API Documentation feature.
 * It holds local state (active collection, active environment) and bridges the gap
 * between the sidebar navigation and the center API viewer.
 */
export default function ApisTab() {
  const [activeCollectionId, setActiveCollectionId] = useState(MOCK_COLLECTIONS[0]?.id);
  const [activeEnvId, setActiveEnvId] = useState(ACTIVE_ENVIRONMENTS[0]?.id);

  // Derive the active endpoint (for now, simply grabbing the first one matching the collection)
  // In a real app, you'd select the endpoint explicitly from a list inside the collection folder.
  const activeEndpoint = MOCK_ENDPOINTS.find(ep => ep.collectionId === activeCollectionId);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Module Level Actions */}
      <ApiHeader />
      
      {/* High-level Statistics */}
      <ApiStats stats={API_STATS} />
      
      {/* 3-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Navigation */}
        <CollectionSidebar 
          collections={MOCK_COLLECTIONS}
          recent={RECENTLY_VIEWED}
          activeCollectionId={activeCollectionId}
          onCollectionSelect={setActiveCollectionId}
        />
        
        {/* Center Column: API Documentation */}
        <ApiViewer activeEndpoint={activeEndpoint} />

        {/* Right Column: Context/Settings */}
        <div className="flex flex-col gap-6 w-full lg:w-[260px] shrink-0">
          <EnvironmentSelector 
            environments={ACTIVE_ENVIRONMENTS}
            activeEnvId={activeEnvId}
            onEnvChange={setActiveEnvId}
          />
          <AuthenticationCard />
        </div>

      </div>
    </div>
  );
}
