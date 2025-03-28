# Infrastructure

Ce projet est déployé sur un VPS en utilisant le projet `infra-vps` qui gère l'infrastructure globale.

## Architecture

- Le projet `infra-vps` gère :
  - Traefik (reverse proxy)
  - Les certificats SSL
  - Le réseau Docker partagé

- Ce projet (`louapp`) :
  - Est déployé dans le dossier `~/infra/apps/louap`
  - Utilise le réseau Docker `web` créé par `infra-vps`
  - Est exposé via Traefik sur le domaine `louap.webcraft-formation.fr`

## Configuration

Le fichier `docker-compose.yml` de ce projet est configuré pour :
- Se connecter au réseau `web` de `infra-vps`
- Utiliser les certificats SSL générés par Traefik
- Être exposé via le reverse proxy Traefik

## Déploiement

1. Le projet `infra-vps` doit être déployé en premier
2. Ce projet peut ensuite être déployé dans `~/infra/apps/louap`
3. Les deux projets doivent être sur le même serveur 