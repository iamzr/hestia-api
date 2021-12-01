FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install

# Install python to run script 
RUN apt-get update || : && apt-get install python -y
RUN apt-get install python3-pip -y
RUN pip3 install hestia_earth.utils
RUN pip3 install pandas~=1.2.0

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
COPY . ./
ENV PORT 3000
EXPOSE ${PORT}
CMD ["node", "index.js"]