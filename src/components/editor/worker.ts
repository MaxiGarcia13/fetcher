import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypeScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

type MonacoWorkerFactory = (workerId: string, label: string) => Worker;

interface MonacoEnvironment {
  getWorker: MonacoWorkerFactory;
}

declare global {
  interface WorkerGlobalScope {
    MonacoEnvironment?: MonacoEnvironment;
  }
}

const workerGlobalScope = globalThis as WorkerGlobalScope;

workerGlobalScope.MonacoEnvironment = {
  getWorker(_workerId, label) {
    if (label === 'javascript' || label === 'typescript') {
      return new TypeScriptWorker();
    }

    return new EditorWorker();
  },
};
