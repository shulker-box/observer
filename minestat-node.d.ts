declare module 'minestat-node' {
  export default class MineStat {
    constructor(host: string, port: number);
    ping(): Promise<void>;
    readonly online: boolean;
    readonly current_players: string;
    readonly max_players: string;
  }
}