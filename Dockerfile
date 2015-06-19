# To build:
# 1. Install docker (http://docker.io)
# 2. Checkout source: git@github.com:540co/ads-bpa.git
# 3. Build container: docker build .

FROM node:0.12.4
MAINTAINER 540 Co LLC <info@540.co>

# App
ADD . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE 3000
CMD ["node", "/src/index.js"]
