export interface Event {
    id: number;
    timestamp: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface AppState {
    event: Event[];
    currentTimestamp: number;
}