use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, middleware::Logger};
use actix_cors::Cors;
use env_logger::Env;

#[get("/")]
async fn hello() -> impl Responder {
    log::info!("Handling GET request to /");
    HttpResponse::Ok().body("Hello, World!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    log::info!("Handling POST request to /echo with body: {}", req_body);
    HttpResponse::Ok().body(req_body)
}

#[get("/hey/{name}")]
async fn hey(name: web::Path<String>) -> impl Responder {
    log::info!("Handling GET request to /hey/{}", name);
    format!("Hey {}!", name)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .service(hello)
            .service(echo)
            .service(hey)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}