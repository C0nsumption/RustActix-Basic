# RustActix-Basic

This project demonstrates a full-stack application with a Rust backend using Actix-web and a React TypeScript frontend. It showcases basic routing, request handling, CORS configuration, and logging on the backend, along with a simple interactive frontend.

## Prerequisites

- macOS
- Internet connection
- Git
- Node.js and npm

## Quick Start Guide

### 1. Install Rust

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
RUST_LOG=info cargo run
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

## Next Steps

- Implement more complex backend logic
- Add database integration
- Enhance error handling and input validation
- Implement user authentication
- Improve the frontend UI/UX
- Add unit and integration tests

## Contributing

Feel free to fork this repository and submit pull requests for improvements or additional features.

## License

[MIT License](LICENSE)