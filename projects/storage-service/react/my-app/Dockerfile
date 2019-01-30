
# This is a simple image
FROM  postgres:10.6 
RUN apt-get update 
RUN npm install -g create-react-app
ADD package.json /home/app
RUN npm install
RUN rm .env
CMD ["npm", "start"]
