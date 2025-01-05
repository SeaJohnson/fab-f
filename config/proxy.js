/*
 * @Author: zhangzhiwei
 * @Date: 2024-12-09 13:50:29
 * @LastEditors: zhangzhiwei
 * @LastEditTime: 2024-12-09 15:31:33
 * @Description:
 * Copyright (c) 2024 by 朗新科技, All Rights Reserved.
 */
module.exports = {
  "/njgx-index-manage": {
    target: "http://10.169.1.244:8086",
    changeOrigin: true,
    logLevel: "debug",
    router: function (req) {
      delete req.headers.origin;
    },
  },
  "/app": {
    target: "http://szgx.systoon.com",
    changeOrigin: true,
    logLevel: "debug",
    pathRewrite: {
      "/app": "/espPlatApi/espDataapp",
    },
  },
};
