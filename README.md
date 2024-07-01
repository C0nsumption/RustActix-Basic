# RustActix-Basic

This project demonstrates a full-stack application with a Rust backend using Actix-web and a React TypeScript frontend with Three.js integration. It showcases routing, request handling, CORS configuration, file logging on the backend, and an interactive 3D scene on the frontend.

## Features

### Backend
- Actix-web server with basic routing
- CORS configuration for frontend integration
- File logging using log4rs
- Simple API endpoints: hello, echo, and personalized greeting

### Frontend
- React with TypeScript
- Three.js integration using @react-three/fiber and @react-three/drei
- Interactive 3D scene with customizable elements
- Dynamic HDRI environment
- Leva for easy GUI controls

## Prerequisites

- macOS or Linux
- Internet connection
- Git
- Rust and Cargo
- Node.js and npm

## Quick Start Guide

### 1. Install Rust (if not already installed)

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Verify installation:
```bash
rustc --version
cargo --version
```

### 2. Set Up Backend

Clone the repository:
```bash
git clone https://github.com/C0nsumption/RustActix-Basic.git
cd RustActix-Basic
```

Run the backend:
```bash
cargo run
```

The server will start on `http://localhost:8080`

### 3. Set Up Frontend

In a new terminal, navigate to the frontend directory:
```bash
cd react-ts/
npm install
npm run dev
```

The frontend will be available at the URL provided by Vite (usually `http://localhost:5173`)

## Project Structure

```
RustActix-Basic/
├── src/
│   └── main.rs      # Backend server code
├── react-ts/
│   ├── src/
│   │   ├── App.tsx  # Main React component with 3D scene
│   │   └── ...
│   ├── package.json
│   └── ...
├── Cargo.toml
└── README.md
```

## Backend API Endpoints

- GET `/`: Returns a "Hello, World!" message
- POST `/echo`: Echoes back the request body
- GET `/hey/{name}`: Returns a personalized greeting

## Frontend Features

- Interactive 3D sphere with customizable material properties
- Dynamic HDRI environment with multiple presets
- Fog and sky simulation
- Orbit controls for camera manipulation
- GUI controls for easy customization of scene elements
- Integration with backend API for personalized greetings

## Next Steps

- Implement more complex backend logic and database integration
- Enhance error handling and input validation
- Implement user authentication
- Add more interactive elements to the 3D scene
- Optimize 3D rendering performance
- Add unit and integration tests for both backend and frontend

## Contributing

Feel free to fork this repository and submit pull requests for improvements or additional features.

## License

[MIT License](LICENSE)