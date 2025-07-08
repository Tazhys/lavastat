import { LavalinkClient } from '../LavalinkClient';
import { LavalinkStats } from '../structures';

describe('LavalinkClient', () => {
    let client: LavalinkClient;

    beforeAll(() => {
        client = new LavalinkClient({
            nodes: [
                {
                    id: 'server1',
                    host: 'localhost',
                    port: 2333,
                    password: 'youshallnotpass',
                    secure: false,
                    version: 'v4',
                },
                {
                    id: 'server2',
                    host: 'localhost',
                    port: 2334,
                    password: 'youshallnotpass',
                    secure: false,
                    version: 'v4',
                },
            ],
        });
    });

    test('should instantiate with multiple servers', async () => {
        expect(client).toBeInstanceOf(LavalinkClient);
        const serverIds = await client.getServerIds();
        expect(serverIds).toEqual(['server1', 'server2']);
    });

    test('should throw error for invalid server ID', async () => {
        await expect(client.getStats('invalid')).rejects.toThrow('No client found for server ID: invalid');
    });

    test.skip('should fetch stats for a single server', async () => {
        const stats = await client.getStats('server1');
        expect(stats).toBeInstanceOf(LavalinkStats);
        expect(stats).toHaveProperty('serverId', 'server1');
        expect(stats).toHaveProperty('players');
        expect(stats).toHaveProperty('memory');
        expect(stats).toHaveProperty('cpu');
        
        expect(stats.memory).toHaveProperty('usedFormatted');
        expect(stats.memory).toHaveProperty('freeFormatted');
        expect(stats.memory).toHaveProperty('allocatedFormatted');
        expect(stats.memory).toHaveProperty('reservableFormatted');
        expect(stats.cpu).toHaveProperty('systemLoadFormatted');
        expect(stats.cpu).toHaveProperty('lavalinkLoadFormatted');
        expect(stats).toHaveProperty('memoryUsagePercentageFormatted');
        expect(stats).toHaveProperty('formattedUptime');
    });

    test.skip('should fetch stats for all servers', async () => {
        const stats = await client.getAllStats();
        expect(stats).toBeInstanceOf(Array);
        expect(stats.length).toBe(2);
        expect(stats[0]).toHaveProperty('serverId', 'server1');
        expect(stats[1]).toHaveProperty('serverId', 'server2');
        
        stats.forEach(stat => {
            expect(stat.memory).toHaveProperty('usedFormatted');
            expect(stat.memory).toHaveProperty('freeFormatted');
            expect(stat.cpu).toHaveProperty('systemLoadFormatted');
            expect(stat).toHaveProperty('memoryUsagePercentageFormatted');
        });
    });

    test('should format bytes correctly', () => {
        expect(LavalinkStats.formatBytes(1024)).toBe('1.00 KB');
        expect(LavalinkStats.formatBytes(1048576)).toBe('1.00 MB');
        expect(LavalinkStats.formatBytes(1073741824)).toBe('1.00 GB');
        expect(LavalinkStats.formatBytes(0)).toBe('0 B');
    });

    test('should format percentages correctly', () => {
        expect(LavalinkStats.formatPercentage(0.5)).toBe('50.00%');
        expect(LavalinkStats.formatPercentage(0.123)).toBe('12.30%');
        expect(LavalinkStats.formatPercentage(0)).toBe('0.00%');
        expect(LavalinkStats.formatPercentage(1)).toBe('100.00%');
    });
});