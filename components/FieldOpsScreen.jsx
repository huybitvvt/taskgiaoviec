import { useState } from 'react';
import { StandaloneScheduleView } from './StandaloneScheduleView.jsx';
import { PersonalScheduleView } from './PersonalScheduleView.jsx';
import { LaborReportView } from './LaborReportView.jsx';
import { isAdmin } from '../lib/permissions.js';

const LABELS = {
  options: 'Schedule options',
  hideOptions: 'Hide options',
  team: 'Team schedule',
  personal: 'Personal schedule',
  labor: 'Labor report',
};

export function FieldOpsScreen({ products, people, accessRole, defaultTab = 'schedule', onOpenNode }) {
  const [tab, setTab] = useState(defaultTab);
  const [controlsOpen, setControlsOpen] = useState(false);
  const showLabor = isAdmin(accessRole);
  const activeTabLabel = tab === 'schedule'
    ? LABELS.team
    : tab === 'personal'
      ? LABELS.personal
      : LABELS.labor;

  return (
    <div className="field-ops-screen">
      <div className="field-ops-controls-head">
        <button
          type="button"
          className="field-ops-controls-toggle"
          aria-expanded={controlsOpen}
          onClick={() => setControlsOpen((open) => !open)}
        >
          <span>{controlsOpen ? LABELS.hideOptions : LABELS.options}</span>
          <strong>{activeTabLabel}</strong>
        </button>
      </div>

      {controlsOpen && (
        <div className="field-ops-tabs">
          <button
            type="button"
            className={`filter-pill ${tab === 'schedule' ? 'active' : ''}`}
            onClick={() => setTab('schedule')}
          >
            {LABELS.team}
          </button>
          <button
            type="button"
            className={`filter-pill ${tab === 'personal' ? 'active' : ''}`}
            onClick={() => setTab('personal')}
          >
            {LABELS.personal}
          </button>
          {showLabor && (
            <button
              type="button"
              className={`filter-pill ${tab === 'labor' ? 'active' : ''}`}
              onClick={() => setTab('labor')}
            >
              {LABELS.labor}
            </button>
          )}
        </div>
      )}

      {tab === 'schedule' ? (
        <StandaloneScheduleView products={products} people={people} />
      ) : tab === 'personal' ? (
        <PersonalScheduleView
          products={products}
          people={people}
          embedded
          onOpenNode={onOpenNode}
          showControls={controlsOpen}
        />
      ) : (
        <LaborReportView products={products} people={people} accessRole={accessRole} embedded />
      )}
    </div>
  );
}
