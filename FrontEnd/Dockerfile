FROM node:latest
 
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
 
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
 
# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm i
RUN npm i -g @angular/cli@1.4.10 --unsafe
 
# start app
# CMD ["npm", "start"]
CMD ["ng", "serve"]