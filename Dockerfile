# -- Base Node ---
FROM registry.access.redhat.com/ubi8/nodejs-16:latest AS base
COPY package*.json ./

# -- Build Base ---
FROM base AS build-base
COPY ["./jest.config.js", "./jest.setup.js", "./tsconfig.json", "./next-env.d.ts", "./.eslintrc", "./.eslintignore", "./"]

# -- Dependencies Node ---
FROM build-base AS dependencies
RUN npm set progress=false && npm config set depth 0 && \
  npm ci --production && \
  cp -R node_modules prod_node_modules && \
  npm ci --production=false

# ---- Compile  ----
FROM build-base AS compile
COPY ./pages ./pages
COPY ./src ./src
COPY --from=dependencies /opt/app-root/src/node_modules ./node_modules
RUN npm run build

# ---- Release  ----
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest AS release
COPY package*.json ./
COPY --from=dependencies /opt/app-root/src/prod_node_modules ./node_modules
COPY --from=compile /opt/app-root/src/.next ./.next
COPY ./public /opt/app-root/src/public

# Expose port and define CMD
ENV NODE_ENV production
CMD npm run start