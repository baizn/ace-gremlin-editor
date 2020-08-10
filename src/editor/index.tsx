import React, { useEffect } from 'react';
require('../source/ace/ace-builds/src-noconflict/ace');
require('../source/ace/ace-builds/src-noconflict/mode-gremlin');
require('../source/ace/ace-builds/src-noconflict/theme-clouds_midnight');
require('../source/ace/ace-builds/src-noconflict/ext-language_tools');
import './index.less';

interface IProps {
  height: number;
  gremlinId: string;
  initValue: string;
  showGutter?: boolean;
  onValueChange: (value: string) => void;
}

const GremlinEditor: React.FC<IProps> = ({
  height = 150,
  showGutter = true,
  gremlinId,
  initValue,
  onValueChange,
}) => {
  let gremlinEditor: any = null;

  console.log('gremlinId', gremlinId);

  useEffect(() => {
    if (!gremlinId) {
      throw new Error(`Gremlin Editor ID do not be undefined`);
    }
    if (!gremlinEditor) {
      gremlinEditor = (window as any).ace.edit(gremlinId);
      // (window as any).ace.require('ace/ext/old_ie');
      (window as any).ace.require('ace/ext/language_tools');
      gremlinEditor.setTheme('ace/theme/clouds_midnight');
      gremlinEditor.session.setMode('ace/mode/gremlin');
      gremlinEditor.setShowPrintMargin(false);
      gremlinEditor.setHighlightActiveLine(false);
      gremlinEditor.renderer.setShowGutter(showGutter);
      gremlinEditor.$blockScrolling = Infinity;
      // gremlinEditor.setOption('maxLines', 15);
      gremlinEditor.setOption('minLines', 3);
      console.log(Object.keys(gremlinEditor.$options));
      gremlinEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      });

      gremlinEditor.on('change', () => {
        const selectedValue = gremlinEditor.session.getTextRange(
          gremlinEditor.getSelectionRange(),
        );
        const queryValue = selectedValue || gremlinEditor.getValue();

        if (onValueChange) {
          onValueChange(queryValue);
        }
      });
    }

    if (initValue) {
      gremlinEditor.setValue(initValue);
    }
  }, [gremlinId]);

  return <div id={gremlinId} style={{ height }} />;
};

export default GremlinEditor;
