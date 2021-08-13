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

## 配置项
ace-gremlin-editor 提供了以下配置项：

- height：编辑器高度，默认 150px；
- gremlinId：编辑器唯一标识，不能重复；
- initValue：编辑器初始值，可为空；
- showGutter：是否显示左侧的序号，默认为 true。

## API 
ace-gremlin-editor 提供了以下两个API：

- onValueChange(value: string)：编辑器内输入的值发生变化的回调函数；
- onSelectChange(value: string)：选择的内容发生变化后的回调函数；
- onInit(value: GremlinEditorIns)：编辑器初始化的回调函数。
