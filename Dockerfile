FROM node:14.15-alpine3.12 AS node_builder
COPY ./ ./
RUN npm install
RUN npm run build

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=node_builder /build ./web