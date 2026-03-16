# Build Node app
npx vite build
cp -r locale dist

# Build Docker image
image="${PWD##*/}"
sudo docker build -t $image .

# Test
sudo docker run -p 8080:80 $image

