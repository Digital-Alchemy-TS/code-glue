import { setup } from "monaco-prettier/worker"
import * as babel from "prettier/plugins/babel"
import * as estree from "prettier/plugins/estree"
import * as typescript from "prettier/plugins/typescript"

setup([
	// Supports parsing JavaScript into estree
	babel,
	// Supports formatting estree
	estree,
	// Supports formatting TypeScript
	typescript,
])
