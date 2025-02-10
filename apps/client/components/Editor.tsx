import { Monaco, Editor as MonacoEditor } from '@monaco-editor/react'
import { setupTypeAcquisition } from '@typescript/ata'
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
  // This will be passed through ATA and loaded into types but not added to the editor
  globalTypes?: string
}

export const Editor: React.FC<EditorProps> = ({ defaultValue, onChange, globalTypes }) => {
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

            // load in the local types in place of the default placeholder ones
            if (path === 'file:///node_modules/@digital-alchemy/hass/dist/dynamic.d.mts') {
              code = store.typeWriter
            }

            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, path)
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
      typeRoots: ['/globals.ts'],
    })
  }

  const handleOnMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor

    if (globalTypes) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(globalTypes, 'file:///globals.ts')

      // acquire types
      ata()(globalTypes)
    }
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
      options={{ minimap: { enabled: false }, tabSize: 2 }}
    />
  )
}
