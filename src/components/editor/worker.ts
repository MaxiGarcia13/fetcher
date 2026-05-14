import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

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

const JSON_WORKER_LABELS = new Set(['json', 'jsonc']);
const HTML_WORKER_LABELS = new Set(['html', 'handlebars', 'razor']);

workerGlobalScope.MonacoEnvironment = {
  getWorker(_workerId, label) {
    if (JSON_WORKER_LABELS.has(label)) {
      return new JsonWorker();
    }
    if (HTML_WORKER_LABELS.has(label)) {
      return new HtmlWorker();
    }
    // Markdown and other basic languages use the default editor worker (no separate markdown worker in monaco ESM).
    return new EditorWorker();
  },
};
