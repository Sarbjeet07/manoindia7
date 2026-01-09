
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export enum BookingCategory {
  ARTISTS = 'Artists',
  VENUES = 'Venues',
  MANAGERS = 'Event Managers'
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}
