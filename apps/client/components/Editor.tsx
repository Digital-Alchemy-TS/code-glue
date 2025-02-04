import { Monaco, Editor as MonacoEditor } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import React from 'react'

import { constrainedEditor } from '../../../node_modules/constrained-editor-plugin/dist/esm/constrainedEditor'
import { store } from '../store'

export type EditorProps = {
  /**
   * Starting value for the editor. Only read once on init.
   */
  defaultValue: string
  /**
   * Updates every time *anything* in the editor changes and sends the complete body.
   */
  onChange?: (value: string) => void
  /**
   * Constraints for the editor
   */
  constraints?: {
    /**
     * The range of the constraint, in the format [startLine, startColumn, endLine, endColumn]
     */
    range: [number, number, number, number]
    /**
     * allow multiline value?
     */
    allowMultiline?: boolean
    /**
     * Treat this label as an unique ID, allows getting the value as it changes.
     */
    label?: string
  }[]
  // onConstraintsChange?: (constraints: EditorProps['constraints']) => void
}

export const Editor: React.FC<EditorProps> = ({ defaultValue, onChange, constraints = [] }) => {
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

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor

    if (constraints.length > 0) {
      const constrainedInstance = constrainedEditor(monaco)
      const model = editor.getModel()

      if (!model) throw new Error('Editor Model not found?')

      constrainedInstance.initializeIn(editor)
      constrainedInstance.addRestrictionsTo(model, constraints)

      model.onDidChangeContentInEditableRange(
        (currentlyChangedContent, allValuesInEditableRanges, currentEditableRangeObject) => {
          console.log('currentlyChangedContent', currentlyChangedContent)
          console.log('allValuesInEditableRanges', allValuesInEditableRanges)
          console.log('currentEditableRangeObject', currentEditableRangeObject)
        },
      )
    }
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
      onMount={handleEditorDidMount}
      options={{
        minimap: {
          enabled: false,
        },
        tabSize: 2,
      }}
    />
  )
}
