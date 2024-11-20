import { Monaco, Editor as MonacoEditor } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import React from 'react'

import { store } from '../store'
export type EditorProps = {
  defaultValue: string
  onChange?: (value: string) => void
}

export const Editor: React.FC<EditorProps> = ({ defaultValue, onChange }) => {
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorBeforeMount = (monaco: Monaco) => {
    // Configure TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      allowNonTsExtensions: true,
    })
    const typeSource = store.typeWriter
    const typeUri = 'ts:filename/typeWriter.d.ts'
    monaco.languages.typescript.typescriptDefaults.addExtraLib(typeSource, typeUri)
    monaco.editor.createModel(typeSource, 'typescript', monaco.Uri.parse(typeUri))

    // extra libraries
    const libSource = [
      'declare class TestType {',
      '    /**',
      '     * Some Info about the method',
      '     */',
      '    static doSomething():string',
      '}',
    ].join('\n')
    const libUri = 'ts:filename/test.d.ts'
    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri)
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri))
  }

  return (
    <MonacoEditor
      height="400px"
      defaultLanguage="typescript"
      defaultValue={defaultValue}
      beforeMount={handleEditorBeforeMount}
      onChange={(value) => {
        if (onChange && value) {
          onChange(value)
        }
      }}
      onMount={(editor) => {
        editorRef.current = editor
      }}
      options={{
        minimap: {
          enabled: false,
        },
        tabSize: 2,
      }}
    />
  )
}
