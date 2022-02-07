FROM node:12-alpine

RUN mkdir -p /opt/nodejs/automation_res_node_worker

WORKDIR /opt/nodejs/automation_res_node_worker/

COPY . /opt/nodejs/automation_res_node_worker/

RUN cd /opt/nodejs/automation_res_node_worker

RUN npm install

CMD [ "node", "app.js" ]