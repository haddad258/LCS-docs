# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

RUN <<EOF
apt-get update
apt-get install -y git
EOF

#RUN pwd > ./log-mrs.log
#RUN ls -rtla > ./log-mrs.log

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install any needed packages specified in package.json
RUN npm install

#RUN npm install -g --force nodemon

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3009

# Run the application in development mode with automatic code reloading
CMD ["npm", "start"]
