import { GremlinEditorIns } from '@/editor';
import React, { useState } from 'react';
import GremlinEditor from '../index';
import './index.less';

const widthList = ['30%', '50%', '80%', '100%'];

export default () => {
  const [value, setValue] = useState('');
  const [editor, setEditor] = useState<GremlinEditorIns>();
  const [width, setWidth] = useState('30%');
  const handleClick = (str: string) => {
    // setValue(str)
  };
  const handleResize = (width: string) => {
    setWidth(width);
    setTimeout(() => {
      editor?.resize();
    });
  };
  return (
    <div>
      <h1 className="title">Page index</h1>
      <div>
        <h3>宽度</h3>
        <div style={{ margin: '16px 0' }}>
          {widthList.map(v => (
            <button onClick={() => handleResize(v)}>{v}</button>
          ))}
        </div>
      </div>
      <div style={{ width: width, border: 'solid 1px gray' }}>
        <GremlinEditor
          height={500}
          gremlinId="test-xxx"
          initValue=""
          theme="tomorrow"
          showGutter={true}
          onValueChange={str => handleClick(str)}
          onInit={editor => setEditor(editor)}
        />
      </div>
      <div>{value}</div>
    </div>
  );
};
