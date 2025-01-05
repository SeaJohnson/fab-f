/*
 * @Author: zhangzhiwei
 * @Date: 2024-12-09 14:58:44
 * @LastEditors: zhangzhiwei
 * @LastEditTime: 2024-12-09 15:02:40
 * @Description:
 * Copyright (c) 2024 by 朗新科技, All Rights Reserved.
 */
import React, { StrictMode } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { App as AntdApp } from "antd";
import common from "../config/common";
import router from "@/routers";

dayjs.locale("zh-cn");

const App = () => {
  return (
    <StrictMode>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: common.primaryColor,
            borderRadius: 4,
            colorBgContainer: "#fff",
          },
        }}
      >
        <AntdApp>
          <RouterProvider router={createHashRouter(router)} />
        </AntdApp>
      </ConfigProvider>
    </StrictMode>
  );
};

export default App;
