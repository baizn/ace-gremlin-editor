# Gremlin Editor
基于 Ace 的 React 版本的 Gremlin 编辑器。

## 用法


```
import React, { useState } from 'react';
import { GremlinEditor } from '../index';

export default () => {
  const [value, setValue] = useState('');
  const handleClick = (str: string) => {
    setValue(str)
  };
  return (
    <div>
      <h1 className="title">Page index</h1>
      <GremlinEditor
        height={500}
        gremlinId="test"
        initValue=""
        onValueChange={str => handleClick(str)}
      />
      <div>{value}</div>
    </div>
  );
};
```
