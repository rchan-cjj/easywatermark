# Build Node app
npx vite build
cp -r locale dist

# Build Docker image
image="${PWD##*/}"
sudo docker build -t $image .

