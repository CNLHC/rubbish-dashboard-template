#!/bin/sh

if [ -z "$1" ]; then
    pnpm pm2 start ecosystem.config.js
    pnpm pm2 logs --raw
fi

$1
