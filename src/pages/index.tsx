import React, { useState } from 'react';
import GremlinEditor from '../index';
import './index.less';

export default () => {
  const [value, setValue] = useState('');
  const handleClick = (str: string) => {
    // setValue(str)
  };
  return (
    <div>
      <h1 className="title">Page index</h1>
      <GremlinEditor
        height={500}
        gremlinId="test-xxx"
        initValue=""
        showGutter={false}
        onValueChange={str => handleClick(str)}
      />
      <div>{value}</div>
    </div>
  );
};
