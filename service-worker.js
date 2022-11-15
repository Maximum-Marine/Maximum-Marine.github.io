try{self["workbox:core:6.5.3"]&&_()}catch(e){}const e=(e,...s)=>{let a=e;return s.length>0&&(a+=` :: ${JSON.stringify(s)}`),a};class s extends Error{constructor(s,a){super(e(s,a)),this.name=s,this.details=a}}try{self["workbox:routing:6.5.3"]&&_()}catch(e){}const a=e=>e&&"object"==typeof e?e:{handle:e};class i{constructor(e,s,i="GET"){this.handler=a(s),this.match=e,this.method=i}setCatchHandler(e){this.catchHandler=a(e)}}class t extends i{constructor(e,s,a){super((({url:s})=>{const a=e.exec(s.href);if(a&&(s.origin===location.origin||0===a.index))return a.slice(1)}),s,a)}}class n{constructor(){this.i=new Map,this.t=new Map}get routes(){return this.i}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:s}=e,a=this.handleRequest({request:s,event:e});a&&e.respondWith(a)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:s}=e.data,a=Promise.all(s.urlsToCache.map((s=>{"string"==typeof s&&(s=[s]);const a=new Request(...s);return this.handleRequest({request:a,event:e})})));e.waitUntil(a),e.ports&&e.ports[0]&&a.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:s}){const a=new URL(e.url,location.href);if(!a.protocol.startsWith("http"))return;const i=a.origin===location.origin,{params:t,route:n}=this.findMatchingRoute({event:s,request:e,sameOrigin:i,url:a});let o=n&&n.handler;const r=e.method;if(!o&&this.t.has(r)&&(o=this.t.get(r)),!o)return;let c;try{c=o.handle({url:a,request:e,event:s,params:t})}catch(e){c=Promise.reject(e)}const d=n&&n.catchHandler;return c instanceof Promise&&(this.o||d)&&(c=c.catch((async i=>{if(d)try{return await d.handle({url:a,request:e,event:s,params:t})}catch(e){e instanceof Error&&(i=e)}if(this.o)return this.o.handle({url:a,request:e,event:s});throw i}))),c}findMatchingRoute({url:e,sameOrigin:s,request:a,event:i}){const t=this.i.get(a.method)||[];for(const n of t){let t;const o=n.match({url:e,sameOrigin:s,request:a,event:i});if(o)return t=o,(Array.isArray(t)&&0===t.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(t=void 0),{route:n,params:t}}return{}}setDefaultHandler(e,s="GET"){this.t.set(s,a(e))}setCatchHandler(e){this.o=a(e)}registerRoute(e){this.i.has(e.method)||this.i.set(e.method,[]),this.i.get(e.method).push(e)}unregisterRoute(e){if(!this.i.has(e.method))throw new s("unregister-route-but-not-found-with-method",{method:e.method});const a=this.i.get(e.method).indexOf(e);if(!(a>-1))throw new s("unregister-route-route-not-registered");this.i.get(e.method).splice(a,1)}}let o;const r=()=>(o||(o=new n,o.addFetchListener(),o.addCacheListener()),o);function c(e,a,n){let o;if("string"==typeof e){const s=new URL(e,location.href);o=new i((({url:e})=>e.href===s.href),a,n)}else if(e instanceof RegExp)o=new t(e,a,n);else if("function"==typeof e)o=new i(e,a,n);else{if(!(e instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});o=e}return r().registerRoute(o),o}try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}const d={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null},f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[f.prefix,e,f.suffix].filter((e=>e&&e.length>0)).join("-"),g=e=>{(e=>{for(const s of Object.keys(f))e(s)})((s=>{"string"==typeof e[s]&&(f[s]=e[s])}))},u=e=>e||l(f.precache),b=e=>e||l(f.runtime);function h(e,s){const a=new URL(e);for(const e of s)a.searchParams.delete(e);return a.href}class w{constructor(){this.promise=new Promise(((e,s)=>{this.resolve=e,this.reject=s}))}}const m=new Set;function p(e){return"string"==typeof e?new Request(e):e}class v{constructor(e,s){this.l={},Object.assign(this,s),this.event=s.event,this.g=e,this.u=new w,this.h=[],this.m=[...e.plugins],this.p=new Map;for(const e of this.m)this.p.set(e,{});this.event.waitUntil(this.u.promise)}async fetch(e){const{event:a}=this;let i=p(e);if("navigate"===i.mode&&a instanceof FetchEvent&&a.preloadResponse){const e=await a.preloadResponse;if(e)return e}const t=this.hasCallback("fetchDidFail")?i.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))i=await e({request:i.clone(),event:a})}catch(e){if(e instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const n=i.clone();try{let e;e=await fetch(i,"navigate"===i.mode?void 0:this.g.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:a,request:n,response:e});return e}catch(e){throw t&&await this.runCallbacks("fetchDidFail",{error:e,event:a,originalRequest:t.clone(),request:n.clone()}),e}}async fetchAndCachePut(e){const s=await this.fetch(e),a=s.clone();return this.waitUntil(this.cachePut(e,a)),s}async cacheMatch(e){const s=p(e);let a;const{cacheName:i,matchOptions:t}=this.g,n=await this.getCacheKey(s,"read"),o=Object.assign(Object.assign({},t),{cacheName:i});a=await caches.match(n,o);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))a=await e({cacheName:i,matchOptions:t,cachedResponse:a,request:n,event:this.event})||void 0;return a}async cachePut(e,a){const i=p(e);var t;await(t=0,new Promise((e=>setTimeout(e,t))));const n=await this.getCacheKey(i,"write");if(!a)throw new s("cache-put-with-no-response",{url:(o=n.url,new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var o;const r=await this.v(a);if(!r)return!1;const{cacheName:c,matchOptions:d}=this.g,f=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),g=l?await async function(e,s,a,i){const t=h(s.url,a);if(s.url===t)return e.match(s,i);const n=Object.assign(Object.assign({},i),{ignoreSearch:!0}),o=await e.keys(s,n);for(const s of o)if(t===h(s.url,a))return e.match(s,i)}(f,n.clone(),["__WB_REVISION__"],d):null;try{await f.put(n,l?r.clone():r)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of m)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:g,newResponse:r.clone(),request:n,event:this.event});return!0}async getCacheKey(e,s){const a=`${e.url} | ${s}`;if(!this.l[a]){let i=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))i=p(await e({mode:s,request:i,event:this.event,params:this.params}));this.l[a]=i}return this.l[a]}hasCallback(e){for(const s of this.g.plugins)if(e in s)return!0;return!1}async runCallbacks(e,s){for(const a of this.iterateCallbacks(e))await a(s)}*iterateCallbacks(e){for(const s of this.g.plugins)if("function"==typeof s[e]){const a=this.p.get(s),i=i=>{const t=Object.assign(Object.assign({},i),{state:a});return s[e](t)};yield i}}waitUntil(e){return this.h.push(e),e}async doneWaiting(){let e;for(;e=this.h.shift();)await e}destroy(){this.u.resolve(null)}async v(e){let s=e,a=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(s=await e({request:this.request,response:s,event:this.event})||void 0,a=!0,!s)break;return a||s&&200!==s.status&&(s=void 0),s}}class x{constructor(e={}){this.cacheName=b(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[s]=this.handleAll(e);return s}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const s=e.event,a="string"==typeof e.request?new Request(e.request):e.request,i="params"in e?e.params:void 0,t=new v(this,{event:s,request:a,params:i}),n=this.S(t,a,s);return[n,this.q(n,t,a,s)]}async S(e,a,i){let t;await e.runCallbacks("handlerWillStart",{event:i,request:a});try{if(t=await this.L(a,e),!t||"error"===t.type)throw new s("no-response",{url:a.url})}catch(s){if(s instanceof Error)for(const n of e.iterateCallbacks("handlerDidError"))if(t=await n({error:s,event:i,request:a}),t)break;if(!t)throw s}for(const s of e.iterateCallbacks("handlerWillRespond"))t=await s({event:i,request:a,response:t});return t}async q(e,s,a,i){let t,n;try{t=await e}catch(n){}try{await s.runCallbacks("handlerDidRespond",{event:i,request:a,response:t}),await s.doneWaiting()}catch(e){e instanceof Error&&(n=e)}if(await s.runCallbacks("handlerDidComplete",{event:i,request:a,response:t,error:n}),s.destroy(),n)throw n}}function y(e,s){const a=s();return e.waitUntil(a),a}try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}function S(e){if(!e)throw new s("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const s=new URL(e,location.href);return{cacheKey:s.href,url:s.href}}const{revision:a,url:i}=e;if(!i)throw new s("add-to-cache-list-unexpected-type",{entry:e});if(!a){const e=new URL(i,location.href);return{cacheKey:e.href,url:e.href}}const t=new URL(i,location.href),n=new URL(i,location.href);return t.searchParams.set("__WB_REVISION__",a),{cacheKey:t.href,url:n.href}}class q{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:s})=>{s&&(s.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:s,cachedResponse:a})=>{if("install"===e.type&&s&&s.originalRequest&&s.originalRequest instanceof Request){const e=s.originalRequest.url;a?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return a}}}class L{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:s})=>{const a=(null==s?void 0:s.cacheKey)||this.R.getCacheKeyForURL(e.url);return a?new Request(a,{headers:e.headers}):e},this.R=e}}let R,z;async function U(e,a){let i=null;if(e.url){i=new URL(e.url).origin}if(i!==self.location.origin)throw new s("cross-origin-copy-response",{origin:i});const t=e.clone(),n={headers:new Headers(t.headers),status:t.status,statusText:t.statusText},o=a?a(n):n,r=function(){if(void 0===R){const e=new Response("");if("body"in e)try{new Response(e.body),R=!0}catch(e){R=!1}R=!1}return R}()?t.body:await t.blob();return new Response(r,o)}class E extends x{constructor(e={}){e.cacheName=u(e.cacheName),super(e),this._=!1!==e.fallbackToNetwork,this.plugins.push(E.copyRedirectedCacheableResponsesPlugin)}async L(e,s){const a=await s.cacheMatch(e);return a||(s.event&&"install"===s.event.type?await this.U(e,s):await this.j(e,s))}async j(e,a){let i;const t=a.params||{};if(!this._)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const s=t.integrity,n=e.integrity,o=!n||n===s;i=await a.fetch(new Request(e,{integrity:"no-cors"!==e.mode?n||s:void 0})),s&&o&&"no-cors"!==e.mode&&(this.T(),await a.cachePut(e,i.clone()))}return i}async U(e,a){this.T();const i=await a.fetch(e);if(!await a.cachePut(e,i.clone()))throw new s("bad-precaching-response",{url:e.url,status:i.status});return i}T(){let e=null,s=0;for(const[a,i]of this.plugins.entries())i!==E.copyRedirectedCacheableResponsesPlugin&&(i===E.defaultPrecacheCacheabilityPlugin&&(e=a),i.cacheWillUpdate&&s++);0===s?this.plugins.push(E.defaultPrecacheCacheabilityPlugin):s>1&&null!==e&&this.plugins.splice(e,1)}}E.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},E.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await U(e):e};class j{constructor({cacheName:e,plugins:s=[],fallbackToNetwork:a=!0}={}){this.O=new Map,this.W=new Map,this.k=new Map,this.g=new E({cacheName:u(e),plugins:[...s,new L({precacheController:this})],fallbackToNetwork:a}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.g}precache(e){this.addToCacheList(e),this.C||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.C=!0)}addToCacheList(e){const a=[];for(const i of e){"string"==typeof i?a.push(i):i&&void 0===i.revision&&a.push(i.url);const{cacheKey:e,url:t}=S(i),n="string"!=typeof i&&i.revision?"reload":"default";if(this.O.has(t)&&this.O.get(t)!==e)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.O.get(t),secondEntry:e});if("string"!=typeof i&&i.integrity){if(this.k.has(e)&&this.k.get(e)!==i.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:t});this.k.set(e,i.integrity)}if(this.O.set(t,e),this.W.set(t,n),a.length>0){const e=`Workbox is precaching URLs without revision info: ${a.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return y(e,(async()=>{const s=new q;this.strategy.plugins.push(s);for(const[s,a]of this.O){const i=this.k.get(a),t=this.W.get(s),n=new Request(s,{integrity:i,cache:t,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:a},request:n,event:e}))}const{updatedURLs:a,notUpdatedURLs:i}=s;return{updatedURLs:a,notUpdatedURLs:i}}))}activate(e){return y(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),s=await e.keys(),a=new Set(this.O.values()),i=[];for(const t of s)a.has(t.url)||(await e.delete(t),i.push(t.url));return{deletedURLs:i}}))}getURLsToCacheKeys(){return this.O}getCachedURLs(){return[...this.O.keys()]}getCacheKeyForURL(e){const s=new URL(e,location.href);return this.O.get(s.href)}getIntegrityForCacheKey(e){return this.k.get(e)}async matchPrecache(e){const s=e instanceof Request?e.url:e,a=this.getCacheKeyForURL(s);if(a){return(await self.caches.open(this.strategy.cacheName)).match(a)}}createHandlerBoundToURL(e){const a=this.getCacheKeyForURL(e);if(!a)throw new s("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:a},s.params),this.strategy.handle(s))}}const T=()=>(z||(z=new j),z);class O extends i{constructor(e,s){super((({request:a})=>{const i=e.getURLsToCacheKeys();for(const t of function*(e,{ignoreURLParametersMatching:s=[/^utm_/,/^fbclid$/],directoryIndex:a="index.html",cleanURLs:i=!0,urlManipulation:t}={}){const n=new URL(e,location.href);n.hash="",yield n.href;const o=function(e,s=[]){for(const a of[...e.searchParams.keys()])s.some((e=>e.test(a)))&&e.searchParams.delete(a);return e}(n,s);if(yield o.href,a&&o.pathname.endsWith("/")){const e=new URL(o.href);e.pathname+=a,yield e.href}if(i){const e=new URL(o.href);e.pathname+=".html",yield e.href}if(t){const e=t({url:n});for(const s of e)yield s.href}}(a.url,s)){const s=i.get(t);if(s){return{cacheKey:s,integrity:e.getIntegrityForCacheKey(s)}}}}),e.strategy)}}var W;g({prefix:"EleventyPluginWorkbox"}),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),W={directoryIndex:"index.html"},function(e){T().precache(e)}([{url:"/404.html",revision:"b41fcdeb3019d36659b4c34644330a83"},{url:"/fa-icons.svg",revision:"ac38393753c92f74e38467214bce9de5"},{url:"/index.html",revision:"636f8950bd16483c805b9dd134c2f903"},{url:"/aquarium-sur-mesure/index.html",revision:"5efaa35a6e68fea4cc7e648044562663"},{url:"/assets/css/index.css",revision:"bf13682504f8232f94eccdb2460b09c8"},{url:"/assets/fonts/le-fish.ttf",revision:"b39c4d2b4ca59ab77d911f049f6023af"},{url:"/assets/fonts/poissons.ttf",revision:"ecd46e79fc4fea92fe0756104ec96397"},{url:"/assets/images/9PAesnRWb9-300.jpeg",revision:"94fd8c29a7791affd1a60e60fe313ade"},{url:"/assets/images/9PAesnRWb9-300.webp",revision:"7651e19bc6c4e09e16d656569a3a1ab2"},{url:"/assets/images/9PAesnRWb9-600.jpeg",revision:"d5ef64a6765db2f8f317a4832c368222"},{url:"/assets/images/9PAesnRWb9-600.webp",revision:"ccec7d42f45b8fbd89bb14b62c011365"},{url:"/assets/images/icons/android/android-launchericon-144-144.png",revision:"0cc27bce604e68a670b877dd147fb247"},{url:"/assets/images/icons/android/android-launchericon-192-192.png",revision:"4d40239b918c14de0b81bcdb0f0299a1"},{url:"/assets/images/icons/android/android-launchericon-48-48.png",revision:"881fc9527ff2eddb32633daa29ea2808"},{url:"/assets/images/icons/android/android-launchericon-512-512.png",revision:"dedf3a9e1ab1d88140dc67f6ea51eda5"},{url:"/assets/images/icons/android/android-launchericon-72-72.png",revision:"4f293dbbe8b2a3b85af7979daff69820"},{url:"/assets/images/icons/android/android-launchericon-96-96.png",revision:"4a634a64b0d780afad705e2d269a2179"},{url:"/assets/images/icons/icons.json",revision:"3877111e7542901178e58b30f8e9f53c"},{url:"/assets/images/icons/ios/100.png",revision:"68cdd7cf39ed5232ada76d86edca5d46"},{url:"/assets/images/icons/ios/1024.png",revision:"f15922a82c039a2e96d7d5bc3807fd85"},{url:"/assets/images/icons/ios/114.png",revision:"a135e0e835e44ec7c8928d52a3170d99"},{url:"/assets/images/icons/ios/120.png",revision:"900b7feff8edf88d5a4314a3940ab8c4"},{url:"/assets/images/icons/ios/128.png",revision:"7aaba549bf631eb9b16bc72a0692e955"},{url:"/assets/images/icons/ios/144.png",revision:"0cc27bce604e68a670b877dd147fb247"},{url:"/assets/images/icons/ios/152.png",revision:"199a2590348932f42fa4230d510a5631"},{url:"/assets/images/icons/ios/16.png",revision:"b78b224fd632199ce2dab81966ef790b"},{url:"/assets/images/icons/ios/167.png",revision:"dae39b62aeb11c4f822c302a2f15b772"},{url:"/assets/images/icons/ios/180.png",revision:"56f9bc139ab48f9c3830807dcdd7c3a3"},{url:"/assets/images/icons/ios/192.png",revision:"4d40239b918c14de0b81bcdb0f0299a1"},{url:"/assets/images/icons/ios/20.png",revision:"103a096c31073a209d049bb6ba330a3f"},{url:"/assets/images/icons/ios/256.png",revision:"0871b686bb5f373b21419418135ea293"},{url:"/assets/images/icons/ios/29.png",revision:"c92753c450017ccc06b7c4b8f4f3fc39"},{url:"/assets/images/icons/ios/32.png",revision:"6f8fab0d21c668cb8350660932e43e00"},{url:"/assets/images/icons/ios/40.png",revision:"eff8feb612bfeb1ed14daeff5131591d"},{url:"/assets/images/icons/ios/50.png",revision:"c4272ed01e2b7efa90ba12b3a6b52179"},{url:"/assets/images/icons/ios/512.png",revision:"dedf3a9e1ab1d88140dc67f6ea51eda5"},{url:"/assets/images/icons/ios/57.png",revision:"e84c82b24791ea19c6b2539abf694858"},{url:"/assets/images/icons/ios/58.png",revision:"98f4eba3066988cf58486fe0e15c53bf"},{url:"/assets/images/icons/ios/60.png",revision:"292dcd038e41cde731c4759013bef8dc"},{url:"/assets/images/icons/ios/64.png",revision:"8e1a3244b9db3da032dff3cd3d20c051"},{url:"/assets/images/icons/ios/72.png",revision:"4f293dbbe8b2a3b85af7979daff69820"},{url:"/assets/images/icons/ios/76.png",revision:"6f6aace181619b96bc566cf5fe4d8b36"},{url:"/assets/images/icons/ios/80.png",revision:"3fcfad32c04cdf9b45955ebb8b9fa2f2"},{url:"/assets/images/icons/ios/87.png",revision:"958cd213248af0da93a38a4608363677"},{url:"/assets/images/icons/windows11/LargeTile.scale-100.png",revision:"a994c677126b35a1a9848cab8bea271f"},{url:"/assets/images/icons/windows11/LargeTile.scale-125.png",revision:"b42269aeff0a58482d7f038982ed2a08"},{url:"/assets/images/icons/windows11/LargeTile.scale-150.png",revision:"4407fd49f52716ee4e1139217f745996"},{url:"/assets/images/icons/windows11/LargeTile.scale-200.png",revision:"a23247c1562c9b2606c7411f3c85c711"},{url:"/assets/images/icons/windows11/LargeTile.scale-400.png",revision:"c23042e86e7ca3f8d72e577001dd93a5"},{url:"/assets/images/icons/windows11/SmallTile.scale-100.png",revision:"ec64e26b1c2ee3f88dcf18d7c1595a5f"},{url:"/assets/images/icons/windows11/SmallTile.scale-125.png",revision:"e73fb1d83c97f5252c751a6b98f758ec"},{url:"/assets/images/icons/windows11/SmallTile.scale-150.png",revision:"98046ddce7a82af57f3f1c3b7d744365"},{url:"/assets/images/icons/windows11/SmallTile.scale-200.png",revision:"55f7c88b6b0f1934d7e280e586190c53"},{url:"/assets/images/icons/windows11/SmallTile.scale-400.png",revision:"fc91ba0291be86e70bef375d1928b11c"},{url:"/assets/images/icons/windows11/SplashScreen.scale-100.png",revision:"bb6e2c2995edf096fd4a55926656a4bf"},{url:"/assets/images/icons/windows11/SplashScreen.scale-125.png",revision:"8d4f2048447fdfcdcafdde1448fbfb5c"},{url:"/assets/images/icons/windows11/SplashScreen.scale-150.png",revision:"83f83be05d7599169d57c0db50340e48"},{url:"/assets/images/icons/windows11/SplashScreen.scale-200.png",revision:"a9491375b4eeeead939c0b8531eedb94"},{url:"/assets/images/icons/windows11/SplashScreen.scale-400.png",revision:"ac71a37787365fcf5e2a4785bcdc7116"},{url:"/assets/images/icons/windows11/Square150x150Logo.scale-100.png",revision:"f34b9f24a41183bce83adea4359f6177"},{url:"/assets/images/icons/windows11/Square150x150Logo.scale-125.png",revision:"78f71520486deaab7c0728d75095f654"},{url:"/assets/images/icons/windows11/Square150x150Logo.scale-150.png",revision:"f43584560bcb809857ff0809db749073"},{url:"/assets/images/icons/windows11/Square150x150Logo.scale-200.png",revision:"7d674698c9061efd3f884ed238beb2c3"},{url:"/assets/images/icons/windows11/Square150x150Logo.scale-400.png",revision:"9dda997cdeee5fec8c527987ff4c7481"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"4c70c2232d9a4966c30b0167e9463c52"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"38e645efa4fcd84e8b1b81c0ceb20c2b"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"764a27f8211f1236a201b2a726218893"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"19b21350997a468055c98d1efc627de2"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"8c4502d0f74e86d225af1f520626d560"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"09402b97ffd1cbaac1aee9da686790a1"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"532ba625ec70242f69c84c3cf38af037"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"b60f77608b1598adc970868ba0a3dd43"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"43c8a86d84cda59ac8c3a75bdf2ce0af"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"cebdc4d6daacb3f6433984f7568375c9"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"8a3a17e9c3fffbfc35489432f13d6c59"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"5ce44a3cee30d46730c2ac01e9eddee5"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"06217e986fbb8354fa8384b222850318"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"d465605441ef92baf1104c3d01ff4e9f"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"c8a624978d822c943d1957370b9f33d2"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"4c70c2232d9a4966c30b0167e9463c52"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"38e645efa4fcd84e8b1b81c0ceb20c2b"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"764a27f8211f1236a201b2a726218893"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"19b21350997a468055c98d1efc627de2"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"8c4502d0f74e86d225af1f520626d560"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"09402b97ffd1cbaac1aee9da686790a1"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"532ba625ec70242f69c84c3cf38af037"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"b60f77608b1598adc970868ba0a3dd43"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"43c8a86d84cda59ac8c3a75bdf2ce0af"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"cebdc4d6daacb3f6433984f7568375c9"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"8a3a17e9c3fffbfc35489432f13d6c59"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"5ce44a3cee30d46730c2ac01e9eddee5"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"06217e986fbb8354fa8384b222850318"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"d465605441ef92baf1104c3d01ff4e9f"},{url:"/assets/images/icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"c8a624978d822c943d1957370b9f33d2"},{url:"/assets/images/icons/windows11/Square44x44Logo.scale-100.png",revision:"43c8a86d84cda59ac8c3a75bdf2ce0af"},{url:"/assets/images/icons/windows11/Square44x44Logo.scale-125.png",revision:"5d4fb9b1d18832c1305b531f9639036f"},{url:"/assets/images/icons/windows11/Square44x44Logo.scale-150.png",revision:"b583a3a1c84763321c516cd7a80c6621"},{url:"/assets/images/icons/windows11/Square44x44Logo.scale-200.png",revision:"64b16b68df5dd1c822becfcb5b2472a2"},{url:"/assets/images/icons/windows11/Square44x44Logo.scale-400.png",revision:"9fc4b866b11d3f025194cb1137462163"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-16.png",revision:"4c70c2232d9a4966c30b0167e9463c52"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-20.png",revision:"38e645efa4fcd84e8b1b81c0ceb20c2b"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-24.png",revision:"764a27f8211f1236a201b2a726218893"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-256.png",revision:"19b21350997a468055c98d1efc627de2"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-30.png",revision:"8c4502d0f74e86d225af1f520626d560"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-32.png",revision:"09402b97ffd1cbaac1aee9da686790a1"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-36.png",revision:"532ba625ec70242f69c84c3cf38af037"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-40.png",revision:"b60f77608b1598adc970868ba0a3dd43"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-44.png",revision:"43c8a86d84cda59ac8c3a75bdf2ce0af"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-48.png",revision:"cebdc4d6daacb3f6433984f7568375c9"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-60.png",revision:"8a3a17e9c3fffbfc35489432f13d6c59"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-64.png",revision:"5ce44a3cee30d46730c2ac01e9eddee5"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-72.png",revision:"06217e986fbb8354fa8384b222850318"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-80.png",revision:"d465605441ef92baf1104c3d01ff4e9f"},{url:"/assets/images/icons/windows11/Square44x44Logo.targetsize-96.png",revision:"c8a624978d822c943d1957370b9f33d2"},{url:"/assets/images/icons/windows11/StoreLogo.scale-100.png",revision:"c4272ed01e2b7efa90ba12b3a6b52179"},{url:"/assets/images/icons/windows11/StoreLogo.scale-125.png",revision:"12359364498021cc1412acca1bd2549c"},{url:"/assets/images/icons/windows11/StoreLogo.scale-150.png",revision:"54403dd5fef0ca423fe8da47e6988ae8"},{url:"/assets/images/icons/windows11/StoreLogo.scale-200.png",revision:"68cdd7cf39ed5232ada76d86edca5d46"},{url:"/assets/images/icons/windows11/StoreLogo.scale-400.png",revision:"86fa2c27191a9285fc0abd15722f67f6"},{url:"/assets/images/icons/windows11/Wide310x150Logo.scale-100.png",revision:"067ddc5974cd1b35d5fd23e2da05d935"},{url:"/assets/images/icons/windows11/Wide310x150Logo.scale-125.png",revision:"ca07e4c0c139b64ce5493bdb2b5735fe"},{url:"/assets/images/icons/windows11/Wide310x150Logo.scale-150.png",revision:"5098a5a5dc181a877a7a8d46e51853cd"},{url:"/assets/images/icons/windows11/Wide310x150Logo.scale-200.png",revision:"bb6e2c2995edf096fd4a55926656a4bf"},{url:"/assets/images/icons/windows11/Wide310x150Logo.scale-400.png",revision:"a9491375b4eeeead939c0b8531eedb94"},{url:"/assets/images/kKSpjdvkY6-300.jpeg",revision:"e8a832458f53965703bf1afecfc97734"},{url:"/assets/images/kKSpjdvkY6-300.webp",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/assets/images/kKSpjdvkY6-600.jpeg",revision:"92693d2892338dfadb1c781e4fcae890"},{url:"/assets/images/kKSpjdvkY6-600.webp",revision:"ceb38a07fe6d0bf29b31524a611c6fcf"},{url:"/assets/images/maximum-marine-blue.svg",revision:"2a1d498af950c0740b41be3d0827e6da"},{url:"/assets/images/maximum-marine-logo-white.png",revision:"4235853c822ff1a1dc6f9c66f241e46b"},{url:"/assets/images/maximum-marine-square-blue-512.png",revision:"a9f9b16badc80fe7b5ea30e54eb063bd"},{url:"/assets/images/maximum-marine-square-blue.png",revision:"ed03955df2332a4d0e40b85b4037889a"},{url:"/assets/images/maximum-marine-white.svg",revision:"42319c83d522b5ab5ba2c0f7156dedbf"},{url:"/assets/images/round.png",revision:"321d151fa86e45ce5a345c4e14c34b09"},{url:"/assets/images/SVG/bg-falls-left.svg",revision:"3c957ac93047197f74975b56c5827b7e"},{url:"/assets/images/SVG/bg-falls-right.svg",revision:"d6d719c1d01ef53440851f33b0673802"},{url:"/assets/images/SVG/bg-large_1.svg",revision:"e6e39f5a7299f41c284c0a85b219e1e7"},{url:"/assets/images/SVG/bg-large-falls.svg",revision:"f817ab318b88efe060e175e498fa7bba"},{url:"/assets/images/SVG/bg-large-falls+left.svg",revision:"9d3b1d8fc4d5800b34a3128658531390"},{url:"/assets/images/SVG/bg-large-left.svg",revision:"e337f4e35b50ce8341061daf3bd9fa65"},{url:"/assets/images/SVG/bg-large-right.svg",revision:"f153ecb771cd3e78eeba7cc4ff8987ee"},{url:"/assets/images/SVG/bg-large.svg",revision:"0f042aec2650df59c9ed71c019eb1d0e"},{url:"/assets/images/SVG/bg-medium-left.svg",revision:"4568651bfd9fec4cea486ae0f4eab52b"},{url:"/assets/images/SVG/bg-medium-right.svg",revision:"de5ecb8f098c8ffb27f107d15fd57b62"},{url:"/assets/images/SVG/bg-medium.svg",revision:"2b59d8b86e590a4331c85f5100e482b0"},{url:"/assets/images/SVG/bg-small-left.svg",revision:"2d4f33079f1980543bf8f3a546fe48b2"},{url:"/assets/images/SVG/bg-small-right.svg",revision:"fa3c00f1f9a91bc59d8d42c612a9bcba"},{url:"/assets/images/SVG/bg-small.svg",revision:"39f338cdca64ffe546cf0060457203ac"},{url:"/assets/images/SVG/deep-water-background.svg",revision:"b2a3150d4d44ff65b349c5a8a0351641"},{url:"/assets/images/SVG/text-animate.svg",revision:"792fbbf23de01f80450da64ad40fcb30"},{url:"/assets/images/x8UEi_saO2-300.jpeg",revision:"4488303b40df92a33e7c42d07c53614c"},{url:"/assets/images/x8UEi_saO2-300.webp",revision:"a54e9e91aa776c7a5f6123706a4d8279"},{url:"/assets/images/x8UEi_saO2-600.jpeg",revision:"391507558779fd27505bd9a09135c1f3"},{url:"/assets/images/x8UEi_saO2-600.webp",revision:"0a444c37466c60aebc84d6e9222463e3"},{url:"/assets/javascripts/main.js",revision:"cf6fd0b164b6c1814326812ed1896d2a"},{url:"/contact/index.html",revision:"b6a444ab6c7efe90d12b891a310975fd"},{url:"/devis-aquarium/index.html",revision:"aa0180749bacfb84b0ab60ca338b9884"},{url:"/entretien/index.html",revision:"d5a301fa2f32c61804256cc9247ead6c"},{url:"/magasin/corals/fluffy/index.html",revision:"b96ce90e0b6c15a6bae48f3adaab7d1e"},{url:"/magasin/corals/lord-featherbottom/index.html",revision:"e142c315e7fd205dc35943b87d265d5b"},{url:"/magasin/corals/pennywise/index.html",revision:"1b35723cc1fa2a65619826d2f03d66b2"},{url:"/magasin/corals/snugglepants/index.html",revision:"a4f89e2619ffaaab79911ae03d0ebb05"},{url:"/magasin/coraux/index.html",revision:"22b8cf9f164e73edf2e1f68086e3c769"},{url:"/magasin/index.html",revision:"91eae2cef3018c2a85def0e2701a5fd7"}]),function(e){const s=T();c(new O(s,e))}(W),self.addEventListener("activate",(e=>{const s=u();e.waitUntil((async(e,s="-precache-")=>{const a=(await self.caches.keys()).filter((a=>a.includes(s)&&a.includes(self.registration.scope)&&a!==e));return await Promise.all(a.map((e=>self.caches.delete(e)))),a})(s).then((e=>{})))})),c((({url:e})=>!new RegExp(`.+\\.(?:${["jpg","png","gif","ico","svg","jpeg","avif","webp","eot","ttf","otf","ttc","woff","woff2"].join("|")})`).test(e)),new class extends x{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(d),this.P=e.networkTimeoutSeconds||0}async L(e,a){const i=[],t=[];let n;if(this.P){const{id:s,promise:o}=this.G({request:e,logs:i,handler:a});n=s,t.push(o)}const o=this.N({timeoutId:n,request:e,logs:i,handler:a});t.push(o);const r=await a.waitUntil((async()=>await a.waitUntil(Promise.race(t))||await o)());if(!r)throw new s("no-response",{url:e.url});return r}G({request:e,logs:s,handler:a}){let i;return{promise:new Promise((s=>{i=setTimeout((async()=>{s(await a.cacheMatch(e))}),1e3*this.P)})),id:i}}async N({timeoutId:e,request:s,logs:a,handler:i}){let t,n;try{n=await i.fetchAndCachePut(s)}catch(e){e instanceof Error&&(t=e)}return e&&clearTimeout(e),!t&&n||(n=await i.cacheMatch(s)),n}},"GET"),c(/.+\.(?:eot|ttf|otf|ttc|woff|woff2|jpg|png|gif|ico|svg|jpeg|avif|webp)$/,new class extends x{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(d)}async L(e,a){const i=a.fetchAndCachePut(e).catch((()=>{}));a.waitUntil(i);let t,n=await a.cacheMatch(e);if(n);else try{n=await i}catch(e){e instanceof Error&&(t=e)}if(!n)throw new s("no-response",{url:e.url,error:t});return n}},"GET");
//# sourceMappingURL=service-worker.js.map
