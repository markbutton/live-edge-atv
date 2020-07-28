FROM node:11

RUN curl -O https://bootstrap.pypa.io/get-pip.py \
    && python3 get-pip.py --user \
    && ~/.local/bin/pip3 install awscli --upgrade --user \
    && PATH="~/.local/bin:$PATH" \
    && export PATH

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . . 
COPY --chown=node:node ./.aws /home/node/.aws

EXPOSE 3000 3001

CMD ["npm", "run", "start"]