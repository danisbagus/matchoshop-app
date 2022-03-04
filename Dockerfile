FROM node:14.15-alpine3.12 
COPY . .
Run npm cache verify
RUN npm install --no-package-lock
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 8080

