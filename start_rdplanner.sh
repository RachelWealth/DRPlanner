#!/bin/bash

# Start Node.js Backend
echo "Starting Node.js Backend..."
cd ./client/
node index.js

# Wait for a moment to let the backend start before moving to the next step
sleep 5


echo "Starting Next.js Frontend..."
cd ../server_no/


# Start Sanity Studio
echo "Starting Sanity Studio..."
sanity start

sleep 5
# Start Next.js Frontend
npm run dev


