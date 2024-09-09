# Step 1: Use an official Node.js runtime as the base image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --only=production

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port the app will run on
EXPOSE 8080

# Step 7: Set environment variables for the app
# You can choose to override these during deployment or in the cloud.
ENV PORT=8080
ENV DB_HOST=34.126.189.90
ENV DB_PORT=3306

# Step 8: Start the backend server
CMD ["npm", "start"]
