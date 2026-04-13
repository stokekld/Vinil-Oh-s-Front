import { useState, Suspense } from 'react';
import { venues } from '../data/events';
import { EventsMap } from '../components/EventsMap';
import { EventsList } from '../components/EventsList';
import { filterEventsByDate } from '../utils/eventFilters';

interface EventsPageProps {
  // Props can be added here when needed
}

export function EventsPage({}: EventsPageProps) {
  const [filter, setFilter] = useState<'today' | 'week'>('today');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleFilterChange = (newFilter: 'today' | 'week') => {
    setFilter(newFilter);
    setSelectedEventId(null);
  };

  const handleEventSelect = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const visibleEvents = filterEventsByDate(venues, filter);

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>Local Events - Tulancingo</h2>
        <div className="filters">
          <span className="filters-label">Filter:</span>
          <button
            className={`btn-filter ${filter === 'today' ? 'active' : ''}`}
            onClick={() => handleFilterChange('today')}
          >
            Today
          </button>
          <button
            className={`btn-filter ${filter === 'week' ? 'active' : ''}`}
            onClick={() => handleFilterChange('week')}
          >
            This Week
          </button>
        </div>
      </div>
      <Suspense fallback={<div style={{ flex: 1 }} />}>
        <EventsMap
          venues={venues}
          filter={filter}
          selectedEventId={selectedEventId}
          onEventSelect={handleEventSelect}
        />
      </Suspense>
      <EventsList
        events={visibleEvents}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
      />
    </div>
  );
}
