import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { NormalizedVenue, Event } from '../types';

// Fix for Leaflet default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface EventsMapProps {
  venues: NormalizedVenue[];
  filter: 'today' | 'week';
  selectedEventId: number | null;
  onEventSelect: (eventId: number) => void;
}

const mapCenter: [number, number] = [20.0858, -98.3611];
const zoomLevel = 15;

export function EventsMap({
  venues,
  filter,
  selectedEventId,
  onEventSelect,
}: EventsMapProps) {
  const markersRef = useRef<Record<number, L.Marker>>({});

  useEffect(() => {
    // Highlight selected marker
    Object.entries(markersRef.current).forEach(([eventId, marker]) => {
      const markerElement = marker.getElement();
      if (markerElement) {
        if (parseInt(eventId) === selectedEventId) {
          markerElement.classList.add('highlight-marker');
          marker.openPopup();
        } else {
          markerElement.classList.remove('highlight-marker');
        }
      }
    });
  }, [selectedEventId]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      style={{ width: '100%', height: '100%' }}
      className="leaflet-container"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {venues.map((venue) =>
        venue.events.map((event) => {
          const eventDate = new Date(event.date);
          const shouldShow = isEventVisible(event, filter);

          return (
            <Marker
              key={event.id}
              position={[venue.lat, venue.lng]}
              opacity={shouldShow ? 1 : 0.3}
              eventHandlers={{
                click: () => onEventSelect(event.id),
              }}
              ref={(marker) => {
                if (marker) {
                  markersRef.current[event.id] = marker;
                }
              }}
            >
              <Popup>
                <div className="event-popup">
                  <h3>{event.name}</h3>
                  <p className="event-popup-venue">{venue.name}</p>
                  <p className="event-popup-date">
                    {eventDate.toLocaleDateString('es-MX')} · {eventDate.toLocaleTimeString('es-MX', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {event.links.instagram && (
                    <a
                      href={event.links.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="event-popup-link"
                    >
                      Instagram →
                    </a>
                  )}
                  {event.links.facebook && (
                    <a
                      href={event.links.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="event-popup-link"
                    >
                      Facebook →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })
      )}
    </MapContainer>
  );
}

/**
 * Filtra eventos por fecha según el filtro
 * Base date: 2026-03-28 (del mockup)
 */
function isEventVisible(event: Event, filter: 'today' | 'week'): boolean {
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);

  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);

  if (filter === 'today') {
    return eventDate.getTime() === baseDate.getTime();
  }

  if (filter === 'week') {
    const weekEnd = new Date(baseDate);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return eventDate >= baseDate && eventDate <= weekEnd;
  }

  return true;
}
