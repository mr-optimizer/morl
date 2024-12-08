#!/bin/bash

# wait-for-it.sh
# Usage: wait-for-it.sh host:port -- command arguments

HOST=$1
PORT=$2
shift 2
TIMEOUT=30

echo "Waiting for $HOST:$PORT..."

for i in $(seq 1 $TIMEOUT); do
  # Use /dev/tcp to check if the port is open
  if (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1; then
    echo "$HOST:$PORT is up!"
    exec "$@"
  fi
  echo "Waiting for $HOST:$PORT..."
  sleep 1
done

echo "Timeout reached, $HOST:$PORT is not up!"
exit 1
