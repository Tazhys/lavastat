export interface ServerConfig {
    id: string;
    host: string;
    port: number;
    password: string;
    secure?: boolean;
    version?: string;
}

export interface Config {
    nodes: ServerConfig[];
};