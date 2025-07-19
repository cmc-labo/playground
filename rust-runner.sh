#!/bin/sh

if [ ! -f "$1" ]; then
  echo "File does not exist: $1"
  exit 1
fi

BASENAME=$(basename "$1" .rs)

rustc "$1" -o "/app/$BASENAME" 2> compile_error.txt

if [ $? -ne 0 ]; then
  cat compile_error.txt
  exit 1
fi

timeout 3s "/app/$BASENAME" 2>&1 | head -n 100