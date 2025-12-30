# PM Simulator

An interactive web application that simulates the experience of being a product manager. Navigate real-world PM scenarios, make decisions, and see the consequences of your choices.

## Project Overview

PM Simulator is a game-based learning tool that puts you in the shoes of a product manager. You'll face realistic scenarios including:
- Prioritizing features and managing backlogs
- Stakeholder management and communication
- Technical trade-offs and roadmap planning
- Team dynamics and resource allocation
- Crisis management and pivoting strategies

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Development**: Concurrent dev servers for seamless development

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/danbressner-afterhours/pm-simulator.git
cd pm-simulator
```

2. Install all dependencies:
```bash
npm run install-all
```

### Running the Application

Start both the client and server in development mode:
```bash
npm run dev
```

Or run them separately:
- Client only: `npm run client`
- Server only: `npm run server`

The client will be available at `http://localhost:5173`
The server will run on `http://localhost:5000`

## Project Structure

```
pm-simulator/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package for scripts
└── README.md
```

## Development Roadmap

- [ ] Core game engine and scenario system
- [ ] Interactive decision trees
- [ ] Score and feedback system
- [ ] Multiple scenario paths
- [ ] User progress tracking
- [ ] Leaderboard and achievements

## Contributing

This project is in early development. Contributions, ideas, and feedback are welcome!

## License

MIT
