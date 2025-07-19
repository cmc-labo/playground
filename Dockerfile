FROM rust:latest

WORKDIR /app

COPY rust-runner.sh /usr/local/bin/rust-runner.sh
RUN chmod +x /usr/local/bin/rust-runner.sh

ENTRYPOINT ["/usr/local/bin/rust-runner.sh"]