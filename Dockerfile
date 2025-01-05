# 换成node镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制项目的其他文件到工作目录
COPY . .

# 暴露应用程序的端口，假设应用程序运行在3000端口
# EXPOSE 3000
# 容器启动时区
ENV TZ=Asia/Shanghai

# 定义容器启动时执行的命令
CMD ["npm", "start"]
