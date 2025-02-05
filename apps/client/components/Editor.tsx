import { Monaco, Editor as MonacoEditor } from '@monaco-editor/react'
import { setupTypeAcquisition } from '@typescript/ata'
import { constrainedEditor } from 'constrained-editor-plugin'
import debounce from 'lodash.debounce'
import type { editor } from 'monaco-editor'
import React, { useCallback } from 'react'
import ts from 'typescript'

// @ts-ignore Library isn't typed. (https://github.com/Pranomvignesh/constrained-editor-plugin/issues/68#issuecomment-2635040933)
import { store } from '../store'

export type EditorProps = {
  /**
   * Starting value for the editor. Only read once on init.
   */
  defaultValue: string
  /**
   * Updates every time *anything* in the editor changes and sends the complete contents.
   */
  onChange?: (value: string) => void
  /**
   * Constraints for the editor
   */
  constraints?: {
    /**
     * Treat this label as an unique ID, allows getting the value as it changes.
     */
    label: string
    /**
     * The range of the constraint, in the format [startLine, startColumn, endLine, endColumn]
     */
    range: [number, number, number, number]
    /**
     * allow multiline value?
     */
    allowMultiline?: boolean
  }[]
  // This will be called on changes only when constraints are set. Otherwise use `onChange`
  onConstraintsChange?: (changes: { [label: string]: string }) => void
}

export const Editor: React.FC<EditorProps> = ({
  defaultValue,
  onChange,
  constraints = [],
  onConstraintsChange,
}) => {
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = React.useRef<Monaco | null>(null)

  const ata = useCallback(() => {
    if (monacoRef.current !== null) {
      return setupTypeAcquisition({
        projectName: 'CodeGlue',
        typescript: ts,
        logger: console,
        delegate: {
          receivedFile: (code: string, _path: string) => {
            const monaco = monacoRef.current!

            const path = 'file://' + _path

            if (path === 'file:///node_modules/@digital-alchemy/hass/dist/dynamic.d.mts') {
              code = store.typeWriter
            }

            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, path)

            console.log(`[ATA] Adding ${path} to runtime`, { code })
          },
          started: () => {
            console.log('ATA start')
          },
          finished: (f) => {
            console.log('ATA done')
          },
        },
      })
    }

    throw new Error('Monaco not initialized')
  }, [monacoRef])

  const handleEditorBeforeMount = (monaco: Monaco) => {
    monacoRef.current = monaco

    // Configure TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      allowNonTsExtensions: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
    })
  }

  const handleOnMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor

    if (constraints.length > 0) {
      const constrainedInstance = constrainedEditor(monaco)
      constrainedInstance.initializeIn(editor)

      const model = editor.getModel() as editor.ITextModel & {
        toggleHighlightOfEditableAreas: (options: {
          cssClassForSingleLine: string
          cssClassForMultiLine: string
        }) => void
        onDidChangeContentInEditableRange: (
          listener: (
            currentlyChangedContent: string,
            allValuesInEditableRanges: { [label: string]: string },
            currentEditableRangeObject: { [label: string]: string },
          ) => void,
        ) => void
      }

      if (!model) throw new Error('Editor Model not found?')

      constrainedInstance.addRestrictionsTo(model, constraints)

      // add classes to style editable areas
      model.toggleHighlightOfEditableAreas({
        cssClassForSingleLine: 'editable-singleLine',
        cssClassForMultiLine: 'editable-multiLine',
      })

      model.onDidChangeContentInEditableRange((_, allValuesInEditableRanges) => {
        onConstraintsChange && onConstraintsChange(allValuesInEditableRanges)
      })
    }

    // acquire types
    ata()(defaultValue)
  }

  const handleOnChange = (value: string | undefined) => {
    if (onChange && value) {
      onChange(value)
    }
  }

  return (
    <MonacoEditor
      height="400px"
      defaultLanguage="typescript"
      defaultValue={defaultValue}
      beforeMount={handleEditorBeforeMount}
      onChange={handleOnChange}
      onMount={handleOnMount}
      language="typescript"
      defaultPath="index.ts"
      path="index.ts"
      options={{
        minimap: {
          enabled: false,
        },
        tabSize: 2,
      }}
    />
  )
}
