use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, middleware::Logger};
use actix_cors::Cors;
use log::{info, LevelFilter};
use log4rs::{
    append::file::FileAppender,
    config::{Appender, Config, Root},
    encode::pattern::PatternEncoder,
};

#[get("/")]
async fn hello() -> impl Responder {
    info!("Handling GET request to /");
    HttpResponse::Ok().body("Hello, World!")
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    info!("Handling POST request to /echo with body: {}", req_body);
    HttpResponse::Ok().body(req_body)
}

#[get("/hey/{name}")]
async fn hey(name: web::Path<String>) -> impl Responder {
    info!("Handling GET request to /hey/{}", name);
    format!("Hey {}!", name)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Configure file logging
    let logfile = FileAppender::builder()
        .encoder(Box::new(PatternEncoder::new("{d} - {l} - {m}\n")))
        .build("log/output.log")
        .unwrap();

    let config = Config::builder()
        .appender(Appender::builder().build("logfile", Box::new(logfile)))
        .build(Root::builder().appender("logfile").build(LevelFilter::Info))
        .unwrap();

    log4rs::init_config(config).unwrap();

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