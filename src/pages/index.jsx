/*
 * @Author: zhangzhiwei
 * @Date: 2024-12-09 15:18:28
 * @LastEditors: zhangzhiwei
 * @LastEditTime: 2024-12-09 15:18:49
 * @Description:
 * Copyright (c) 2024 by 朗新科技, All Rights Reserved.
 */
import { useEffect } from "react";

export default () => {

  useEffect(() => {
    getList()
  }, [])
  
  const getList = () => {
    fetch('http://fab-dev:9002/health')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('发生错误:', error);
  });
  }

  const getList2 = () => {
    fetch('https://api.example.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: 'value'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('发生错误:', error);
      });
    
  }

  return <div>Hello</div>;
};
