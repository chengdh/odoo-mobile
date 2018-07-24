FROM node:9

RUN apt-get update

RUN npm config set registry https://registry.npm.taobao.org info underscore
ENV TERM=xterm
ENV ROOT /react-native-starter-kit

# make this cache-able
RUN mkdir -p $ROOT
COPY . $ROOT

WORKDIR $ROOT
RUN npm install --loglevel=warn
