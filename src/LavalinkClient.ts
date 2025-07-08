import axios, { AxiosInstance } from 'axios';
import { Stats, ErrorResponse, ServerConfig, Config } from './types';
import { LavalinkError, LavalinkStats } from './structures';

export class LavalinkClient {
    private readonly clients: Map<string, AxiosInstance>;

    constructor(config: Config) {
        this.clients = new Map();

        config.nodes.forEach((server: ServerConfig) => {
            const { id, host, port, password, secure = false, version = 'v4' } = server;
            const protocol = secure ? 'https' : 'http';
            const baseURL = `${protocol}://${host}:${port}/${version}`;
            const client = axios.create({
                baseURL,
                headers: { Authorization: password },
            });
            this.clients.set(id, client);
        });
    }

    async getServerIds(): Promise<string[]> {
        return Array.from(this.clients.keys());
    }

    async getStats(serverId: string): Promise<LavalinkStats> {
        const client = this.clients.get(serverId);
        if (!client) throw new Error(`No client found for server ID: ${serverId}`);

        try {
            return new LavalinkStats(serverId, (await client.get<Stats>('/stats')).data);
        } catch (error: any) {
            if (error.response?.data) throw new LavalinkError(error.response.data as ErrorResponse);
            throw new Error(`Failed to fetch stats for server ID: ${serverId}. Error: ${error.message}`);
        }
    }

    async getAllStats(): Promise<LavalinkStats[]> {
        const statsPromises = Array.from(this.clients.keys()).map((id) => this.getStats(id));
        return Promise.all(statsPromises);
    }
}