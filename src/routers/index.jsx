import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

const lazyLoad = children => (
  <Suspense fallback={<Spin size="large" />}>{children}</Suspense>
);

const Hello = lazy(() => import("@/pages/index"));

const routers = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: lazyLoad(<Hello />),
  },
];

export default routers;
