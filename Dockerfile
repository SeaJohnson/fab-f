# 换成node镜像
FROM golang:1.23.4 

COPY fab-dev-f .

ENTRYPOINT ["./fab-dev-f"]

ENV TZ=Asia/Shanghai
