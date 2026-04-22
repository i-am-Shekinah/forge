FROM node:22-alpine
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
# Copy the prisma folder specifically so we can run generate
COPY prisma ./prisma/ 

RUN npm install
# Generate the client for the container's OS
RUN npx prisma generate

COPY . .
EXPOSE 5000