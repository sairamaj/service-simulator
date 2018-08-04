FROM node:9-alpine
COPY ./ /   
RUN npm install --only=production
EXPOSE 80
ENV NODE_ENV=dev
# ENV PROVIDER=mongo
# ENV MONGODB_CONNECTION="mondb connection here..."
ENV PORT=80
CMD ["node", "/dist/index.js"]
