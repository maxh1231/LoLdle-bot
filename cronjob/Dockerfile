FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends default-mysql-client && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir mysql-connector-python

COPY select-classic-daily.py .

ENTRYPOINT ["python", "./select-classic-daily.py"]
