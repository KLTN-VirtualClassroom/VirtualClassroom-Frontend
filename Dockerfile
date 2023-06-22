# Sử dụng một image base có sẵn với Node.js
FROM node:16
# Thiết lập thư mục làm việc trong container
WORKDIR /app
# Sao chép package.json và package-lock.json vào container
COPY package*.json ./
# Cài đặt dependencies
RUN npm install
# Sao chép mã nguồn ứng dụng vào container
COPY . .
# Build ứng dụng React
RUN npm run build
# Chạy ứng dụng React trong môi trường sản xuất
CMD ["npm", "start"]
