import { Stats } from '../types';

export class LavalinkStats {
    public readonly serverId: string;
    public readonly players: number;
    public readonly playingPlayers: number;
    public readonly uptime: number;
    public readonly memory: {
        free: number;
        used: number;
        allocated: number;
        reservable: number;
        freeFormatted: string;
        usedFormatted: string;
        allocatedFormatted: string;
        reservableFormatted: string;
    };
    public readonly cpu: {
        cores: number;
        systemLoad: number;
        lavalinkLoad: number;
        systemLoadFormatted: string;
        lavalinkLoadFormatted: string;
    };

    constructor(serverId: string, data: Stats) {
        this.serverId = serverId;
        this.players = data.players;
        this.playingPlayers = data.playingPlayers;
        this.uptime = data.uptime;
        
        this.memory = {
            free: data.memory.free,
            used: data.memory.used,
            allocated: data.memory.allocated,
            reservable: data.memory.reservable,
            freeFormatted: LavalinkStats.formatBytes(data.memory.free),
            usedFormatted: LavalinkStats.formatBytes(data.memory.used),
            allocatedFormatted: LavalinkStats.formatBytes(data.memory.allocated),
            reservableFormatted: LavalinkStats.formatBytes(data.memory.reservable)
        };
        
        this.cpu = {
            cores: data.cpu.cores,
            systemLoad: data.cpu.systemLoad,
            lavalinkLoad: data.cpu.lavalinkLoad,
            systemLoadFormatted: LavalinkStats.formatPercentage(data.cpu.systemLoad),
            lavalinkLoadFormatted: LavalinkStats.formatPercentage(data.cpu.lavalinkLoad)
        };
        
    }

    get memoryUsagePercentage(): number {
        return (this.memory.used / this.memory.allocated) * 100;
    }

    get memoryUsagePercentageFormatted(): string {
        return LavalinkStats.formatPercentage(this.memoryUsagePercentage / 100);
    }

    get formattedUptime(): string {
        const seconds = Math.floor(this.uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
    }

    static formatBytes(bytes: number): string {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 B';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }

    static formatPercentage(value: number): string {
        return `${(value * 100).toFixed(2)}%`;
    }
}