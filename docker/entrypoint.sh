#!/bin/bash
cd /app

npm install
ionic serve -l --lab-host=0.0.0.0 --lab-port=8200
tail -f /dev/null
