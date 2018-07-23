FROM node:9-alpine
COPY ./ /api/   
RUN cd /api && npm install --only=production
EXPOSE 80
ENV NODE_ENV=dev
ENV PROVIDER=mongo
ENV MONGODB_CONNECTION="mongo db connection string here. don't forget to put quotes"
ENV PORT=80
CMD ["node", "/api/dist/index.js"]
