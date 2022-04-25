# -- Base Node ---
FROM registry.access.redhat.com/ubi8/nodejs-16:latest AS base
COPY --chown=1001:root package*.json ./

# -- Build Base ---
FROM base AS build-base
COPY --chown=1001:root ["./jest.config.js", "./jest.setup.js", "next.config.js", "./tsconfig.json", "./next-env.d.ts", "./.eslintrc", "./.eslintignore", "tailwind.config.js", "postcss.config.js", "next-i18next.config.js", "./"]

# -- Dependencies Node ---
FROM build-base AS dependencies
RUN npm set progress=false && npm config set depth 0 && \
  npm ci --production && \
  cp -R node_modules prod_node_modules && \
  npm ci --production=false

# ---- Compile  ----
FROM build-base AS compile
COPY --chown=1001:root ./pages ./pages
COPY --chown=1001:root ./src ./src
COPY --chown=1001:root next-i18next.config.js ./
COPY --chown=1001:root next.config.js ./
COPY --chown=1001:root --from=dependencies /opt/app-root/src/node_modules ./node_modules
COPY --chown=1001:root ./public /opt/app-root/src/public
RUN NODE_ENV=production ambient=test npm run build
RUN mv .next .next-test
RUN NODE_ENV=production ambient=release npm run build
RUN mv .next .next-release

# ---- Release  ----
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest AS release
COPY --chown=1001:root package*.json ./
COPY --chown=1001:root next.config.js ./
COPY --chown=1001:root next-i18next.config.js ./
COPY --from=dependencies --chown=1001:root /opt/app-root/src/prod_node_modules ./node_modules
COPY --from=compile --chown=1001:root /opt/app-root/src/.next-test ./.next-test
COPY --from=compile --chown=1001:root /opt/app-root/src/.next-release ./.next-release
COPY --chown=1001:root ./public /opt/app-root/src/public

# Expose port and define CMD
ENV NODE_ENV production
CMD ["sh", "-c", "echo Starging $ambient ; mv .next-$ambient .next ; npm run start"]