/*
 * @Author: zhangzhiwei
 * @Date: 2024-12-09 14:22:00
 * @LastEditors: zhangzhiwei
 * @LastEditTime: 2024-12-09 14:55:31
 * @Description:
 * Copyright (c) 2024 by 朗新科技, All Rights Reserved.
 */
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <Suspense>
    <App />
  </Suspense>
);
