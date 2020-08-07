#!/usr/bin/env bash

# script recording original project set up

echo "Do not run me"
exit 1

nvm install 12.7.0
nvm use 12.7.0
npm install -g pnpm
npm install -g @vue/cli

git init

cp ../tlm/script .
mkdir packages
cd packages
vue create -n career-model-ui
rm -r career-model-ui/node_packages
mkdir packages/career-model-pgsql
# edit more files

git add .
git commit -m "initial commit"
