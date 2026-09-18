import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import {existsSync, unlinkSync} from 'node:fs';
import {resolve} from 'node:path';

const privateSnapshots = ['operations-queue.json', 'tf-pulse.json', 'goal-audit.json', 'tf-meeting-packet.json'];
const apiProxyTarget = process.env.CELLPINDA_API_TARGET || 'http://127.0.0.1:4318';
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(apiProxyTarget)) throw new Error('CELLPINDA_API_TARGET must point to a local loopback port.');
let buildOutputDirectory = resolve(process.cwd(), 'dist');
const omitPrivateOperationsSnapshots: Plugin = {
  name: 'omit-private-operations-snapshots',
  apply: 'build' as const,
  configResolved(config) {
    buildOutputDirectory = config.build.outDir;
  },
  closeBundle() {
    const directory = resolve(buildOutputDirectory, 'data');
    for (const file of privateSnapshots) {
      const path = resolve(directory, file);
      if (existsSync(path)) unlinkSync(path);
    }
  },
};

export default defineConfig({base:process.env.VITE_BASE_PATH||'/',plugins:[react(),omitPrivateOperationsSnapshots],server:{port:5173,strictPort:true,proxy:{'/api':apiProxyTarget}},preview:{port:4173,proxy:{'/api':apiProxyTarget}}});
