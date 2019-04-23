#!/bin/bash
cd /app

npm install
ionic serve -- --disable-host-check
tail -f /dev/null
