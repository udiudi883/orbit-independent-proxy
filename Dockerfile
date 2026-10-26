FROM node:20-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Build a separate hosted instance from the upstream open-source proxy engine.
RUN git clone --depth 1 https://github.com/binary-person/rammerhead.git /app

# Override the default localhost / two-port settings for a single HTTPS host.
COPY config.js /app/config.js

RUN npm install --no-audit --no-fund \
    && npm run build

ENV NODE_ENV=production
EXPOSE 10000

CMD ["npm", "start"]
