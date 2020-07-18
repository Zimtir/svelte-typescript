#!/usr/bin/env bash

docker build --cache-from 9e3u2f0b1/st-template:latest --tag 9e3u2f0b1/st-template:latest .
docker push 9e3u2f0b1/st-template:latest
