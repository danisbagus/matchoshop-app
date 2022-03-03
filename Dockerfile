FROM node:alpine AS build
COPY . .
RUN npm install
RUN npm run build

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=build /build ./web
EXPOSE 8080