# RustActix-Basic

This project is a simple web server built with Rust and Actix-web, demonstrating basic routing and request handling. It serves as a personal reference for Rust web development on macOS.

## Prerequisites

- macOS (This guide is Mac-focused)
- Internet connection
- Git installed

## Installation Guide

### 1. Install Rust (if not already installed)

1. Open Terminal
2. Run the following command:
   ```
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```
3. Follow the on-screen prompts. Choose the default installation option when asked.
4. After installation, configure your current shell:
   ```
   source $HOME/.cargo/env
   ```

### 2. Verify Rust Installation

Run these commands to verify Rust and Cargo are installed correctly:
```
rustc --version
cargo --version
```

### 3. Clone the Repository

1. Open Terminal
2. Run the following command:
   ```
   git clone https://github.com/C0nsumption/RustActix-Basic.git
   cd RustActix-Basic
   ```

### 4. Build and Run the Server

In the project directory, run:
```
cargo run
```

The server will start on `http://localhost:8080`

## Testing the Routes

You can test the routes using `curl` in Terminal:

- GET `/`: 
  ```
  curl http://localhost:8080
  ```
- POST `/echo`: 
  ```
  curl -X POST -d "Hello, Server!" http://localhost:8080/echo
  ```
- GET `/hey/{name}`: 
  ```
  curl http://localhost:8080/hey/Alice
  ```

## Code Explanation

### Imports
```rust
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
```
This line imports necessary components from Actix-web.

### Route Handlers

1. Root route:
   ```rust
   #[get("/")]
   async fn hello() -> impl Responder {
       HttpResponse::Ok().body("Hello, World!")
   }
   ```
   - Handles GET requests to "/"
   - Returns "Hello, World!"

2. Echo route:
   ```rust
   #[post("/echo")]
   async fn echo(req_body: String) -> impl Responder {
       HttpResponse::Ok().body(req_body)
   }
   ```
   - Handles POST requests to "/echo"
   - Echoes back the request body

3. Greeting route:
   ```rust
   #[get("/hey/{name}")]
   async fn hey(name: web::Path<String>) -> impl Responder {
       format!("Hey {}!", name)
   }
   ```
   - Handles GET requests to "/hey/{name}"
   - Greets the provided name

### Main Function
```rust
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(echo)
            .service(hey)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```
- Creates a new `HttpServer`
- Configures the application with our route handlers
- Binds the server to localhost on port 8080
- Runs the server

## Next Steps

- Add more routes and functionality
- Implement error handling
- Add database integration
- Explore Actix-web's middleware for adding common functionality like logging or authentication

## Contributing

Feel free to fork this repository and submit pull requests for improvements or additional features.

## License

[MIT License](LICENSE)