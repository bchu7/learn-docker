# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of your app's source code
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
# Do not forget to update package.json main entry point to the corresponding index.js
# CMD ["node", "./src/hello/indexe.js"]
# CMD ["node", "./src/online/index.js"]
# CMD ["node", "./src/search/index.js"]
CMD ["node", "./src/error-pages/index.js"]

