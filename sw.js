if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const o=s||("document"in self?document.currentScript.src:"")||location.href;if(e[o])return;let a={};const t=s=>i(s,o),c={module:{uri:o},exports:a,require:t};e[o]=Promise.all(n.map((s=>c[s]||t(s)))).then((s=>(r(...s),a)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/CodeEditor-7063a976.js",revision:null},{url:"assets/CodeEditor-e0bd2169.css",revision:null},{url:"assets/DataObject-d6dc501a.js",revision:null},{url:"assets/GraphQLEditor-9cd7822f.js",revision:null},{url:"assets/index-541666a1.js",revision:null},{url:"assets/index-55fec1ff.css",revision:null},{url:"assets/TransformationEditor-43cb4be4.js",revision:null},{url:"assets/TransformationEditor-db14953d.css",revision:null},{url:"assets/TransformationEditorV2-acc582af.js",revision:null},{url:"index.html",revision:"20d8cc8043922740f5101e1a6c60f2f8"},{url:"registerSW.js",revision:"4d99dde56b6e3c5020c80463f2d78ead"},{url:"assets/pwa-icons/icon-72x72.png",revision:"ee1f7832cfd83e529472993743ac3fe1"},{url:"assets/pwa-icons/icon-96x96.png",revision:"4264d1e62c2c83dee916479596693b38"},{url:"assets/pwa-icons/icon-128x128.png",revision:"c537e9869fe297435b3634da0f655606"},{url:"assets/pwa-icons/icon-144x144.png",revision:"c9b6a1779bdb0664ccd990794f9030b5"},{url:"assets/pwa-icons/icon-152x152.png",revision:"b5e236e07210efa0e227a666a8edd66f"},{url:"assets/pwa-icons/icon-192x192.png",revision:"3a56acdef2af43984824a5f0b76138e9"},{url:"assets/pwa-icons/icon-384x384.png",revision:"41a5d41a9cdb085da475ea7760e61da9"},{url:"assets/pwa-icons/icon-512x512.png",revision:"72cdb2692d7ec2b24b41ebbdbe3484e5"},{url:"manifest.webmanifest",revision:"7466d69dd04f7acf25d7d5b98ef5e7f0"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
