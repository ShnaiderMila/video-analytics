export interface Zone {
    left: number;
    top: number;
    width: number;
    height: number;
  }

  export interface Event {
    id: number;
    timestamp: number;
    duration: number;
    zone: Zone;
  }
