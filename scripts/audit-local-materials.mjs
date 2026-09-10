import {createHash} from 'node:crypto';
import {readdir, readFile, stat, writeFile, mkdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {basename, dirname, resolve} from 'node:path';

const root=process.cwd();
const manifest=JSON.parse(await readFile(resolve(root,'data/local-material-manifest.json'),'utf8'));
const strict=process.argv.includes('--strict');
const configured=process.env.CELLPINDA_MATERIAL_ROOTS
  ? process.env.CELLPINDA_MATERIAL_ROOTS.split(';').map(value=>value.trim()).filter(Boolean)
  : manifest.sourceRoots;
const roots=configured.map(value=>resolve(value));
const wanted=new Set(manifest.artifacts.flatMap(artifact=>artifact.names));
const files=new Map();

async function walk(directory){
  if(!existsSync(directory)) return;
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const path=resolve(directory,entry.name);
    if(entry.isDirectory()) await walk(path);
    else if(entry.isFile() && wanted.has(basename(path)) && !files.has(basename(path))) files.set(basename(path),path);
  }
}
for(const sourceRoot of roots) await walk(sourceRoot);

const artifacts=[];
for(const artifact of manifest.artifacts){
  const matches=artifact.names.map(name=>files.get(name)).filter(Boolean);
  if(!matches.length){
    artifacts.push({id:artifact.id,classification:artifact.classification,status:'missing',names:artifact.names,publicUse:artifact.publicUse,requiredFor:artifact.requiredFor});
    continue;
  }
  const file=matches[0];
  const bytes=await readFile(file);
  const metadata=await stat(file);
  artifacts.push({
    id:artifact.id,
    classification:artifact.classification,
    status:'found',
    path:file,
    size:metadata.size,
    modifiedAt:metadata.mtime.toISOString(),
    sha256:createHash('sha256').update(bytes).digest('hex'),
    expectedSignals:artifact.expectedSignals,
    publicUse:artifact.publicUse,
    requiredFor:artifact.requiredFor,
  });
}

const required=artifacts.filter(artifact=>artifact.requiredFor?.includes('B2'));
const finishedProductCandidates=required.filter(artifact=>artifact.status==='found' && artifact.classification.startsWith('finished_product'));
const result={
  schemaVersion:1,
  goalId:manifest.goalId,
  generatedAt:new Date().toISOString(),
  sourceRoots:roots,
  artifacts,
  summary:{
    found:artifacts.filter(artifact=>artifact.status==='found').length,
    missing:artifacts.filter(artifact=>artifact.status==='missing').length,
    finishedProductCandidates:finishedProductCandidates.length,
    b2Candidate:finishedProductCandidates.length >= 3,
    excludedBulkMaterial:artifacts.filter(artifact=>artifact.classification==='bulk_raw_material_label' && artifact.status==='found').length,
  },
};
const output=resolve(root,'tmp/local-material-audit.json');
await mkdir(dirname(output),{recursive:true});
await writeFile(output,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output, ...result.summary}));
if(strict && result.summary.missing>0) process.exitCode=1;
