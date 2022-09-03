FROM node:16-alpine

# Set a working directory
WORKDIR /app

# Copy Packages file
COPY packages*.json .

# Install the packages
RUN npm install

# COPY the source code
COPY . .

# Expose the port
EXPOSE 5001

# run the project
CMD [ "npm", "run", "dev" ]


