# Build Node app
npx vite build

# Build Docker image
image="${PWD##*/}"
sudo docker build -t $image .

