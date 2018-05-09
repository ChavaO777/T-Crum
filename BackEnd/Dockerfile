FROM node:latest
 
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
 
# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
 
# install and cache app dependencies.
# Don't add the package.json. Use the one in the volume
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g sequelize-cli
RUN sequelize init
 
# start app
CMD ["npm", "run start:dev"]