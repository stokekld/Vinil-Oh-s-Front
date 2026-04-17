import { useState, Suspense } from 'react';
import { useEvents } from '../hooks/useEvents';
import { EventsMap } from '../components/EventsMap';
import { EventsList } from '../components/EventsList';
import { filterEventsByDate } from '../utils/eventFilters';

interface EventsPageProps {
  // Props can be added here when needed
}

export function EventsPage({}: EventsPageProps) {
  const [filter, setFilter] = useState<'today' | 'week'>('today');
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  
  const { venues, loading, error } = useEvents();

  const handleFilterChange = (newFilter: 'today' | 'week') => {
    setFilter(newFilter);
    setSelectedEventId(null);
  };

  const handleEventSelect = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const venuesToDisplay = venues;
  const visibleEvents = filterEventsByDate(venuesToDisplay, filter);

  return (
    <div className="events-container">
      <div className="events-header">
        {error && (
          <div style={{ fontSize: '0.85rem', color: '#ff6b6b', marginBottom: '0.5rem' }}>
            Using offline data: {error}
          </div>
        )}
        {loading && venues.length === 0 && (
          <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
            Loading events...
          </div>
        )}
        <div className="filters">
          <span className="filters-label">Filtro:</span>
          <button
            className={`btn-filter ${filter === 'today' ? 'active' : ''}`}
            onClick={() => handleFilterChange('today')}
            disabled={loading && venues.length === 0}
          >
            Hoy
          </button>
          <button
            className={`btn-filter ${filter === 'week' ? 'active' : ''}`}
            onClick={() => handleFilterChange('week')}
            disabled={loading && venues.length === 0}
          >
            Esta Semana
          </button>
        </div>
      </div>
      <Suspense fallback={<div style={{ flex: 1 }} />}>
        <EventsMap
          venues={venuesToDisplay}
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
