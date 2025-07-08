# Lavastat

A TypeScript client for fetching Lavalink server statistics with a clean and intuitive API.

## Features

- 🔧 **TypeScript Support** - Full TypeScript support with type definitions
- 📊 **Multi-Server Support** - Connect to multiple Lavalink servers simultaneously
- 🎯 **Simple API** - Easy-to-use methods for fetching server statistics
- 📈 **Formatted Data** - Pre-formatted memory and CPU statistics
- 🛡️ **Error Handling** - Comprehensive error handling with custom error types

## Installation

```bash
npm install lavastat
```

## Quick Start

```typescript
import { LavalinkClient } from 'lavastat';

// Configure your Lavalink servers
const config = {
  nodes: [
    {
      id: 'main',
      host: 'localhost',
      port: 2333,
      password: 'youshallnotpass',
      secure: false,
      version: 'v4'
    },
    {
      id: 'backup',
      host: 'backup.example.com',
      port: 2333,
      password: 'backup-password',
      secure: true,
      version: 'v4'
    }
  ]
};

// Create client instance
const client = new LavalinkClient(config);

// Get statistics from a specific server
const stats = await client.getStats('main');
console.log(`Players: ${stats.players}`);
console.log(`Memory Usage: ${stats.memoryUsagePercentageFormatted}`);
console.log(`Uptime: ${stats.formattedUptime}`);

// Get statistics from all servers
const allStats = await client.getAllStats();
allStats.forEach(stats => {
  console.log(`Server ${stats.serverId}: ${stats.players} players`);
});
```

## Development

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

### Development Mode
```bash
npm run dev
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Tazhys 