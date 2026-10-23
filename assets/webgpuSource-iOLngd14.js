(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=e.filter(Number.isFinite).sort();if(t.length===0)return{min:0,max:0,median:0};let n=e=>{let n=e*(t.length-1),r=Math.floor(n),i=Math.min(t.length-1,r+1);return t[r]+(t[i]-t[r])*(n-r)};return{min:n(.01),max:n(.99),median:n(.5)}}function t(e,t,n){let r=new Float32Array(e.length),i=new Float32Array(t);for(let a=0;a<n;a++){let n=a*t,o=NaN;for(let r=t-1;r>=0;r--){let t=e[n+r];Number.isFinite(t)&&(o=t),i[r]=o}let s=NaN;for(let a=0;a<t;a++){let t=e[n+a];if(Number.isFinite(t)){s=t,r[n+a]=t;continue}let o=i[a];Number.isFinite(s)&&Number.isFinite(o)?r[n+a]=Math.min(s,o):Number.isFinite(s)?r[n+a]=s:Number.isFinite(o)?r[n+a]=o:r[n+a]=0}}return r}function n(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=Number.isFinite(e[n])?255:0;return t}function r(e,t,n,r,i=1){let a=new Float32Array(e.length),o=new Float32Array(t.length);for(let s=0;s<r;s++){let r=s*n;for(let s=0;s<n;s++){let c=e[r+s],l=Math.round(s-c);a[r+s]=Number.isFinite(c)&&l>=0&&l<n&&Math.abs(t[r+l]-c)<=i?c:NaN;let u=t[r+s],d=Math.round(s+u);o[r+s]=Number.isFinite(u)&&d>=0&&d<n&&Math.abs(e[r+d]-u)<=i?u:NaN}}return{left:a,right:o}}function i(e,t,n){let r=new Float32Array(e.length),i=[];for(let a=0;a<n;a++)for(let o=0;o<t;o++){let s=e[a*t+o];if(!Number.isFinite(s))r[a*t+o]=NaN;else{i.length=0;for(let r=-1;r<=1;r++){let s=a+r;if(!(s<0||s>=n))for(let n=-1;n<=1;n++){let r=o+n;if(r<0||r>=t)continue;let a=e[s*t+r];Number.isFinite(a)&&i.push(a)}}i.sort((e,t)=>e-t),r[a*t+o]=i[i.length>>1]}}return r}var a=class extends Error{code;constructor(e,t){super(t),this.code=e,this.name=`ViewerError`}},o=e=>fetch(e),s=e=>typeof e==`object`&&!!e,c=e=>typeof e==`number`&&Number.isInteger(e)&&e>0,l=(e,t=0)=>typeof e==`number`&&Number.isFinite(e)?e:t,u=e=>typeof e==`string`?e:``;function d(e){return!s(e)||typeof e.left!=`string`||typeof e.right!=`string`||!c(e.width)||!c(e.height)||!(l(e.scale)>0)?null:{left:e.left,right:e.right,width:e.width,height:e.height,scale:e.scale,min:l(e.min),max:l(e.max),median:l(e.median),algorithm:u(e.algorithm)}}function f(e){return!s(e)||typeof e.left!=`string`||!c(e.width)||!c(e.height)||!(l(e.scale)>0)?null:{left:e.left,width:e.width,height:e.height,scale:e.scale}}function p(e,t){if(!s(e))throw new a(`load`,`Ugyldig pair.json: ikke et objekt`);for(let t of[`id`,`left`,`right`])if(typeof e[t]!=`string`||!e[t])throw new a(`load`,`Ugyldig pair.json: mangler «${t}»`);return{id:u(e.id),title:u(e.title),credit:u(e.credit),license:u(e.license),sourceUrl:u(e.sourceUrl),width:l(e.width),height:l(e.height),left:u(e.left),right:u(e.right),disparity:d(e.disparity),groundTruth:f(e.groundTruth),defaultConvergence:l(e.defaultConvergence),swapSuspected:e.swapSuspected===!0,baseUrl:t}}async function m(e,t=o){let n=new URL(e,document.baseURI),r;try{r=await t(n)}catch{throw new a(`load`,`Kunne ikke laste ${n.pathname}`)}if(!r.ok)throw new a(`load`,`Kunne ikke laste ${n.pathname} (${r.status})`);let i;try{i=await r.json()}catch{throw new a(`load`,`Ugyldig JSON i ${n.pathname}`)}return p(i,new URL(`.`,n).href)}function h(e,t){return{id:`egendefinert`,title:``,credit:``,license:``,sourceUrl:``,width:0,height:0,left:new URL(e,document.baseURI).href,right:new URL(t,document.baseURI).href,disparity:null,groundTruth:null,defaultConvergence:0,swapSuspected:!1,baseUrl:document.baseURI}}async function g(e,t=o){let n=async n=>{let r=new URL(n,e.baseUrl),i=r.protocol===`blob:`?`bildet`:r.pathname.split(`/`).pop()||n,o;try{o=await t(r)}catch{throw new a(`load`,`Kunne ikke laste ${i}`)}if(!o.ok)throw new a(`load`,`Kunne ikke laste ${i} (${o.status})`);return{blob:await o.blob(),label:i}},r=async e=>{try{return await createImageBitmap(e.blob)}catch{throw new a(`load`,`Kunne ikke dekode ${e.label}`)}},[i,s]=await Promise.all([n(e.left),n(e.right)]),c=i.blob,l=s.blob,[u,d]=await Promise.allSettled([r(i),r(s)]);if(u.status===`rejected`||d.status===`rejected`)throw u.status===`fulfilled`&&u.value.close(),d.status===`fulfilled`&&d.value.close(),u.status===`rejected`?u.reason:d.reason;let f=u.value,p=d.value;if(f.width!==p.width||f.height!==p.height)throw f.close(),p.close(),new a(`size-mismatch`,`Bildeparet må ha samme dimensjoner`);return{info:{...e,width:f.width,height:f.height},leftBlob:c,rightBlob:l,left:f,right:p}}function _(e,t,n,r){if(e.byteLength!==t*n*2)throw Error(`Feil størrelse på disparitetsfil: ${e.byteLength} byte, forventet ${t*n*2}`);let i=new DataView(e),a=new Float32Array(t*n);for(let e=0;e<a.length;e++){let t=i.getInt16(e*2,!0);a[e]=t===-32768?NaN:t/r}return a}function v(t=e=>fetch(e)){return{id:`file`,async available(){return!0},async load(n,r){let i=n.info.disparity;if(!i)throw Error(`Paret har ingen forhåndsberegnede disparitetsfiler`);let a=performance.now(),o=async e=>{let r=await t(new URL(e,n.info.baseUrl));if(!r.ok)throw Error(`Kunne ikke laste ${e} (${r.status})`);return r.arrayBuffer()},[s,c]=await Promise.all([o(i.left),o(i.right)]);r?.(1);let l=_(s,i.width,i.height,i.scale);return{left:l,right:_(c,i.width,i.height,i.scale),width:i.width,height:i.height,imageScale:n.info.width/i.width,...e(l),ms:performance.now()-a,fromCache:!1,algorithm:i.algorithm}}}}var y=`
struct Params {
  w: u32,
  h: u32,
  dMin: i32,
  nD: u32,
  p1: u32,
  p2: u32,
  dir: u32,
  pad: u32,
}
@group(0) @binding(0) var<uniform> P: Params;
`,b=y+`
@group(0) @binding(1) var src: texture_2d<f32>;
@group(0) @binding(2) var<storage, read_write> outCensus: array<vec2<u32>>;

fn lum(x: i32, y: i32) -> f32 {
  let p = vec2<i32>(clamp(x, 0, i32(P.w) - 1), clamp(y, 0, i32(P.h) - 1));
  let c = textureLoad(src, p, 0);
  return dot(c.rgb, vec3<f32>(0.299, 0.587, 0.114));
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= P.w || gid.y >= P.h) { return; }
  let x = i32(gid.x);
  let y = i32(gid.y);
  let c = lum(x, y);
  var lo = 0u;
  var hi = 0u;
  var k = 0u;
  for (var dy = -3; dy <= 3; dy++) {
    for (var dx = -4; dx <= 4; dx++) {
      if (dx == 0 && dy == 0) { continue; }
      if (lum(x + dx, y + dy) < c) {
        if (k < 32u) { lo = lo | (1u << k); } else { hi = hi | (1u << (k - 32u)); }
      }
      k = k + 1u;
    }
  }
  outCensus[gid.y * P.w + gid.x] = vec2<u32>(lo, hi);
}
`,x=`
@group(0) @binding(1) var<storage, read> censusL: array<vec2<u32>>;
@group(0) @binding(2) var<storage, read> censusR: array<vec2<u32>>;
const MAX_COST: u32 = 62u;

fn cost(x: i32, y: u32, d: i32) -> u32 {
  let xr = x - d;
  if (x < 0 || x >= i32(P.w) || xr < 0 || xr >= i32(P.w)) { return MAX_COST; }
  let a = censusL[y * P.w + u32(x)];
  let b = censusR[y * P.w + u32(xr)];
  return countOneBits(a.x ^ b.x) + countOneBits(a.y ^ b.y);
}
`,S=y+x+`
@group(0) @binding(3) var<storage, read_write> outBest: array<vec2<f32>>;
const STEP: u32 = 8u;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let gw = (P.w + STEP - 1u) / STEP;
  let gh = (P.h + STEP - 1u) / STEP;
  if (gid.x >= gw * gh) { return; }
  let x = i32((gid.x % gw) * STEP);
  let y = i32((gid.x / gw) * STEP);
  var best = 1e9;
  var second = 1e9;
  var bestD = 0;
  for (var k = 0u; k < P.nD; k++) {
    let d = P.dMin + i32(k);
    var s = 0u;
    for (var dy = -2; dy <= 2; dy++) {
      for (var dx = -2; dx <= 2; dx++) {
        let yy = u32(clamp(y + dy, 0, i32(P.h) - 1));
        let xx = clamp(x + dx, 0, i32(P.w) - 1);
        s = s + cost(xx, yy, d);
      }
    }
    let fs = f32(s);
    if (fs < best) {
      if (abs(d - bestD) > 1) { second = best; }
      best = fs;
      bestD = d;
    } else if (fs < second && abs(d - bestD) > 1) {
      second = fs;
    }
  }
  let confident = best < 0.85 * second && best < 775.0;
  outBest[gid.x] = vec2<f32>(f32(bestD), select(0.0, 1.0, confident));
}
`,C=y+x+`
@group(0) @binding(3) var<storage, read_write> S: array<u32>;
const BIG: u32 = 65535u;
var<workgroup> prevL: array<u32, 66>;
var<workgroup> red: array<u32, 64>;

@compute @workgroup_size(64)
fn main(@builtin(workgroup_id) wid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>) {
  let d = lid.x;
  let isActive = d < P.nD;
  let horizontal = P.dir < 2u;
  let rev = P.dir == 1u || P.dir == 3u;
  let lineIdx = wid.x;
  let len = select(P.h, P.w, horizontal);
  prevL[d + 1u] = BIG;
  if (d == 0u) { prevL[0] = BIG; prevL[65] = BIG; }
  var minPrev = 0u;
  workgroupBarrier();
  for (var i = 0u; i < len; i++) {
    let pos = select(i, len - 1u - i, rev);
    let x = select(lineIdx, pos, horizontal);
    let y = select(pos, lineIdx, horizontal);
    var lr = 0u;
    if (isActive) {
      let c = cost(i32(x), y, P.dMin + i32(d));
      if (i == 0u) {
        lr = c;
      } else {
        let a = prevL[d + 1u];
        let b = min(prevL[d], prevL[d + 2u]) + P.p1;
        let e = minPrev + P.p2;
        lr = c + min(min(a, b), e) - minPrev;
      }
    }
    workgroupBarrier();
    if (isActive) {
      prevL[d + 1u] = lr;
      red[d] = lr;
      let idx = (y * P.w + x) * P.nD + d;
      S[idx] = S[idx] + lr;
    } else {
      red[d] = BIG;
    }
    workgroupBarrier();
    for (var s = 32u; s > 0u; s = s >> 1u) {
      if (d < s) { red[d] = min(red[d], red[d + s]); }
      workgroupBarrier();
    }
    minPrev = red[0];
    workgroupBarrier();
  }
}
`,w=y+`
@group(0) @binding(1) var<storage, read> S: array<u32>;
@group(0) @binding(2) var<storage, read_write> outL: array<f32>;
@group(0) @binding(3) var<storage, read_write> outR: array<f32>;
const INVALID: f32 = -1e9;

fn parabola(a: f32, b: f32, c: f32) -> f32 {
  let den = a - 2.0 * b + c;
  if (den <= 0.0) { return 0.0; }
  return clamp((a - c) / (2.0 * den), -0.5, 0.5);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= P.w || gid.y >= P.h) { return; }
  let x = gid.x;
  let row = gid.y * P.w;
  let base = (row + x) * P.nD;
  var best = 0xffffffffu;
  var bk = 0u;
  for (var k = 0u; k < P.nD; k++) {
    let s = S[base + k];
    if (s < best) { best = s; bk = k; }
  }
  var sub = 0.0;
  if (bk > 0u && bk + 1u < P.nD) {
    sub = parabola(f32(S[base + bk - 1u]), f32(best), f32(S[base + bk + 1u]));
  }
  outL[row + x] = f32(P.dMin + i32(bk)) + sub;

  // høyre kart: venstre piksel x_L = x + dMin + k har kost S(x_L, y, k)
  var bestR = 0xffffffffu;
  var bkR = 0u;
  var found = false;
  for (var k = 0u; k < P.nD; k++) {
    let xl = i32(x) + P.dMin + i32(k);
    if (xl < 0 || xl >= i32(P.w)) { continue; }
    let s = S[(row + u32(xl)) * P.nD + k];
    if (s < bestR) { bestR = s; bkR = k; found = true; }
  }
  if (!found) { outR[row + x] = INVALID; return; }
  var subR = 0.0;
  let xm = i32(x) + P.dMin + i32(bkR) - 1;
  let xp = i32(x) + P.dMin + i32(bkR) + 1;
  if (bkR > 0u && bkR + 1u < P.nD && xm >= 0 && xp < i32(P.w)) {
    subR = parabola(f32(S[(row + u32(xm)) * P.nD + bkR - 1u]), f32(bestR), f32(S[(row + u32(xp)) * P.nD + bkR + 1u]));
  }
  outR[row + x] = f32(P.dMin + i32(bkR)) + subR;
}
`;function T(e,t=64,n=4){let r=[];for(let t=0;t+1<e.length;t+=2)e[t+1]>.5&&r.push(e[t]);if(r.length<20)return{dMin:-Math.floor(t/2),nD:t,confident:r.length};r.sort((e,t)=>e-t);let i=e=>r[Math.min(r.length-1,Math.max(0,Math.round(e*(r.length-1))))],a=Math.floor(i(.02))-n,o=Math.ceil(i(.98))+n;return o-a+1>t&&(a=Math.round(i(.5))-Math.floor(t/2),o=a+t-1),{dMin:a,nD:o-a+1,confident:r.length}}function E(e,t,n,r,i){let a=Math.min(e,n),o=Math.max(8,Math.round(t*a/e));for(;a>64&&a*o*r*4>i;)a=Math.floor(a*.9),o=Math.max(8,Math.round(t*a/e));return{w:a,h:o}}var D=`webgpu-census-sgm@1`,O={maxWidth:512,maxD:64,p1:10,p2:120},k=null;function A(){return k||(k=(async()=>{let e=await navigator.gpu.requestAdapter();if(!e)throw Error(`Fant ingen WebGPU-adapter`);let t=await e.requestDevice({requiredLimits:{maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize,maxBufferSize:e.limits.maxBufferSize}});return t.lost.then(()=>{k=null}),t})(),k.catch(()=>{k=null})),k}function j(t=O){return{id:`webgpu`,async available(){if(typeof navigator>`u`||!navigator.gpu)return`WebGPU er ikke tilgjengelig i denne nettleseren`;try{return await A(),!0}catch(e){return e instanceof Error?e.message:`WebGPU kunne ikke startes`}},async load(n,r){let i=performance.now(),a=await N(await A(),n.left,n.right,t,r);return{...a,...e(a.left),ms:performance.now()-i,fromCache:!1,algorithm:D}}}}async function M(e,t,n){let r=await createImageBitmap(e,{resizeWidth:t,resizeHeight:n,resizeQuality:`high`});if(r.width===t&&r.height===n)return r;r.close();let i=new OffscreenCanvas(t,n),a=i.getContext(`2d`);if(!a)throw Error(`Kunne ikke skalere bildet for WebGPU`);return a.imageSmoothingQuality=`high`,a.drawImage(e,0,0,t,n),i.transferToImageBitmap()}async function N(e,t,n,a,o){let s=Math.min(64,a.maxD),{w:c,h:l}=E(t.width,t.height,a.maxWidth,s,e.limits.maxStorageBufferBindingSize),u=t.width/c,d=[],[f,p]=await Promise.all([t,n].map(e=>M(e,c,l))),m=t=>{let n=e.createTexture({size:[c,l],format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return d.push(n),e.queue.copyExternalImageToTexture({source:t},{texture:n},[c,l]),n},h=(t,n=0)=>{let r=e.createBuffer({size:Math.max(16,t),usage:GPUBufferUsage.STORAGE|n});return d.push(r),r},g=t=>{let n=new ArrayBuffer(32),r=new Uint32Array(n),i=new Int32Array(n);r[0]=t.w,r[1]=t.h,i[2]=t.dMin,r[3]=t.nD,r[4]=t.p1,r[5]=t.p2,r[6]=t.dir;let a=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});return e.queue.writeBuffer(a,0,n),d.push(a),a},_=t=>e.createComputePipeline({layout:`auto`,compute:{module:e.createShaderModule({code:t}),entryPoint:`main`}}),v=(t,n,r,i=1)=>{let a=e.createBindGroup({layout:t.getBindGroupLayout(0),entries:n.map((e,t)=>({binding:t,resource:e instanceof GPUBuffer?{buffer:e}:e}))}),o=e.createCommandEncoder(),s=o.beginComputePass();s.setPipeline(t),s.setBindGroup(0,a),s.dispatchWorkgroups(r,i),s.end(),e.queue.submit([o.finish()])};try{let t={w:c,h:l,dMin:0,nD:1,p1:a.p1,p2:a.p2,dir:0},n=Math.ceil(c/8),d=Math.ceil(l/8),{censusL:y,censusR:x,coarseOut:E}=await P(e,()=>{let e=m(f),r=m(p),i=h(c*l*8),a=h(c*l*8),s=_(b),u=g(t);v(s,[u,e.createView(),i],Math.ceil(c/8),Math.ceil(l/8)),v(s,[u,r.createView(),a],Math.ceil(c/8),Math.ceil(l/8)),o?.(.1);let y=Math.floor(c/4),x=h(n*d*8,GPUBufferUsage.COPY_SRC);return v(_(S),[g({...t,dMin:-y,nD:2*y+1}),i,a,x],Math.ceil(n*d/64)),{censusL:i,censusR:a,coarseOut:x}}),D=T(new Float32Array(await F(e,E,n*d*8)),s);o?.(.3);let{outL:O,outR:k}=await P(e,()=>{let n=h(c*l*D.nD*4,GPUBufferUsage.COPY_DST),r=e.createCommandEncoder();r.clearBuffer(n),e.queue.submit([r.finish()]);let i=_(C);for(let e=0;e<4;e++)v(i,[g({...t,dMin:D.dMin,nD:D.nD,dir:e}),y,x,n],e<2?l:c),o?.(.3+.15*(e+1));let a=h(c*l*4,GPUBufferUsage.COPY_SRC),s=h(c*l*4,GPUBufferUsage.COPY_SRC);return v(_(w),[g({...t,dMin:D.dMin,nD:D.nD}),n,a,s],Math.ceil(c/8),Math.ceil(l/8)),{outL:a,outR:s}}),[A,j]=await Promise.all([F(e,O,c*l*4),F(e,k,c*l*4)]);o?.(.95);let M=new Float32Array(A),N=new Float32Array(j);for(let e of[M,N])for(let t=0;t<e.length;t++)e[t]<-1e8&&(e[t]=NaN);let I=r(M,N,c,l,1),L=i(I.left,c,l),R=i(I.right,c,l);for(let e of[L,R])for(let t=0;t<e.length;t++)e[t]*=u;return o?.(1),{left:L,right:R,width:c,height:l,imageScale:u}}finally{for(let e of d)e.destroy();f.close(),p.close()}}async function P(e,t){e.pushErrorScope(`out-of-memory`),e.pushErrorScope(`validation`);let n,r;try{r=t()}finally{n=Promise.all([e.popErrorScope(),e.popErrorScope()])}let[i,a]=await n,o=a??i;if(o)throw Error(`WebGPU-beregningen feilet: `+o.message);return r}async function F(e,t,n){let r=e.createBuffer({size:n,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),i=e.createCommandEncoder();i.copyBufferToBuffer(t,0,r,0,n),e.queue.submit([i.finish()]),await r.mapAsync(GPUMapMode.READ);let a=r.getMappedRange().slice(0);return r.unmap(),r.destroy(),a}export{_ as a,h as c,n as d,v as i,g as l,O as n,a as o,j as r,m as s,D as t,t as u};