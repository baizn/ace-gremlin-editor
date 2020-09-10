import React, { useEffect } from 'react';
require('../source/ace/ace-builds/src-noconflict/ace');
require('../source/ace/ace-builds/src-noconflict/mode-gremlin');
require('../source/ace/ace-builds/src-noconflict/theme-clouds_midnight');
require('../source/ace/ace-builds/src-noconflict/ext-language_tools');
import './index.less';

/**
 * 参考文档：https://ace.c9.io/#nav=api&api=editor
 */
interface IProps {
  height: number;
  gremlinId: string;
  initValue: string;
  historyValue?: string;
  showGutter?: boolean;
  onValueChange?: (value: string) => void;
  onSelectChange?: (value: string) => void;
  isReadOnly?: boolean;
}

let refEditorInstance: any = null;

const GremlinEditor: React.FC<IProps> = ({
  height = 150,
  showGutter = true,
  gremlinId,
  initValue,
  onValueChange,
  onSelectChange,
  isReadOnly = false,
  historyValue,
}) => {
  let gremlinEditor: any = null;
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
      gremlinEditor.setReadOnly(isReadOnly);
      gremlinEditor.setOption('minLines', 3);
      gremlinEditor.setOption('wrap', 'free');
      // console.log(Object.keys(gremlinEditor.$options));
      gremlinEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      });

      refEditorInstance = gremlinEditor;

      gremlinEditor.on('change', () => {
        const queryValue = gremlinEditor.getValue();

        if (onValueChange) {
          onValueChange(queryValue);
        }
      });

      gremlinEditor.on('changeSelection', () => {
        const selectedValue = gremlinEditor.session.getTextRange(
          gremlinEditor.getSelectionRange(),
        );

        if (onSelectChange) {
          onSelectChange(selectedValue);
        }
      });
    }

    if (initValue) {
      gremlinEditor.setValue(initValue);
    }

    // 清除默认选中的内容
    gremlinEditor.clearSelection();
    // 自动换到下一行
    gremlinEditor.splitLine();
    // 将光标移动到第二行
    gremlinEditor.gotoLine(2, 4, true);

    return () => {
      gremlinEditor.destroy();
      gremlinEditor.container.remove();
      gremlinEditor = null;
      refEditorInstance = null;
    };
  }, [gremlinId]);

  useEffect(() => {
    if (refEditorInstance && historyValue) {
      refEditorInstance.insert(historyValue);
    }
  }, [historyValue]);

  return <div id={gremlinId} style={{ height }} />;
};

export default GremlinEditor;
