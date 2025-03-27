# Using a light weight image for node
FROM node:20-alpine AS base

# Setting up working directory
WORKDIR /node-backend-app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Update npm | Install pnpm | Set PNPM_HOME | Install global packages
RUN npm i -g npm@latest;\
    # Install pnpm
    npm i -g pnpm;\
    pnpm --version; \
    pnpm setup; \
    mkdir -p /usr/local/share/pnpm &&\
    export PNPM_HOME="/usr/local/share/pnpm" &&\
    export PATH="$PNPM_HOME:$PATH"; \
    pnpm bin -g &&\
    # Install dependencies
    pnpm install --frozen-lockfile

# Copying all current files 
COPY . .

#Build the distributable files
RUN pnpm build

# Expose port to docker port 3000
EXPOSE 3000

# Start Application
CMD pnpm start
