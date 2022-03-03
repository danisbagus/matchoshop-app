# FROM node:14.15-alpine3.12 AS node_builder
# COPY ./ ./
# RUN npm install
# RUN npm run build

# FROM alpine:latest
# RUN apk --no-cache add ca-certificates
# COPY --from=node_builder /build ./web


#Start from the pre-existing official Node image
# FROM node:13.12.0
FROM node:14.15-alpine3.12
#Specifies directory for all subsequent actions in image filesystem (never host's filesystem)
#"/usr/local/bin/" is what Heroku takes as the "root" folder. Files MUST be added here or they cannot be found!
WORKDIR /usr/local/bin/web
#Copies the app's source code into the image's filesystem
COPY . /usr/local/bin/web/
#Installs packages for Express framework. Runs in container root directory.
RUN npm install
#Installs packages for React app
RUN npm install --prefix client
#Builds React app
RUN npm run --prefix client build
#Runs the app when container launches. Same as running in console
CMD ["npm", "start"]