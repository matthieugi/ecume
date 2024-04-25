#!/usr/bin/env bash
set -e

# Prefetch dependencies
pip install -r ./backend/requirements.txt
(cd ./frontend && npm install)