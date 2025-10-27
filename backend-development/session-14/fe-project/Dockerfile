FROM node:25-alpine3.21

# set working directory in container
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package*.json ./

# install app deps
RUN npm install

# copy the rest of app code to the working directory
COPY . .

# expose port to communicate with the React App
EXPOSE 5173

# start your react app
CMD ["npm", "run", "dev"]
