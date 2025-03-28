#!/bin/bash

set -e

echo "🚀 Démarrage du déploiement..."

# Se déplacer dans le répertoire du projet
cd ~/infra/apps/louap

# Mettre à jour le code depuis GitHub
echo "📥 Mise à jour du code..."
git pull origin main

# Vérifier si .env.production existe
if [ ! -f .env.production ]; then
    echo "⚠️  Warning: .env.production not found. Using existing .env file if present."
else
    echo "📄 Copie du fichier .env.production..."
    cp .env.production .env
fi

# Construire et démarrer les conteneurs
echo "🏗️  Construction des conteneurs..."
docker compose build

echo "🚀 Démarrage des conteneurs..."
docker compose up -d

echo "✅ Déploiement terminé avec succès!" 