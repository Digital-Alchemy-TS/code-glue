import { Monaco, Editor as MonacoEditor } from '@monaco-editor/react'
import { setupTypeAcquisition } from '@typescript/ata'
import type { editor } from 'monaco-editor'
import React, { useCallback } from 'react'
import ts from 'typescript'

// @ts-ignore Library isn't typed. (https://github.com/Pranomvignesh/constrained-editor-plugin/issues/68#issuecomment-2635040933)
import { store } from '../store'

export type EditorProps = {
  /**
   * The 'path' for the current file. This should match up with whatever is sent for default value.
   */
  path: string
  /**
   * Starting value for the editor and the given path. This should be updated as the path changes, but will only be read in once for each path value.
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

export const Editor: React.FC<EditorProps> = ({ path, defaultValue, onChange, globalTypes }) => {
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

            const filePath = 'file://' + _path

            // load in the local types in place of the default placeholder ones
            if (filePath === 'file:///node_modules/@digital-alchemy/hass/dist/dev/mappings.d.mts') {
              code = store.typeWriter.mappings
            }
            if (filePath === 'file:///node_modules/@digital-alchemy/hass/dist/dev/registry.d.mts') {
              code = store.typeWriter.registry
            }
            if (filePath === 'file:///node_modules/@digital-alchemy/hass/dist/dev/services.d.mts') {
              code = store.typeWriter.services
            }

            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, filePath)
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
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        store.typeWriter + '\n\n' + globalTypes,
        'file:///globals.ts',
      )

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
      path={path}
      options={{ minimap: { enabled: false }, tabSize: 2 }}
    />
  )
}
