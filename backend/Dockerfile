FROM node:14
#dependencies needed for PDF generation to work
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 3000
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --only=production
COPY . .
HEALTHCHECK CMD curl --fail-early --silent http://localhost:3000/health 2>&1 | grep '"status"' || exit 1
ENTRYPOINT [ "node", "server.js" ]
