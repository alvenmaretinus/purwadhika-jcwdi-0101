FROM node:20-alpine3.21

# set working directory in container
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package*.json ./

# install app deps
RUN npm install

# copy the rest of app code to the working directory
COPY . .

# expose port to communicate with the React App
EXPOSE 8000

# start your be server
CMD ["npm", "run", "start"]
