FROM node:current-alpine

# Add development tools and git
RUN apk add --no-cache git

# Create app directory
WORKDIR /workspace

# Install global npm packages
RUN npm install -g npm@latest

# Switch to non-root user
USER node