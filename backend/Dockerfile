FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache openssl

# Create the user FIRST
RUN adduser --disabled-password --gecos "" appuser

# Copy files and change ownership at the same time
COPY --chown=appuser:appuser package*.json ./
COPY --chown=appuser:appuser prisma ./prisma/ 

RUN npm install

# Copy everything else and ensure appuser owns it all
COPY --chown=appuser:appuser . .

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Switch to the user BEFORE generating
USER appuser

# Now the user generates the client into a folder they already own
RUN npx prisma generate

EXPOSE 5000

CMD [ "npm", "run", "dev" ]