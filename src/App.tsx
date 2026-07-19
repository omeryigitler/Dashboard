import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyWorkPanel from './components/MyWorkPanel';
import WorkspacePanel from './components/WorkspacePanel';

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
      } else if (itemId === 'danisanlar') {
        setSelectedLeadId('');
      } else {
        setSelectedLeadId(''); // default or fallback
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

  return (
    <div id="app-root-layout" className="flex h-screen bg-crm-sidebar text-[#323130] overflow-hidden font-sans">
      
      {/* 1. LEFT SIDEBAR MENU */}
      <Sidebar 
        activeMenuItem={activeMenuItem} 
        setActiveMenuItem={handleMenuItemClick} 
      />

      {/* 2. RIGHT SIDE MAIN AREA - Header at the top directly on the sidebar background */}
      <div className="flex-1 bg-crm-sidebar h-screen flex flex-col overflow-hidden">
        <Header />
        
        {/* Main content container with My Work Panel and an empty workspace area */}
        <div className="flex-1 flex gap-2 pl-1 pr-6 pb-6 overflow-hidden">
          {showOrta && (
            <MyWorkPanel 
              selectedLeadId={showSag ? selectedLeadId : ''} 
              onSelectLead={handleSelectLead} 
              activeMenuItem={activeMenuItem}
            />
          )}
          
          {showOrta && showSag && (
            <WorkspacePanel 
              selectedLeadId={selectedLeadId} 
              activeMenuItem={activeMenuItem}
              onSelectLead={handleSelectLead}
            />
          )}
        </div>
      </div>

    </div>
  );
}
