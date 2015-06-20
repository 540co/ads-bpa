# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:540co/ads-bpa.git
# 3. Build container: docker build .

FROM node:0.12.4
MAINTAINER 540 Co LLC <info@540.co>

# Environment Variables
ENV SRC_PATH /src/dre
ENV CLIENT_PATH $SRC_PATH/client
ENV SERVER_PATH $SRC_PATH/server

# App
ADD . $SRC_PATH

# Install dependencies
WORKDIR $SRC_PATH
RUN npm install -g bower grunt-cli mocha

# Install client dependencies
WORKDIR $CLIENT_PATH
RUN npm install; bower install --allow-root

# Install server dependencies
WORKDIR $SERVER_PATH
RUN npm install

# Expose port 3000 to host
EXPOSE 3000

# Start server
WORKDIR $SERVER_PATH
CMD ["npm", "start"]
