import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyWorkPanel from './components/MyWorkPanel';
import WorkspacePanel from './components/WorkspacePanel';
import ModuleNavPanel from './components/ModuleNavPanel';
import ModuleWorkspace from './components/ModuleWorkspace';

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('danisanlar');
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [showOrta, setShowOrta] = useState(true);
  const [showSag, setShowSag] = useState(true);

  const handleMenuItemClick = (itemId: string) => {
    if (activeMenuItem === itemId) {
      setShowOrta(prev => {
        const nextVal = !prev;
        if (!nextVal) {
          setShowSag(false);
        }
        return nextVal;
      });
    } else {
      setActiveMenuItem(itemId);
      setShowOrta(true);
      setShowSag(true);
      if (itemId === 'ana-panel') {
        setSelectedLeadId('genel-bakis');
      } else {
        setSelectedLeadId('');
      }
    }
  };

  const handleSelectLead = (leadId: string) => {
    if (!showOrta) return;

    if (selectedLeadId === leadId) {
      setShowSag(prev => !prev);
    } else {
      setSelectedLeadId(leadId);
      setShowSag(true);
    }
  };

  const usesExistingPanels = activeMenuItem === 'danisanlar' || activeMenuItem === 'ana-panel';

  return (
    <div id="app-root-layout" className="flex h-screen bg-crm-sidebar text-[#323130] overflow-hidden font-sans">
      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={handleMenuItemClick}
      />

      <div className="flex-1 bg-crm-sidebar h-screen flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex gap-2 pl-1 pr-6 pb-6 overflow-hidden">
          {showOrta && (
            usesExistingPanels ? (
              <MyWorkPanel
                selectedLeadId={showSag ? selectedLeadId : ''}
                onSelectLead={handleSelectLead}
                activeMenuItem={activeMenuItem}
              />
            ) : (
              <ModuleNavPanel
                activeMenuItem={activeMenuItem}
                selectedItemId={showSag ? selectedLeadId : ''}
                onSelectItem={handleSelectLead}
              />
            )
          )}

          {showOrta && showSag && (
            usesExistingPanels ? (
              <WorkspacePanel
                selectedLeadId={selectedLeadId}
                activeMenuItem={activeMenuItem}
                onSelectLead={handleSelectLead}
              />
            ) : (
              <ModuleWorkspace
                activeMenuItem={activeMenuItem}
                selectedItemId={selectedLeadId}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
