import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyWorkPanel, { Client, INITIAL_CLIENTS } from './components/MyWorkPanel';
import WorkspacePanel from './components/WorkspacePanel';
import ModuleNavPanel from './components/ModuleNavPanel';
import ModuleWorkspace from './components/ModuleWorkspace';
import { ClientDetails } from './types';
import { DANISAN_DETAILS_DATABASE } from './data/clientDb';

const createDetailsFromClient = (c: Client): ClientDetails => {
  return {
    id: c.id,
    name: c.name,
    clientNumber: 'DNS-' + Math.floor(1000 + Math.random() * 9000),
    avatar: c.avatar,
    status: c.status,
    ageGroup: c.ageGroup,
    phone: c.phone,
    whatsapp: c.phone,
    email: c.email,
    age: c.ageGroup === 'Çocuk' ? 10 : 35,
    birthDate: c.ageGroup === 'Çocuk' ? '2016-01-01' : '1991-01-01',
    registrationDate: c.registrationDate,
    nextAppointment: c.nextAppointment || 'Yok',
    lastAppointment: c.lastAppointment || 'Yok',
    activePlan: c.activePlan,
    remainingBalance: c.paymentStatus === 'Borçlu' ? 1500 : 0,
    address: 'Girilmedi',
    city: 'İstanbul',
    district: 'Şişli',
    country: 'Türkiye',
    preferredContactMethod: 'WhatsApp',
    contactConsent: true,
    parentPrimaryName: c.parentName || undefined,
    parentPrimaryRelation: c.parentName ? 'Ebeveyn' : undefined,
    parentPrimaryPhone: c.parentName ? c.phone : undefined,
    parentPrimaryEmail: c.parentName ? c.email : undefined,
    appointments: [],
    plans: c.activePlan !== 'Yok' ? [
      {
        name: c.activePlan,
        status: 'Aktif',
        totalSessions: c.planRemainingSessions + 2,
        usedSessions: 2,
        remainingSessions: c.planRemainingSessions,
        startDate: c.registrationDate,
        endDate: '2026-10-20',
        usageHistory: [],
        note: 'Otomatik tanımlanan plan paketi'
      }
    ] : [],
    payments: {
      totalPlanAmount: c.paymentStatus === 'Borçlu' ? 3000 : 1500,
      paidAmount: c.paymentStatus === 'Borçlu' ? 1500 : 1500,
      remainingAmount: c.paymentStatus === 'Borçlu' ? 1500 : 0,
      upcomingPayment: c.paymentStatus === 'Borçlu' ? 'Yakında' : 'Yok',
      overduePayment: 'Yok',
      installments: [],
      history: [],
      discounts: [],
      refunds: []
    },
    documents: [],
    contactHistory: [],
    notes: { admin: '', appointment: '', payment: '', plan: '' },
    auditLog: [
      {
        id: 'audit-1',
        date: c.registrationDate + ' 10:00',
        action: 'Oluşturulma',
        detail: 'Yeni danışan kaydı sistem üzerinden oluşturuldu.',
        user: 'Ömer Yiğitler'
      }
    ]
  };
};

const syncClientFromDetails = (details: ClientDetails, originalClient?: Client): Client => {
  return {
    id: details.id,
    name: details.name,
    avatar: details.avatar,
    phone: details.phone,
    email: details.email,
    status: details.status,
    ageGroup: details.ageGroup,
    service: originalClient?.service || (details.appointments.length > 0 ? details.appointments[0].service : 'Diyet ve Beslenme'),
    activePlan: details.activePlan,
    paymentStatus: details.payments.remainingAmount > 0 ? 'Borçlu' : 'Ödendi',
    registrationDate: details.registrationDate,
    lastAppointment: details.lastAppointment || '',
    nextAppointment: details.nextAppointment || '',
    parentName: details.parentPrimaryName || '',
    source: originalClient?.source || 'Web Sitesi',
    planRemainingSessions: details.plans.length > 0 ? details.plans[0].remainingSessions : 0,
    isNew: originalClient?.isNew
  };
};

export default function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('danisanlar');
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [showOrta, setShowOrta] = useState(true);
  const [showSag, setShowSag] = useState(true);
  const [isCatVisible, setIsCatVisible] = useState(false);

  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [clientsDb, setClientsDb] = useState<Record<string, ClientDetails>>(DANISAN_DETAILS_DATABASE);

  const handleUpdateClientDetails = (id: string, updatedDetails: ClientDetails) => {
    setClientsDb(prev => ({
      ...prev,
      [id]: updatedDetails
    }));
    setClients(prev => prev.map(c => c.id === id ? syncClientFromDetails(updatedDetails, c) : c));
  };

  const handleDeleteClient = (id: string) => {
    setClientsDb(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setClients(prev => prev.filter(c => c.id !== id));
    setSelectedLeadId('');
  };

  const handleAddClient = (newlyCreated: Client) => {
    setClients(prev => [newlyCreated, ...prev]);
    const newlyCreatedDetails = createDetailsFromClient(newlyCreated);
    setClientsDb(prev => ({
      ...prev,
      [newlyCreated.id]: newlyCreatedDetails
    }));
  };

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
      <style>{`
        #dashboard-right-column > * {
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0) 33%,
              rgba(255, 255, 255, 0.82) 39%,
              #ffffff 44%,
              #ffffff 100%
            ),
            linear-gradient(
              105deg,
              #eaff7e 0%,
              #eff9b0 30%,
              #fff7eb 66%,
              #ffffff 100%
            ) !important;
          background-image:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0) 33%,
              rgba(255, 255, 255, 0.82) 39%,
              #ffffff 44%,
              #ffffff 100%
            ),
            linear-gradient(
              105deg,
              #eaff7e 0%,
              #eff9b0 30%,
              #fff7eb 66%,
              #ffffff 100%
            ) !important;
        }
      `}</style>

      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={handleMenuItemClick}
        isCatVisible={isCatVisible}
        onToggleCat={() => setIsCatVisible((visible) => !visible)}
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
                clients={clients}
                onAddClient={handleAddClient}
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
            <div id="dashboard-right-column" className="flex-1 min-w-0 flex">
              {usesExistingPanels ? (
                <WorkspacePanel
                  selectedLeadId={selectedLeadId}
                  activeMenuItem={activeMenuItem}
                  onSelectLead={handleSelectLead}
                  clientsDb={clientsDb}
                  onUpdateClientDetails={handleUpdateClientDetails}
                  onDeleteClient={handleDeleteClient}
                />
              ) : (
                <ModuleWorkspace
                  activeMenuItem={activeMenuItem}
                  selectedItemId={selectedLeadId}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {isCatVisible && (
        <iframe
          title="Kedi animasyonu"
          aria-hidden="true"
          tabIndex={-1}
          src="/yonetim/kedi/index.html?mode=widget"
          className="pointer-events-none fixed inset-0 z-[70] h-screen w-screen border-0 bg-transparent"
        />
      )}
    </div>
  );
}
