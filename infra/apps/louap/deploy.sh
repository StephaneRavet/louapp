#!/bin/bash

cd ~/infra/apps/louap
git pull origin main

# Vérifier si .env.production existe
if [ ! -f .env.production ]; then
    echo "Warning: .env.production not found. Using existing .env file if present."
else
    cp .env.production .env
fi

docker compose build
docker compose up -d 