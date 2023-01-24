#!/bin/bash


if [[ "$@" == *"--help"* ]] || [[ "$@" == *"-h"* ]]; then
  echo "Usage: invoke-env [options] command"
  echo "Options:"
  echo "  -s, --show-env  Show environment variables"
  echo "  -h, --help      Show this help message"
  exit 0
fi

echo "Loading environment variables from .env file..."

# get the directory path of the script
script_dir=$(dirname "$0")

# check if .env file exists
if [ -f "$script_dir/../.env" ]; then
  # remove lines starting with # and export variables from .env file
  export $(sed '/^#/d' "$script_dir/../.env" | xargs)
  echo "Environment variables loaded."
else
  echo "Warning: .env file not found."
fi

# check for missing base environment variables

# List of required environment variables
required_vars=(DATABASE_NAME DATABASE_OWNER_PASSWORD DATABASE_HOST JWT_SECRET)

# Check if required environment variables are set
for var in "${required_vars[@]}"
do
  if [ -z "${!var:-}" ]; then
    echo "Warning: Missing required environment variable $var"
  fi
done


: ${AUTH_DATABASE_URL}:=postgres://${DATABASE_AUTHENTICATOR}:${DATABASE_AUTHENTICATOR_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}}

if [ -z "${DATABASE_OWNER:-}" ]; then
  DATABASE_OWNER="${DATABASE_NAME}_owner"
  export DATABASE_OWNER
fi

if [ -z "${DATABASE_URL:-}" ]; then
  DATABASE_URL="postgres://${DATABASE_OWNER}:${DATABASE_OWNER_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}"
  export DATABASE_URL
fi

if [ -z "${SHADOW_DATABASE_URL:-}" ]; then
  SHADOW_DATABASE_URL="postgres://${DATABASE_OWNER}:${DATABASE_OWNER_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}_shadow"
  export SHADOW_DATABASE_URL
fi

if [ -z "${AUTH_DATABASE_URL:-}" ]; then
  AUTH_DATABASE_URL="postgres://${DATABASE_AUTHENTICATOR}:${DATABASE_AUTHENTICATOR_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}"
  export AUTH_DATABASE_URL
fi

if [ -z "${DATABASE_VISITOR:-}" ]; then
  DATABASE_VISITOR="${DATABASE_NAME}_visitor"
  export DATABASE_VISITOR
fi

if [ -z "${DATABASE_AUTHENTICATOR:-}" ]; then
  DATABASE_AUTHENTICATOR="${DATABASE_NAME}_authenticator"
  export DATABASE_AUTHENTICATOR
fi


# check if -s or --show-env flag is passed as an argument
if [[ "$@" == *"--show-env"* ]] || [[ "$@" == *"-s"* ]]; then
  echo "Environment variables:"
  printenv | sort
fi

echo ""
echo "Executing command: $@"
echo ""

# execute command passed as an argument
$@
