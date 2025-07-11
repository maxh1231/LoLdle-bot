FROM alpine:3.20

RUN apk add --no-cache bash mysql-client

WORKDIR /app

COPY select-classic-daily.sh .

RUN chmod +x select-classic-daily.sh

ENTRYPOINT ["./select-classic-daily.sh"]
