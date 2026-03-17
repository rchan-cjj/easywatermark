# Prerequisites
sudo apt install git nodejs npm

# Synchronise project
git pull

# Install packages
npm install

# Build Node app
. build.sh

# Deploy
sudo rm -r /var/www/html/*
sudo cp -r dist/* /var/www/html/

