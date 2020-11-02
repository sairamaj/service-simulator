FROM node:10
COPY ./ /   
RUN npm install --only=production
EXPOSE 80
ENV NODE_ENV=dev
# ENV PROVIDER=mongo
# ENV MONGODB_CONNECTION="mondb connection here..."
ENV PORT=80
ENV PROVIDER=file
ENV DEBUG=servicefileprovider,express:router
#ENV FILEPROVIDER_LOCATION=/data/fileprovider
CMD ["node", "/dist/index.js"]
