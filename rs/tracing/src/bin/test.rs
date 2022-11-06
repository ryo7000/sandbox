use std::io;
use tracing_subscriber::prelude::*;

async fn hello() -> &'static str {
    "Hello"
}

#[tokio::main]
async fn main() {
    let file_appender = tracing_appender::rolling::hourly("log", "example.log");
    let (non_blocking, _guard) = tracing_appender::non_blocking(file_appender);

    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer().with_writer(io::stdout))
        .with(tracing_subscriber::fmt::layer().with_writer(non_blocking))
        .init();

    let number_of_yaks = 3;
    // this creates a new event, outside of any spans.
    tracing::info!(number_of_yaks, "preparing to shave yaks");

    let s = hello().await;
    tracing::info!(s, "output");
}
