# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /app
COPY --from=build /app/.output ./

EXPOSE 3000
CMD ["node", "server/index.mjs"]

#docker build -t module_progress .
#docker run -p 80:3000 module_progress