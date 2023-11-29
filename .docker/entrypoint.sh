#!/bin/bash

npm install

npm uninstall bcrypt

npm install bcrypt

npm run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run

npm run dev
