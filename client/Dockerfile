### Build Container ###
FROM node:12 as builder

LABEL maintainer="Mark Button <mark.button@charter.com>"

# You will use this to generate your artifactory creds
# These come from the top level Group in GitLab (configured by PDE)
ARG VERSION=0.0.0
ARG ARTIFACTORY_EMAIL
ARG ARTIFACTORY_API_KEY
ARG ANGULAR_ENVIRONMENT=build-prod
ARG CI_COMMIT_SHA=default_sha
ARG CI_COMMIT_REF_NAME=default_ref_name
ARG owner

USER root

RUN chown -R node:node /home/node

USER node

# NPM
### Build Dependencies
RUN mkdir -p /home/node/build_node_modules
COPY --chown=node:node package.json *.lock /home/node/build_node_modules/
RUN cd /home/node/build_node_modules && \
    npm install

### Production Dependencies
RUN mkdir -p /home/node/release_node_modules
COPY --chown=node:node package.json *.lock /home/node/release_node_modules/
RUN cd /home/node/release_node_modules && \
    npm install


# Add the application
COPY --chown=node:node . /home/node/app

# Link NPM build dependencies
RUN ln -s /home/node/build_node_modules/node_modules /home/node/app/node_modules

# Working directory
WORKDIR /home/node/app

# Build app
RUN npm run ${ANGULAR_ENVIRONMENT}

FROM nginx:alpine

LABEL maintainer="Mark Button <mark.button@charter.com>"

COPY --from=builder --chown=root:root /home/node/app/dist/live-edge/ /usr/share/nginx/html/
COPY --from=builder --chown=root:root /home/node/app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=root:root /home/node/app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
