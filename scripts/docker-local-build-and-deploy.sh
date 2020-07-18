#!/usr/bin/env bash
npm run build
docker build --cache-from 9e3u2f0b1/st-template:latest --tag 9e3u2f0b1/st-template:latest .

docker-compose up st-template
