/*! For license information please see 9234.b2147ed6cb931ae00085.js.LICENSE.txt */

!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6fd90f21-0a54-5c42-a0be-d493bc7bf12d")}catch(e){}}();
  mutation rteStartSession($noteID: String!, $listenerKey: String!, $forceSendInitialDocumentUpdate: Boolean!) {
    rteStartSession(noteID: $noteID, listenerKey: $listenerKey, forceSendInitialDocumentUpdate: $forceSendInitialDocumentUpdate) {
      success
    }
  }
`,c=o.default`
  mutation rteStopSession($noteID: String!, $listenerKey: String!) {
    rteStopSession(noteID: $noteID, listenerKey: $listenerKey) {
      success
    }
  }
`;async function l(e,t,r){a.logger.debug(`[RTE_SESS].[rteExecuteStopSessionMutation] noteID: ${e}, for ${t}`);const n=await r.getData(c,{noteID:e,listenerKey:t});return(0,i.drillDownIntoResponse)(n.data)}class d{constructor(){this.conduitInitializedPromiseHandle=(0,a.allocPromise)(),this.rteDocumentUpdateListeners=new Map,this.sessionCounter=0,this.spiderSenseEvents=a.emptySpiderSenseEvents}get conduit(){if((0,a.isNullish)(this.maybeConduit))throw new a.InternalError("Conduit instance is not set or initialized");return this.maybeConduit}init(e,t){if((0,a.isNotNullish)(this.maybeConduit))throw new Error("Conduit-View already has a defined conduit");this.maybeConduit=e,t.then((()=>{this.conduitInitializedPromiseHandle.resolve()})).catch((e=>{this.conduitInitializedPromiseHandle.reject(e)}))}setSpiderSense(e){e.updateUserInfo({conduit_version:a.CONDUIT_VERSION}),this.spiderSenseEvents=(0,a.getSpiderSenseEvents)(e)}deinit(){this.maybeConduit=void 0,this.conduitInitializedPromiseHandle=(0,a.allocPromise)()}rteStartSession(e){const{id:t,listenerKey:r,onDocumentUpdate:n,onInitialDocument:o,onStateChange:s,onAwarenessChange:c,onSyncStep1:d,onSessionStarted:p,onSessionStopped:h,forceSendInitialDocumentUpdate:f}=e;this.rteDocumentUpdateListeners.has(t)||this.rteDocumentUpdateListeners.set(t,new Map);const y=this.rteDocumentUpdateListeners.get(t),m=`${this.sessionCounter++}+${r}`;y.set(m,{onDocumentUpdate:n,onAwarenessChange:c,onStateChange:s,onSyncStep1:d,onInitialDocument:o});let E=!1;return(async()=>{await this.conduitInitializedPromiseHandle.promise,await async function(e,t,r,n){a.logger.debug(`[RTE_SESS].[rteExecuteStartSessionMutation] noteID: ${e}, for ${t}`);const o=await n.getData(u,{noteID:e,listenerKey:t,forceSendInitialDocumentUpdate:r});return(0,i.drillDownIntoResponse)(o.data)}(t,m,null!=f&&f,this.conduit),null==p||p(t,r)})().then((()=>{E&&l(t,m,this.conduit).then((()=>{a.logger.info(`[RTE_SESS].[rteStopSession] delayed stop processed: ${t}, ${r}, ${m}`)})).catch((e=>{a.logger.error(`[RTE_SESS].[rteStopSession] delayed stop error: ${t}, ${r}, ${m}`,e)}))})).catch((e=>{this.spiderSenseEvents.rte.connector.failed({action:"rteStartSession",noteID:t,origin:"unknown",error:e}),a.logger.error(`[RTE_SESS].[rteStartSession.startSessionInternal] error: ${t}, ${r}`,e),s({id:t,data:{sessionStatus:i.RteSessionStatus.Broken,connectionStatus:i.RteConnectionStatus.Disconnected,error:e,closeState:null}})})),()=>{E=!0,l(t,m,this.conduit).then((()=>{(0,a.isNullish)(h)||h(t,m)})).catch((e=>{a.logger.error(`[RTE_SESS].[rteStopSession] error: ${t}, ${r}`,e)})),y.delete(m),0===y.size&&this.rteDocumentUpdateListeners.delete(t)}}static getRteWebServerInfo(){return d.webServerInfo}async rteWebServerInfoFromConduit(e){d.webServerInfo=e}async rteUpdateFromConduit(e){const{id:t,update:r,origin:n}=e,i=this.rteDocumentUpdateListeners.get(t);if((0,a.isNotNullish)(i))for(const e of i.values())try{e.onDocumentUpdate(r,n)}catch(e){this.spiderSenseEvents.rte.connector.failed({action:"rteUpdateFromConduit",noteID:t,origin:null!=n?n:"unknown",error:e}),a.logger.error(`[rteUpdateFromConduit] error in callback: ${t}`,e)}}async rteInitialDocumentFromConduit(e){const{id:t,update:r,origin:n,listenerKey:i}=e,o=this.rteDocumentUpdateListeners.get(t);if((0,a.isNotNullish)(o)){const e=o.get(i);if((0,a.isNotNullish)(e))try{e.onInitialDocument(r,n)}catch(e){this.spiderSenseEvents.rte.connector.failed({action:"rteInitialDocumentFromConduit",noteID:t,origin:null!=n?n:"unknown",error:e}),a.logger.error(`[rteInitialDocumentFromConduit] error in callback: ${t}`,e)}}}async rteAwarenessFromConduit(e){const{id:t,update:r,origin:n}=e,i=this.rteDocumentUpdateListeners.get(t);if((0,a.isNotNullish)(i))for(const e of i.values())try{e.onAwarenessChange(r,n)}catch(e){this.spiderSenseEvents.rte.connector.failed({action:"rteAwarenessFromConduit",noteID:t,origin:null!=n?n:"unknown",error:e}),a.logger.error(`[rteAwarenessFromConduit] error in callback: ${t}`,e)}}async rteStateChangeFromConduit(e){const{id:t}=e,r=this.rteDocumentUpdateListeners.get(t);if((0,a.isNotNullish)(r)){!e.data.error||e.data.error instanceof Error||(e.data.error=(0,a.deserializeError)(e.data.error));for(const n of r.values())try{n.onStateChange(e)}catch(e){this.spiderSenseEvents.rte.connector.failed({action:"rteStateChangeFromConduit",noteID:t,origin:"unknown",error:e}),a.logger.error(`[rteStateChangeFromConduit] error in callback: ${t}`,e)}}}async rteSyncStep1FromConduitPerCallback(e,t,r,n){try{const a=await e.onSyncStep1(r,n);await this.rteSyncStep2FromClient({id:t,update:a,origin:n})}catch(e){this.spiderSenseEvents.rte.connector.failed({action:"rteSyncStep1FromConduit",noteID:t,origin:null!=n?n:"unknown",error:e}),a.logger.error(`[rteSyncStep1FromConduit] error in callback: ${t}`,e)}}async rteSyncStep1FromConduit(e){var t,r;const{id:n,origin:i,update:o}=e,s=[];for(const e of null!==(r=null===(t=this.rteDocumentUpdateListeners.get(n))||void 0===t?void 0:t.values())&&void 0!==r?r:[])s.push(this.rteSyncStep1FromConduitPerCallback(e,n,o,i));if(0===s.length)return a.logger.warn(`[rteSyncStep1FromConduit] no callback called: ${n}`),void this.spiderSenseEvents.rte.connector.step1FromConduitWithoutListeners({noteID:n,origin:null!=i?i:"unknown"});await(0,a.allSettled)(s)}async rteUpdateFromClient(e){return await this.conduitInitializedPromiseHandle.promise,this.conduit.rteUpdateFromClient(e)}async rteAwarenessFromClient(e){return await this.conduitInitializedPromiseHandle.promise,this.conduit.rteAwarenessFromClient(e)}async rteSyncStep1FromClient(e){var t;await this.conduitInitializedPromiseHandle.promise;const r=await this.conduit.rteSyncStep1FromClient(e),n=this.rteDocumentUpdateListeners.get(r.id);if((0,a.isNotNullish)(n))for(const i of n.values())try{i.onDocumentUpdate(r.update,"conduit")}catch(n){this.spiderSenseEvents.rte.connector.failed({action:"rteSyncStep1FromClient",noteID:e.id,origin:null!==(t=e.origin)&&void 0!==t?t:"unknown",error:n}),a.logger.error(`[rteSyncStep1FromClient] error in callback: ${r.id}`,n)}return a.logger.info(`[rteConnector.rteSyncStep1FromClient] Sync step 1 completed for note ${e.id}`),r}async rteSyncStep2FromClient(e){await this.conduitInitializedPromiseHandle.promise;const t=this.conduit.rteSyncStep2FromClient(e);return a.logger.info(`[rteConnector.rteSyncStep2FromClient] Sync step 2 completed for note ${e.id}`),t}async getCalendarEvents(e,t){return this.rteHeadlessEditing(e,t,(async e=>e.queryCommandValue("calendarevents")))}async insertCalendarEvent(e,t,r){return this.rteHeadlessEditing(e,t,(async e=>{await e.execCommand("insertcalendarevent",{event:r,atTop:!0})}))}async getNoteContentForExport(e,t,r,n){return this.rteHeadlessEditing(e,t,(async e=>{const t=(await e.queryCommandValue("resources")).map((e=>Object.assign(Object.assign({},e),{url:(0,a.isNonEmptyString)(e.hash)?n[e.hash]:e.url,action:"update"})));await e.execCommand("resources",t);return(await e.queryCommandValue("content",{type:r,skipUndoCheck:!0})).value}),!0)}async rteHeadlessEditing(e,t,r,n=!1){const i=`headless-${(0,a.uuid)()}`;let o;return new Promise(((s,u)=>{a.logger.info("[rteConnector.rteHeadlessEditing] Opening headless editor with rte enabled.");const c=e();let l=!1;o=this.rteStartSession({id:t,listenerKey:i,onDocumentUpdate:a.emptyFunc,onInitialDocument:async e=>{try{if(l)return;l=!0,a.logger.info("[rteConnector.rteHeadlessEditing] Sending doc update to headless editor."),await c.applyYDocUpdate(e);const i=await r(c);a.logger.info("[rteConnector.rteHeadlessEditing] Applying updates to Conduit YDoc."),n||await this.rteUpdateFromClient({update:await c.getYDocUpdate(),id:t,forceSendResponse:!0}),o(),s(i)}catch(e){o(),u(e)}},onStateChange:a.emptyFunc,onAwarenessChange:a.emptyFunc,onSyncStep1:async e=>e,forceSendInitialDocumentUpdate:!0})}))}}t.RTEConnector=d,d.webServerInfo=null,t.rteConnector=new d,s.connector.registerConnector(t.rteConnector)},715852:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Watcher=t.LOADING_STATE=t.CachePriority=void 0,t.isDehydratedWatcher=d,t.enableReactBatchedUpdates=function(e){f=e.unstable_batchedUpdates};const n=r(185709),a=r(229808),i=r(83933),o=r(485142),s=r(347893),u=(0,n.createLogger)("conduit:watcher");var c;!function(e){e[e.IMMEDIATE=1e3]="IMMEDIATE",e[e.HIGH=750]="HIGH",e[e.MEDIUM=500]="MEDIUM",e[e.LOW=250]="LOW"}(c||(t.CachePriority=c={})),t.LOADING_STATE=Object.freeze({isStale:!1,loading:!0,data:void 0,error:void 0,errors:void 0});const l={cachePriority:c.MEDIUM,shouldCache:!1};function d(e){return!e.hasOwnProperty("onUpdate")&&e.hasOwnProperty("lastResult")&&e.hasOwnProperty("key")}t.Watcher=class{constructor(e,r){var a;this.guid="Watcher-"+(0,n.uuid)(),this.state="active",e.cacheConfig?(void 0===e.cacheConfig.cachePriority&&(e.cacheConfig.cachePriority=c.MEDIUM),this.cacheConfig=e.cacheConfig):this.cacheConfig=Object.assign({},l),this.debugTrace=null!==(a=e.debugTrace)&&void 0!==a&&a,this.query=e.query instanceof o.ConduitQuery?e.query.query:e.query,this.priority=e.priority,this.subscribers=new Set,this.vars=e.vars,this.throttling=e.throttling;let i=!1;d(e)?(this.key=e.key,this.lastResult=e.lastResult,this.queryName=e.queryName):(this.key=(0,o.getQueryKey)(this.query,this.vars),this.queryName=(0,o.getQueryName)(this.query),this.lastResult=t.LOADING_STATE,this.subscribers.add(e.onUpdate),i=!0),i&&this.subscribeToQuery(),this.watcherResultsCompare=null!=r?r:s.defaultWatcherResultsCompare}dehydrate(){return""===this.query?null:{cacheConfig:this.cacheConfig,debugTrace:this.debugTrace,guid:this.guid,key:this.key,lastResult:Object.assign(Object.assign({},this.lastResult),{isStale:!0}),query:this.query,queryName:this.queryName,priority:this.priority,vars:this.vars,throttling:this.throttling}}addSubscriber(e,t,r){var a;let i;switch(this.subscribers.add(e),(0,n.isNotNullish)(r)&&((a=this.cacheConfig).shouldCache||(a.shouldCache=r.shouldCache),(0,n.isNotNullish)(r.cachePriority)&&(this.cacheConfig.cachePriority=Math.max(r.cachePriority,this.cacheConfig.cachePriority))),e(this.currentQueryResult()),this.state){case"active":return;case"inactive":i=!1;break;case"unsubscribed":i=!0}(0,n.traceTestCounts)(n.Trc,{"reactivated-subscriber":1}),this.priority=t,this.state="active",i&&this.subscribeToQuery()}removeSubscriber(e){return this.subscribers.delete(e),0===this.subscribers.size&&"active"===this.state&&(this.state="inactive"),this.subscribers.size}currentQueryResult(){return this.lastResult}getKey(){return this.key}updateDataResult(e,t){var r;let i,o;switch(e.type){case"DATA":i=e.result,o=void 0;break;case"ERROR":i=void 0,o=e.error}const s={loading:!1,data:(0,n.replaceImmutable)(this.lastResult.data,(0,a.drillDownIntoResponse)(null==i?void 0:i.data)),isStale:t,error:o,errors:null===(r=null==o?void 0:o.errorList)||void 0===r?void 0:r.map((e=>e.message))};(s.isStale!==this.lastResult.isStale||s.loading!==this.lastResult.loading||!this.watcherResultsCompare(s,this.lastResult)||(0,n.diffError)(s.error,this.lastResult.error))&&(this.lastResult=s,function(e){if((0,n.isNullish)(f))return void e();if(p.push(e),(0,n.isNullish)(h)){const e=f;h=setTimeout((()=>{try{e((()=>{p.forEach((e=>e()))}))}finally{p.length=0,h=null}}))}}((()=>{for(const e of this.subscribers)e(s)})))}handleWatcherResult(e){let r;switch(e.type){case"WATCHER_INVALIDATED":return this.state="unsubscribed",void(this.lastResult=t.LOADING_STATE);case"DATA":r=e;break;case"ERROR":r=Object.assign(Object.assign({},e),{error:(0,n.deserializeError)(e.error)})}const a="inactive"===this.state;this.updateDataResult(r,a),a&&this.unsubscribeFromQuery()}subscribeToQuery(){this.state="active",this.resubscribeToQueryInternal().catch((e=>{u.error("Watcher.subscribeToQuery. Error while subscribing:",e)}))}unsubscribeFromQuery(){i.connector.unSubscribe(this.guid).catch((e=>{u.error("Watcher.unsubscribeFromQuery. Error while unsubscribing:",e)})),this.state="unsubscribed"}async resubscribeToQueryInternal(e=0){var t;const r=await i.connector.query(this.query,null!==(t=this.vars)&&void 0!==t?t:{},{watcherGuid:this.guid,priority:this.priority,debugTrace:this.debugTrace,throttling:this.throttling,onUpdate:e=>this.handleWatcherResult(e)});"ERROR"===r.type&&r.error.isRetryable()&&e<10?await this.resubscribeToQueryInternal(e+1):this.handleWatcherResult(r)}};const p=[];let h=null,f=null},450469:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.buryWatchers=async function(e){await u.buryWatchers(e)},t.getCachedValue=function(e){return u.cachedValue(e)},t.getWatcher=function(e,t){return u.get(Object.assign(Object.assign({},e),{query:e.query instanceof a.ConduitQuery?e.query.query:e.query}),t)},t.releaseWatcher=function(e,t){u.releaseWatcher(e,t)},t.resubscribeBuriedWatchers=async function(){await u.resubscribeBuriedWatchers()},t.reviveBuriedWatchers=async function(e){await u.reviveBuriedWatchers(e)},t.destroyWatcherCache=function(){u.empty()};const n=r(185709),a=r(485142),i=r(347893),o=r(715852),s=new Map([["SearchEx",i.searchExWatcherResultsCompare]]);const u=new class{constructor(){this.undeadWatcherCache=new n.LRUMap(1e3),this.liveWatchers={}}async buryWatchers(e){const t={watchers:[]};for(const e in this.liveWatchers){const r=this.liveWatchers[e];if(!r.cacheConfig.shouldCache)continue;const n=r.dehydrate();n&&t.watchers.push(n)}const r=this.undeadWatcherCache.values();for(const e of r){if(!e.cacheConfig.shouldCache)continue;const r=e.dehydrate();r&&t.watchers.push(r)}await e((0,n.safeStringify)(t))}cachedValue(e){var t;const r=null!==(t=e.key)&&void 0!==t?t:(0,a.getQueryKey)(e.query,e.vars),i=this.liveWatchers[r];if((0,n.isNotNullish)(i))return{key:r,value:i.currentQueryResult()};const o=this.undeadWatcherCache.get(r);return(0,n.isNotNullish)(o)?{key:r,value:o.currentQueryResult()}:{key:r,value:null}}destructor(){this.empty()}get(e,t){const r=null!=t?t:(0,a.getQueryKey)(e.query,e.vars),i=this.liveWatchers[r];if((0,n.isNotNullish)(i))return i.addSubscriber(e.onUpdate,e.priority,e.cacheConfig),i;const u=this.undeadWatcherCache.get(r);if(u)return(0,n.traceTestCounts)(n.Trc,{"revived-undead-watcher":1}),this.undeadWatcherCache.delete(r),this.liveWatchers[r]=u,u.addSubscriber(e.onUpdate,e.priority,e.cacheConfig),u;const c=new o.Watcher(e,s.get((0,a.getQueryName)(e.query)));return this.liveWatchers[r]=c,c}releaseWatcher(e,t){if(0===e.removeSubscriber(t)){const t=e.getKey();delete this.liveWatchers[t],this.undeadWatcherCache.put(t,e)}}async resubscribeBuriedWatchers(){const e=this.undeadWatcherCache.values(),t=Object.values(this.liveWatchers).concat(e).filter((e=>e.cacheConfig.shouldCache)).sort(((e,t)=>t.cacheConfig.cachePriority-e.cacheConfig.cachePriority)),r=(0,n.chunkArray)(t,100);for(const e of r){for(const t of e)t.currentQueryResult().isStale&&t.subscribeToQuery();await(0,n.sleep)(300)}}async reviveBuriedWatchers(e){const t=(0,n.safeParse)(await e());if((0,n.isNullish)(t))return;const r=e=>{n.logger.error(e)};if("object"!==(0,n.getTypeOf)(t))return void r(`Received invalid buried watchers cache, cache object: ${t}`);const a=t.watchers;if("array"===(0,n.getTypeOf)(a))for(const e of a){if(!(0,o.isDehydratedWatcher)(e)){r(`Received invalid buried watcher in cache: ${e}`);continue}const t=new o.Watcher(e,s.get(e.queryName));this.undeadWatcherCache.put(t.getKey(),t)}else r(`Received invalid buried watchers cache, watchers: ${a}`)}empty(){this.liveWatchers={},this.undeadWatcherCache.clear()}}},819390:function(e,t,r){"use strict";var n,a=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||(n=function(e){return n=Object.getOwnPropertyNames||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[t.length]=r);return t},n(e)},function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r=n(e),o=0;o<r.length;o++)"default"!==r[o]&&a(t,e,r[o]);return i(t,e),t});Object.defineProperty(t,"__esModule",{value:!0}),t.DataWatcher=void 0;const s=r(185709),u=r(229808),c=r(323774),l=r(485142),d=o(r(450469));class p extends c.PureComponent{constructor(){super(...arguments),this.watchers={},this.activeWatchers={},this.execute=l.execute}subscribe(e,t,r,n){const a=e instanceof u.ConduitQueryBase?e.query:e,i=(0,l.getQueryKey)(a,t);if((0,s.isNullish)(this.watchers[i])){const a=this.onUpdate.bind(this);this.watchers[i]=[d.getWatcher({query:e,vars:t,priority:null!=r?r:s.Priority.MEDIUM,onUpdate:a,debugTrace:n,throttling:void 0}),a]}return this.activeWatchers[i]=!0,this.watchers[i][0].currentQueryResult()}componentDidUpdate(e,t,r){for(const e in this.watchers)this.activeWatchers[e]||(d.releaseWatcher(...this.watchers[e]),delete this.watchers[e]);this.activeWatchers={}}componentWillUnmount(){for(const e in this.watchers)d.releaseWatcher(...this.watchers[e]);this.watchers={}}onUpdate(){this.forceUpdate()}}t.DataWatcher=p},24056:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),t.OfflineContentStrategy=t.FeatureFlags=t.DataWatcher=t.recordSession=t.eventsOverIPCDestination=void 0,a(r(83933),t),a(r(447113),t),a(r(3503),t),a(r(485142),t),a(r(463015),t),a(r(715852),t),a(r(450469),t),a(r(60594),t);var i=r(766487);Object.defineProperty(t,"eventsOverIPCDestination",{enumerable:!0,get:function(){return i.eventsOverIPCDestination}});var o=r(673666);Object.defineProperty(t,"recordSession",{enumerable:!0,get:function(){return o.recordSession}});var s=r(819390);Object.defineProperty(t,"DataWatcher",{enumerable:!0,get:function(){return s.DataWatcher}});var u=r(229808);Object.defineProperty(t,"FeatureFlags",{enumerable:!0,get:function(){return u.FeatureFlags}}),Object.defineProperty(t,"OfflineContentStrategy",{enumerable:!0,get:function(){return u.OfflineContentStrategy}})},347893:(e,t)=>{"use strict";function r(e,t){return e.data===t.data}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultWatcherResultsCompare=r,t.searchExWatcherResultsCompare=function(e,t){e.data&&"results"in e.data&&(e.data.results=5);if(e.data&&t.data&&"results"in e.data&&"results"in t.data)return e.data.results===t.data.results;return r(e,t)}},766487:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.eventsOverIPCDestination=void 0;const a=r(185709),i=n(r(536425)),o=r(83933),s=(0,a.createLogger)("conduit:eventsOverIPC"),u=i.default`
  mutation EventsRecord($propertiesJsonStr: String!) {
    EventsRecord(propertiesJsonStr: $propertiesJsonStr) {
      success
    }
  }
`;const c=i.default`
  mutation EventsFlush {
    EventsFlush {
      success
    }
  }
`;const l=i.default`
  mutation DimensionSetString($name: String!, $value: String!) {
    DimensionSetString(name: $name, value: $value) {
      success
    }
  }
`,d=i.default`
  mutation DimensionSetBoolean($name: String!, $value: Boolean!) {
    DimensionSetBoolean(name: $name, value: $value) {
      success
    }
  }
`,p=i.default`
  mutation DimensionSetNumber($name: String!, $value: Float!) {
    DimensionSetNumber(name: $name, value: $value) {
      success
    }
  }
`;t.eventsOverIPCDestination={name:"EventsIPC-View",onFlush:function(){o.connector.query(c,{}).then((e=>{"ERROR"===e.type&&e.error.errorList.forEach((()=>s.error("Unable to flush batched events")))})).catch((e=>s.error("Unable to flush batched events",e)))},onRecordEvent:async function(e,t){const r=Object.assign(Object.assign({},e),{eventId:t}),n={propertiesJsonStr:JSON.stringify(r)};try{const e=await o.connector.query(u,n);if("ERROR"===e.type)return e.error.errorList.forEach((e=>s.error("Unable to record event",e))),!1}catch(e){return s.error("Unable to record event",e),!1}return!0},onSetDimension:async function(e,t){try{let r;switch(typeof t){case"boolean":r=await o.connector.query(d,{name:e,value:t});break;case"number":r=await o.connector.query(p,{name:e,value:t});break;case"string":r=await o.connector.query(l,{name:e,value:t});break;default:return s.error(`Invalid dimension type! Type for ${e} is ${typeof t}`),!1}if("ERROR"===r.type)return r.error.errorList.forEach((e=>s.error("Unable to set dimension",e))),!1}catch(e){return s.error("Unable to set dimension event",e),!1}return!0}}},673666:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.recordSession=function(){(0,n.getSessionBlock)(Date.now(),u)>i&&o.execute().then((e=>{i=e})).catch(s)};const n=r(185709),a=r(485142);let i=0;const o=a.gql`
  mutation RecordSession {
    recordSession {
      latestSessionBlock
    }
  }
`,s=(0,n.rateLimitErrorLog)(15,"Unable to record session"),u=Math.random()},26299:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.attachmentQueries=function(e){return{attachments:(0,a.toConduitQueryWitness)(e,i,"attachment.attachments"),transcribe:(0,a.mapConduitQueryWitness)((0,a.toConduitQueryWitness)(e,o,"attachment.transcribe"),(e=>({transcript:e}))),recognitionContent:(0,a.toConduitQueryWitness)(e,s,"attachment.recognitionContent")}};const n=r(485142),a=r(739136),i=n.gql`
  query Attachments($sort: AttachmentsSort, $filter: AttachmentsFilter!, $pagination: Pagination) {
    Attachments(sort: $sort, filter: $filter, pagination: $pagination) {
      count
      list {
        id
        filename
        mime
        parent {
          id
          label
          updated
        }
        data {
          size
          url
          hash
        }
      }
    }
  }
`,o=n.gql`
  query AITranscriptionTranscribe($id: String!) {
    AITranscriptionTranscribe(id: $id) {
      transcript
    }
  }
`,s=n.gql`
  query AttachmentRecognitionContent($id: String!) {
    Attachment(id: $id) {
      recognition {
        content
      }
    }
  }
`},148195:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.calendarEventQueries=function(e){return{notesForEvent:(0,a.toConduitQueryWitness)(e,i,"calendar.notesForEvent")}};const n=r(485142),a=r(739136),i=n.gql`
  query CalendarEventNotes($id: String!) {
    CalendarEventNotes(id: $id) {
      id
      label
    }
  }
`},561844:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.calendarV2Queries=function(e){return{googleOAuthUrl:(0,a.toConduitQueryWitness)(e,i,"calendarV2.googleOAuthUrl")}};const n=r(485142),a=r(739136),i=n.gql`
  query calendarV2GoogleOAuthUrl($redirectUri: String!, $codeChallenge: String!) {
    calendarV2GoogleOAuthUrl(redirectUri: $redirectUri, codeChallenge: $codeChallenge) {
      authUrl
    }
  }
`},451495:(e,t,r)=>{"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.conduit=t.conduitIPCPromiseSet=t.conduitIPC=void 0,t.conduitWitnessUsing=O;const a=r(185709),i=r(3503),o=r(485142),s=r(26299),u=r(148195),c=r(561844),l=r(408225),d=r(344998),p=r(207735),h=r(331923),f=r(776470),y=r(745494),m=r(327687),E=r(596860),T=r(412201),g=r(879493),N=r(52863),v=r(254463),_=r(11869),A=r(282658),R=r(776520),D=r(743537),b=r(877870),S=r(204704);function O(e,t){return{query:{attachment:(0,s.attachmentQueries)(e),calendar:(0,u.calendarEventQueries)(e),calendarV2:(0,c.calendarV2Queries)(e),debug:(0,l.debugQueries)(e,t),home:(0,p.homeQueries)(e),note:(0,m.noteQueries)(e),notebook:(0,f.notebookQueries)(e),profile:(0,T.profileQueries)(e),search:(0,g.searchQueries)(e),share:(0,N.shareQueries)(e),shortcut:(0,v.shortcutQueries)(e),stack:(0,_.stackQueries)(e),tag:(0,A.tagQueries)(e),task:(0,R.taskQueries)(e),user:(0,b.userQueries)(e),workspace:(0,S.workspaceQueries)(e)},mutate:{home:(0,d.homeBoardMutations)(e),note:(0,y.noteMutations)(e),notebook:(0,h.notebookMutations)(e),orion:(0,E.orionMutations)(e),user:(0,D.userMutations)(e)}}}n=(0,a.allocPromise)(),t.conduitIPC=n.promise,t.conduitIPCPromiseSet=n.resolve,t.conduit=O({execute:o.execute,observe:i.observe},t.conduitIPC)},408225:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.debugQueries=function(e,t){return{logQueries:i.logQueries,activeSubscriptions:i.currentlyActiveSubscriptions,orionSettings:(0,i.mapConduitQueryWitness)((0,i.toConduitQueryWitness)(e,s,"debug.orionSettingsGet"),(e=>({settings:JSON.parse(e)}))),syncState:(0,i.toConduitQueryWitness)(e,o,"debug.syncState"),rawSql:(e,t)=>n.connector.rawSql(e,null!=t?t:[]),ipc:t,tracing:{start:(0,i.toConduitQueryWitness)(e,u,"debug.tracing.start"),stop:(0,i.mapConduitQueryWitness)((0,i.toConduitQueryWitness)(e,c,"debug.tracing.stop"),(e=>({traceEvents:e.map((e=>Object.assign(Object.assign({},e),{args:JSON.parse(e.args)})))})))}}};const n=r(83933),a=r(485142),i=r(739136),o=a.gql`
  query SyncState {
    AuxData(id: "SyncState") {
      jsonStr
    }
  }
`,s=a.gql`
  query {
    orionSettingsGet {
      settings
    }
  }
`,u=a.gql`
  query {
    tracingStart {
      success
    }
  }
`,c=a.gql`
  query {
    tracingStop {
      traceEvents {
        name
        ph
        ts
        pid
        dur
        tid
        args
      }
    }
  }
`},739136:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.logQueries=function(e){p=e},t.isInternalQueryWitness=function(e){return"syncExternalStorage"in e},t.executeConduitMutation=function(e,t,r,n){return h(e,u,t,r,n)},t.toConduitQueryWitness=function(e,t,r){return{get:async n=>h(e,c,t,r,n),observe:(e,o)=>{const s=Date.now();let u=new a.Observable((0,i.observe)(t,e,o));if(p){let t=!0;u=u.pipe((0,a.tap)((a=>{t&&(t=!1,(0,n.isNotNullish)(a.data)?f(l,r,e,a.data,s):y(l,r,e,a.error,s))})))}return function(e,t,r){return(0,a.defer)((()=>{const i=E(t,r,"observe");return i.startedAt=new Date,d.add(i),e.pipe((0,a.tap)((e=>{(0,n.isNullish)(i.firstDuration)&&!e.isStale&&!e.loading&&(0,n.isNullish)(e.error)&&(i.firstDuration=Date.now()-i.startedAt.getTime()),i.emittedResults+=1})),(0,a.finalize)((()=>d.delete(i))))}))}(u,r,e)},syncExternalStorage:e=>{let a,i=null;return{getSnapshot:()=>{const{value:r,key:u}=(0,s.getCachedValue)({query:t.query,vars:e,priority:n.Priority.LOW,key:a,throttling:void 0});return a=u,i=null!=r?r:o.LOADING_STATE,i},subscribe:(o,u)=>{var c;const l=E(r,e,"useConduitWitness");l.startedAt=new Date,d.add(l);const p=e=>{(0,n.isNullish)(l.firstDuration)&&!e.isStale&&!e.loading&&(0,n.isNullish)(e.error)&&(l.firstDuration=Date.now()-l.startedAt.getTime()),l.emittedResults+=1,e!==i&&o()},h=(0,s.getWatcher)({query:t.query,cacheConfig:null==u?void 0:u.cacheConfiguration,vars:e,onUpdate:p,priority:null!==(c=null==u?void 0:u.priority)&&void 0!==c?c:n.Priority.MEDIUM,debugTrace:null==u?void 0:u.debugTrace,throttling:null==u?void 0:u.throttling},a);return()=>{d.delete(l),(0,s.releaseWatcher)(h,p),i=null}}}}}},t.mapConduitQueryWitness=function(e,t){return{get:r=>e.get(r).then(t),observe:(r,n)=>e.observe(r,n).pipe((0,a.map)((e=>T(e,t)))),syncExternalStorage:r=>g(e.syncExternalStorage(r),t)}},t.mapConduitQueryWitnessWithArgs=function(e,t,r){return{get:n=>e.get(t(n)).then((e=>r(n,e))),observe:(n,i)=>e.observe(t(n),i).pipe((0,a.map)((e=>T(e,r.bind(null,n))))),syncExternalStorage:n=>g(e.syncExternalStorage(t(n)),r.bind(null,n))}},t.currentlyActiveSubscriptions=function(){return Array.from(d).map((e=>Object.assign(Object.assign({},e),{elapsedTime:Date.now()-e.startedAt.getTime()})))};const n=r(185709),a=r(26690),i=r(3503),o=r(715852),s=r(450469),u=(0,n.createLogger)("Conduit[Mutation]"),c=(0,n.createLogger)("Conduit[Query]"),l=(0,n.createLogger)("Conduit[Subscription]"),d=new Set;let p=!1;async function h(e,t,r,n,a){const i=Date.now();try{const o=await e.execute(r,a);return p&&f(t,n,a,o,i),o}catch(e){throw y(t,n,a,e,i),e}}function f(e,t,r,a,i){e.debug(`[${Date.now()-i} ms] ${t}(${(0,n.safeStringify)(r)}) => ${m((0,n.safeStringify)(a))}`)}function y(e,t,r,a,i){e.warn(`[${Date.now()-i} ms] Failed ${t}(${(0,n.safeStringify)(r)}) => ${m((0,n.safeStringify)(a))}`)}function m(e){return e.length>1e3?`${e.substring(0,1e3)}…`:e}function E(e,t,r){return{name:e,args:t,firstDuration:null,emittedResults:0,elapsedTime:NaN,type:r,startedAt:new Date}}function T(e,t){return Object.assign(Object.assign({},e),{data:(0,n.isNullish)(e.data)?e.data:t(e.data)})}function g(e,t){let r=null,n=null;return{getSnapshot:()=>{const a=e.getSnapshot();return a===r&&null!==n||(r=a,n=T(a,t)),n},subscribe:e.subscribe}}},344998:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.homeBoardMutations=function(e){return{bootstrap:t=>e.execute(s,Object.assign(Object.assign({},t),{platform:d(t.platform)})),deletePreviousHeaderBackground:t=>e.execute(u,t),setIsCustomized:t=>e.execute(c,t),customize:t=>e.execute(l,{widgetMutations:p(t.widgetMutations),boardMutations:y(t.boardMutations)})}};const n=r(185709),a=r(229808),i=r(754302),o=r(485142),s=o.gql`
  mutation boardBootstrap(
    $features: BoardBootstrapFeatureArgs
    $clientLayoutVersion: Int
    $resetLayout: Boolean
    $clearContentOnReset: Boolean
    $platform: BoardFormFactor
    $upgradeIfAvailable: Boolean
  ) {
    boardBootstrap(
      features: $features
      clientLayoutVersion: $clientLayoutVersion
      resetLayout: $resetLayout
      clearContentOnReset: $clearContentOnReset
      platform: $platform
      upgradeIfAvailable: $upgradeIfAvailable
    ) {
      result
    }
  }
`,u=o.gql`
  mutation boardDeletePreviousHeaderBG($id: String!) {
    boardDeletePreviousHeaderBG(board: $id) {
      success
    }
  }
`,c=o.gql`
  mutation boardSetIsCustomized($id: String!, $isCustomized: Boolean!) {
    boardSetIsCustomized(board: $id, isCustomized: $isCustomized) {
      success
    }
  }
`,l=o.gql`
  mutation boardCustomizeVerII($boardMutations: BoardCustomizeParams, $widgetMutations: [WidgetCustomizeVerIIParams!]) {
    boardCustomizeVerII(boardMutations: $boardMutations, widgetMutations: $widgetMutations) {
      success
    }
  }
`;function d(e){switch(e){case void 0:case null:return e;case a.HomeBoardPlatform.desktop:return i.BoardFormFactor.Desktop;case a.HomeBoardPlatform.mobile:return i.BoardFormFactor.Mobile;default:throw(0,n.unknownCaseError)(e,"HomeBoardPlatform"),new Error(`unknownCaseError: HomeBoardPlatform: ${e}`)}}function p(e){return(0,n.isNullish)(e)?e:e.map((e=>Object.assign(Object.assign({},e),{fields:(0,n.isNullish)(e.fields)?e.fields:Object.assign(Object.assign({},e.fields),{mutableWidgetType:h(e.fields.mutableWidgetType),filteredNotesQuery:e.fields.filteredNotesQuery})})))}function h(e){switch(e){case void 0:return e;case a.HomeBoardMutableWidgetType.Pinned:return i.BoardMutableWidgetTypes.Pinned;case a.HomeBoardMutableWidgetType.ScratchPad:return i.BoardMutableWidgetTypes.ScratchPad;case a.HomeBoardMutableWidgetType.FilteredNotes:return i.BoardMutableWidgetTypes.FilteredNotes;default:throw(0,n.unknownCaseError)(e,"HomeBoardMutableWidgetType"),new Error(`unknownCaseError: HomeBoardMutableWidgetType: ${e}`)}}function f(e){switch(e){case void 0:return e;case a.HomeBoardBackgroundMode.None:return i.BoardBackgroundMode.None;case a.HomeBoardBackgroundMode.Image:return i.BoardBackgroundMode.Image;case a.HomeBoardBackgroundMode.Color:return i.BoardBackgroundMode.Color;default:throw(0,n.unknownCaseError)(e,"HomeBoardBackgroundMode"),new Error(`unknownCaseError: HomeBoardBackgroundMode: ${e}`)}}function y(e){return(0,n.isNullish)(e)?e:{board:e.id,isCustomized:e.isCustomized,headerFields:{greetingText:e.headerFields.greetingText,headerBGMode:f(e.headerFields.headerBackgroundMode),headerBGColor:e.headerFields.headerBackgroundColor}}}},207735:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.homeQueries=function(e){return{board:(0,a.toConduitQueryWitness)(e,i,"home.board")}};const n=r(485142),a=r(739136),i=n.gql`
  query HomeBoard($platform: HomeBoardPlatformEnum!) {
    HomeBoard(platform: $platform) {
      id
      headerBGMime
      headerBGFileName
      headerBGMode
      headerBGColor {
        light
        dark
      }
      headerBG {
        id
        path
        url
        size
        hash
      }
      headerBGPreviousUploadMime
      headerBGPreviousUploadFileName
      headerBGPreviousUpload {
        id
        path
        url
        size
        hash
      }
      isCustomized
      greetingText
      created
      updated
      widgets {
        id
        label
        isEnabled
        internalID
        selectedTab
        widgetType
        mutableWidgetType
        contentProviderID
        filteredNotesQuery {
          query
          resultSpec {
            type
            textSearchField
            sort
            ascending
            startIndex
            maxResults
          }
        }
        created
        updated
        backgroundColor {
          light
          dark
        }
        formFactor {
          sortWeight
          width
          height
          panelKey
        }
        content {
          id
          format
          version
          path
          localChangeTimestamp
          hash
          size
          content
        }
      }
    }
  }
`},745494:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SET_SELECTED_THUMBNAIL_HASH_QUERY=t.JOIN_PUBLIC_NOTE_QUERY=t.SET_IS_TEMPLATE_QUERY=t.SET_PUBLISHING_PRIVILEGE_NOTE_QUERY=t.LEAVE_SHARED_NOTE_QUERY=void 0,t.noteMutations=function(e){return{leave:r=>(0,o.executeConduitMutation)(e,t.LEAVE_SHARED_NOTE_QUERY,"note.leave",r),setPublishingPrivilege:r=>(0,o.executeConduitMutation)(e,t.SET_PUBLISHING_PRIVILEGE_NOTE_QUERY,"note.setPublishingPrivilege",{id:r.id,privilege:s(r.privilege)}),setIsTemplate:r=>(0,o.executeConduitMutation)(e,t.SET_IS_TEMPLATE_QUERY,"note.setIsTemplate",{id:r.id,isTemplate:r.isTemplate}),joinPublic:r=>(0,o.executeConduitMutation)(e,t.JOIN_PUBLIC_NOTE_QUERY,"note.joinPublic",r),setSelectedThumbnailHash:r=>(0,o.executeConduitMutation)(e,t.SET_SELECTED_THUMBNAIL_HASH_QUERY,"note.setSelectedThumbnailHash",r)}},t.legacyPublishPrivilegeFromPublishPrivilege=s;const n=r(689422),a=r(754302),i=r(485142),o=r(739136);function s(e){switch(e){case n.NotePublishingPrivilege.VIEW:return a.NotePublishingPrivilege.View;case n.NotePublishingPrivilege.EDIT:return a.NotePublishingPrivilege.Edit;case n.NotePublishingPrivilege.PRIVATE:return a.NotePublishingPrivilege.Private}}t.LEAVE_SHARED_NOTE_QUERY=i.gql`
  mutation leaveNote($id: String!) {
    noteLeave(note: $id) {
      success
    }
  }
`,t.SET_PUBLISHING_PRIVILEGE_NOTE_QUERY=i.gql`
  mutation noteSetPublishingPrivilege($id: String!, $privilege: NotePublishingPrivilege!) {
    noteSetPublishingPrivilege(note: $id, privilege: $privilege) {
      success
    }
  }
`,t.SET_IS_TEMPLATE_QUERY=i.gql`
  mutation noteSetIsTemplate($id: String!, $isTemplate: Boolean!) {
    noteSetIsTemplate(note: $id, isTemplate: $isTemplate) {
      success
    }
  }
`,t.JOIN_PUBLIC_NOTE_QUERY=i.gql`
  mutation noteJoinPublic($id: String!) {
    noteJoinPublic(note: $id) {
      success
    }
  }
`,t.SET_SELECTED_THUMBNAIL_HASH_QUERY=i.gql`
  mutation noteSetSelectedThumbnailHash($id: String!, $hash: String!) {
    noteSetSelectedThumbnailHash(note: $id, selectedThumbnailHash: $hash) {
      success
    }
  }
`},327687:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.noteQueries=function(e){return{allowedTags:(0,s.toConduitQueryWitness)(e,u,"note.allowedTags"),notes:(0,s.toConduitQueryWitness)(e,c,"note.notes"),detailedNotes:_(e),notesCount:(0,s.toConduitQueryWitness)(e,d,"note.notesCount"),note:(0,s.mapConduitQueryWitness)((0,s.toConduitQueryWitness)(e,p,"note.note"),A),snippet:(0,s.toConduitQueryWitness)(e,N,"note.snippet"),attachments:(0,s.toConduitQueryWitness)(e,h,"note.attachments"),attachmentsWithRecognitionContent:(0,s.toConduitQueryWitness)(e,f,"note.attachmentsWithRecognitionContent"),calendarEvents:(0,s.toConduitQueryWitness)(e,y,"note.calendarEvents"),taskGroups:(0,s.toConduitQueryWitness)(e,m,"note.taskGroups"),taskGroupsWithReminders:(0,s.toConduitQueryWitness)(e,E,"note.taskGroupsWithReminders"),memberships:(0,s.toConduitQueryWitness)(e,T,"note.memberships"),membershipsCount:(0,s.toConduitQueryWitness)(e,g,"note.membershipsCount"),withTodayReminderCount:(0,s.mapConduitQueryWitnessWithArgs)((0,s.toConduitQueryWitness)(e,v,"note.withTodayReminderCount"),a.convertIgnoredArrayFiltersToUndefined,((e,t)=>t))}},t.noteFromGQLNote=A,t.publishingPrivilegeFromLegacyPublishPrivilege=D;const n=r(689422),a=r(185709),i=r(754302),o=r(485142),s=r(739136),u=o.gql`
  query TagsAllowed($noteID: String!) {
    TagsAllowed(noteID: $noteID) {
      id
      label
    }
  }
`,c=o.gql`
  query Notes($sort: NotesSort, $filter: NotesFilter!, $pagination: Pagination) {
    Notes(sort: $sort, filter: $filter, pagination: $pagination) {
      id
      label
      created
      deleted
      updated
      reminder {
        time
        doneTime
      }
      parent {
        id
        entityType
      }
      isTemplate
    }
  }
`,l=o.gql`
  query DetailedNotes($byID: DetailedNotesByIDArgs, $byCriteria: DetailedNotesArgs) {
    DetailedNotes(byID: $byID, byCriteria: $byCriteria) {
      id
      label
      created
      deleted
      updated
      isTemplate
      reminder {
        time
        doneTime
        order
      }
      parent {
        id
        label
        entityType
        markedForOffline
      }
      contentDownloaded
      isShared
      markedForOffline
      shortcutID
      snippet
      tags {
        id
        label
      }
      tasks {
        count
        completed
      }
      thumbnailUrl
      commandPolicy {
        canDuplicate
        canEditContent
        canEditLabel
        canEmail
        canExpunge
        canLeave
        canMove
        canMoveToTrash
        canRestoreFromTrash
        canShare
        canSharePublicly
        canTag
        canCreateTag
        canUpdateMetadata
      }
      localChangeTimestamp
      webUrl
      share {
        date
        publishingPrivilege
      }
      shareCount
      isExternal
      creator
      lastEditor
      size {
        content
        attachments
      }
      sourceUrl
    }
  }
`,d=o.gql`
  query NotesCount($filter: NotesCountFilter!) {
    NotesCount(filter: $filter)
  }
`,p=o.gql`
  query Note($id: String!) {
    NoteSQL(id: $id) {
      type
      id
      label
      contentDownloaded
      inTrash
      isShared
      isUntitled
      hasTaskGroup
      markedForOffline
      deleted
      updated
      created
      localChangeTimestamp
      hasReminder
      appUrl
      webUrl
      historyUrl
      isAccepted
      isTemplate
      selectedThumbnailHash
      shard
      content {
        localChangeTimestamp
        hash
        size
      }
      contentClass
      subjectDate
      source {
        method
        url
        application
      }
      tags {
        id
        label
      }
      shareCount
      thumbnailUrl
      editor {
        author
        last
      }
      reminder {
        time
        order
        doneTime
      }
      share {
        date
        publishingPrivilege
      }
      commandPolicy {
        canDuplicate
        canEditContent
        canEditLabel
        canEmail
        canExpunge
        canLeave
        canMove
        canMoveToTrash
        canRestoreFromTrash
        canShare
        canSharePublicly
        canTag
        canCreateTag
        canUpdateMetadata
      }
      shortcut {
        id
        label
      }
      isExternal
      parent {
        label
        id
        entityType
        markedForOffline
        stackID
        parent {
          label
          id
        }
      }
      taskCompletionCount
      tasksCount
      lastEditor {
        photoUrl
        name
      }
    }
  }
`,h=o.gql`
  query NoteAttachments($id: String!) {
    NoteAttachments(id: $id) {
      id
      label
      localChangeTimestamp
      mime
      width
      height
      isActive
      data {
        localChangeTimestamp
        hash
        size
        url
      }
      recognition {
        localChangeTimestamp
        hash
        size
      }
      applicationDataKeys
      parent
      filename
    }
  }
`,f=o.gql`
  query NoteAttachmentsWithRecognitionContent($id: String!) {
    NoteAttachmentsWithRecognitionContent(id: $id) {
      id
      label
      localChangeTimestamp
      mime
      width
      height
      isActive
      data {
        localChangeTimestamp
        hash
        size
        url
      }
      recognition {
        localChangeTimestamp
        hash
        size
        content
      }
      applicationDataKeys
      parent
      filename
    }
  }
`,y=o.gql`
  query NoteAttachments($id: String!) {
    NoteCalendarEvents(id: $id) {
      id
      label
      localChangeTimestamp
      provider
      userIdFromExternalProvider
      userCalendarExternalId
      calendarEventExternalId
      created
      lastModified
      externalProviderDeleted
      isAccountConnected
      summary
      displayColor
      description
      location
      isAllDay
      start
      end
      recurrentEventId
      recurrence
      iCalendarUid
      isBusy
      status
      links {
        type
        description
        uri
      }
      eventCreator {
        email
        displayName
        avatar
      }
      eventOrganizer {
        email
        displayName
        avatar
      }
      attendees {
        contact {
          email
          displayName
          avatar
        }
        isOptional
        responseStatus
        isResource
        isSelf
      }
      isRecurrenceInstance
      areDetailsHidden
    }
  }
`,m=o.gql`
  query NoteAttachments($id: String!) {
    NoteTaskGroups(id: $id) {
      sortWeight
      noteLevelID
      tasks {
        id
        label
        localChangeTimestamp
        dueDate
        dueDateUIOption
        timeZone
        status
        statusUpdated
        assigneeEmail
        idClock
        inNote
        flag
        description
        sortWeight
        noteLevelID
        taskGroupNoteLevelID
        recurrence
        taskFlag
        featureVersion
        repeatAfterCompletion
        latestCompletedTaskOutlierID
        priority
        created
        updated
        deleted
        creator {
          id
          label
          name
          photoUrl
          rootID
          isSameBusiness
        }
        lastEditor {
          id
          label
          name
          photoUrl
          rootID
          isSameBusiness
        }
        assignee {
          id
          label
          name
          photoUrl
          rootID
          isSameBusiness
        }
        parent
        calculatedDueDate
        calculatedStatus
      }
    }
  }
`,E=o.gql`
  query NoteTaskGroupsWithReminders($id: String!) {
    NoteTaskGroupsWithReminders(id: $id) {
      sortWeight
      noteLevelID
      tasks {
        id
        label
        localChangeTimestamp
        dueDate
        dueDateUIOption
        timeZone
        status
        statusUpdated
        assigneeEmail
        idClock
        inNote
        flag
        description
        sortWeight
        noteLevelID
        taskGroupNoteLevelID
        recurrence
        taskFlag
        featureVersion
        repeatAfterCompletion
        latestCompletedTaskOutlierID
        priority
        created
        updated
        deleted
        creator {
          id
          label
          name
          photoUrl
          rootID
          isSameBusiness
        }
        lastEditor {
          id
          label
          name
          photoUrl
          rootID
          isSameBusiness
        }
        assignee {
          id
          label
          name
          photoUrl
          rootID
          isSameBusiness
        }
        parent
        calculatedDueDate
        calculatedStatus
        reminders {
          id
          label
          localChangeTimestamp
          reminderDate
          reminderDateUIOption
          timeZone
          dueDateOffset
          status
          noteLevelID
          created
          updated
          sourceTask
        }
      }
    }
  }
`,T=o.gql`
  query NoteMemberships($id: String!) {
    NoteMemberships(id: $id) {
      id
      privilege
      recipientIsMe
      sharerID
      ownerID
      recipient {
        id
        label
        email
        photoUrl
        name
        username
      }
      parent {
        type
        id
      }
    }
  }
`,g=o.gql`
  query NoteMembershipCount($id: String!) {
    NoteMembershipsCount(id: $id)
  }
`,N=o.gql`
  query NoteSnippet($id: String!) {
    Note(id: $id) {
      snippet
    }
  }
`,v=o.gql`
  query NotesWithTodayReminderCount($filter: NotesWithTodayReminderCountFilter!) {
    NotesWithTodayReminderCount(filter: $filter)
  }
`;function _(e){const t=(0,s.mapConduitQueryWitness)((0,s.toConduitQueryWitness)(e,l,"note.detailedNotes"),R);return{get:e=>t.get("ids"in e?{byID:e}:{byCriteria:e}),observe:(e,r)=>t.observe("ids"in e?{byID:e}:{byCriteria:e},r)}}function A(e){var t;let r;switch(null===(t=e.parent)||void 0===t?void 0:t.entityType){case"Workspace":r={id:e.parent.id,type:"Workspace",label:e.parent.label};break;case"Notebook":r={id:e.parent.id,type:"Notebook",label:e.parent.label,markedForOffline:e.parent.markedForOffline,stackID:e.parent.stackID,parent:(0,a.isNotNullish)(e.parent.parent)?Object.assign(Object.assign({},e.parent.parent),{type:"Workspace"}):null};break;case void 0:r=null}return Object.assign(Object.assign({},e),{parent:r,share:Object.assign(Object.assign({},e.share),{publishingPrivilege:D(e.share.publishingPrivilege)})})}function R(e){return e.map((e=>Object.assign(Object.assign({},e),{share:Object.assign(Object.assign({},e.share),{publishingPrivilege:D(e.share.publishingPrivilege)})})))}function D(e){switch(e){case i.NotePublishingPrivilege.View:return n.NotePublishingPrivilege.VIEW;case i.NotePublishingPrivilege.Edit:return n.NotePublishingPrivilege.EDIT;case i.NotePublishingPrivilege.Private:default:return n.NotePublishingPrivilege.PRIVATE}}},331923:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LEAVE_SHARED_NOTEBOOK_QUERY=void 0,t.notebookMutations=function(e){return{leave:r=>(0,a.executeConduitMutation)(e,t.LEAVE_SHARED_NOTEBOOK_QUERY,"notebook.leave",r)}};const n=r(485142),a=r(739136);t.LEAVE_SHARED_NOTEBOOK_QUERY=n.gql`
  mutation leaveNotebook($id: String!) {
    notebookLeave(notebook: $id) {
      success
    }
  }
`},776470:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.notebookQueries=function(e){return{notebooks:(0,a.mapConduitQueryWitnessWithArgs)((0,a.toConduitQueryWitness)(e,i,"notebook.notebooks"),(e=>Object.assign(Object.assign({},e),{includeCommandPolicy:!1})),((e,t)=>t)),byLabel:(0,a.toConduitQueryWitness)(e,o,"notebook.byLabel"),publishedNotebooks:(0,a.toConduitQueryWitness)(e,s,"notebook.notebooks"),notebooksWithCommandPolicy:(0,a.mapConduitQueryWitnessWithArgs)((0,a.toConduitQueryWitness)(e,i,"notebook.notebooksWithCommandPolicy"),(e=>Object.assign(Object.assign({},e),{includeCommandPolicy:!0})),((e,t)=>t)),stacked:(0,a.toConduitQueryWitness)(e,u,"notebook.stacked")}};const n=r(485142),a=r(739136),i=n.gql`
  query Notebooks($filter: NotebooksFilter!, $sort: NotebooksSort, $includeCommandPolicy: Boolean!, $pagination: Pagination) {
    Notebooks(filter: $filter, sort: $sort, includeCommandPolicy: $includeCommandPolicy, pagination: $pagination) {
      count
      list {
        id
        label
        parentID
        stack {
          id
          label
        }
        inWorkspace
        created
        updated
        notesCount
        contentDownloaded
        commandPolicy {
          canCreateFolder
          canCreateNote
          canEditLabel
          canExpunge
          canLeave
          canMakeDefault
          canMove
          canSetDefaultPrivilege
          canShare
          canStack
          canStore
          canUpdateDescription
          canUpdateType
        }
      }
    }
  }
`,o=n.gql`
  query NotebookByLabel($label: String!) {
    NotebookByLabel(label: $label)
  }
`,s=n.gql`
  query PublishedNotebooks($filter: PublishedNotebooksFilter!, $sort: PublishedNotebooksSort, $pagination: Pagination, $cacheMs: Int) {
    PublishedNotebooks(filter: $filter, sort: $sort, pagination: $pagination, cacheMs: $cacheMs) {
      count
      list {
        id
        label
        businessDescription
        created
        updated
        accessStatus
        notesCount
        businessPrivilege
      }
    }
  }
`,u=n.gql`
  query StackedNotebooksV2($sort: StackedNotebooksSort, $groupByType: Boolean!, $filter: StackedNotebooksFilter!, $pagination: Pagination) {
    StackedNotebooksV2(sort: $sort, groupByType: $groupByType, filter: $filter, pagination: $pagination) {
      itemsCount
      notebooksCount
      list {
        id
        type
        label
        level
      }
    }
  }
`},596860:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ORION_SET_SETTINGS_MUTATION=void 0,t.orionMutations=function(e){return{setSettings:r=>(0,a.executeConduitMutation)(e,t.ORION_SET_SETTINGS_MUTATION,"orion.setSettingsForCurrentUser",{settings:JSON.stringify(r.settings)})}};const n=r(485142),a=r(739136);t.ORION_SET_SETTINGS_MUTATION=n.gql`
  mutation OrionSettingsSet($settings: String!) {
    orionSettingsSet(settings: $settings) {
      success
    }
  }
`},412201:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.profileQueries=function(e){return{profiles:(0,a.toConduitQueryWitness)(e,i,"profile.profiles")}};const n=r(485142),a=r(739136),i=n.gql`
  query {
    Profiles {
      id
      label
      username
      email
      isSameBusiness
      name
      photoUrl
      rootID
      status
    }
  }
`},879493:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.searchQueries=function(e){return{savedSearches:(0,a.toConduitQueryWitness)(e,i,"search.savedSearches")}};const n=r(485142),a=r(739136),i=n.gql`
  query SavedSearches($sort: SavedSearchesSort, $pagination: Pagination) {
    SavedSearches(sort: $sort, pagination: $pagination) {
      count
      list {
        id
        label
        query
      }
    }
  }
`},52863:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.shareQueries=function(e){return{sharedWithMe:(0,a.toConduitQueryWitness)(e,i,"share.sharedWithMe")}};const n=r(485142),a=r(739136),i=n.gql`
  query SharedWithMe($sort: SharedWithMeSortingArgs) {
    SharedWithMe(sort: $sort) {
      memberships {
        id
        localChangeTimestamp
        privilege
        recipientType
        created
        updated
        invitedTime
        sharer {
          id
          label
          localChangeTimestamp
          email
          photoLastUpdated
          photoUrl
          name
          username
        }
        owner {
          id
          label
          localChangeTimestamp
          email
          photoLastUpdated
          photoUrl
          name
          username
        }
        recipient {
          id
          label
          localChangeTimestamp
          email
          photoLastUpdated
          photoUrl
          name
          username
        }
        parent {
          id
          label
          type
        }
      }
      invitations {
        id
        label
        localChangeTimestamp
        created
        snippet
        invitationType
        acceptedTime
        privilege
        sharer {
          id
          label
          localChangeTimestamp
          email
          photoLastUpdated
          photoUrl
          name
          username
        }
        owner {
          id
          label
          localChangeTimestamp
          email
          photoLastUpdated
          photoUrl
          name
          username
        }
        recipient {
          id
          label
          localChangeTimestamp
          email
          photoLastUpdated
          photoUrl
          name
          username
        }
        parent {
          id
          label
          type
        }
      }
    }
  }
`},254463:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.shortcutQueries=function(e){return{shortcuts:(0,a.toConduitQueryWitness)(e,i,"shortcut.shortcuts")}};const n=r(485142),a=r(739136),i=n.gql`
  query Shortcuts($sort: ShortcutsSort, $pagination: Pagination) {
    Shortcuts(sort: $sort, pagination: $pagination) {
      count
      list {
        id
        sortOrder
        sourceID
        sourceType
      }
    }
  }
`},11869:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.stackQueries=function(e){return{stack:(0,a.toConduitQueryWitness)(e,i,"stack.stack"),stacks:(0,a.toConduitQueryWitness)(e,o,"stack.stacks")}};const n=r(485142),a=r(739136),i=n.gql`
  query StackSQL($id: String!) {
    StackSQL(id: $id) {
      id
      label
      notebooks {
        id
        label
      }
      shortcut {
        id
        label
      }
    }
  }
`,o=n.gql`
  query Stacks {
    Stacks {
      id
      label
      notebooks {
        id
      }
    }
  }
`},282658:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TAGS_HIERARCHY_QUERY=void 0,t.tagQueries=function(e){return{tags:(0,i.toConduitQueryWitness)(e,o,"tag.tags"),tagsCount:(0,i.toConduitQueryWitness)(e,s,"tag.tagsCount"),hierarchy:(0,i.mapConduitQueryWitnessWithArgs)((0,i.toConduitQueryWitness)(e,t.TAGS_HIERARCHY_QUERY,"tag.hierarchy"),n.convertIgnoredArrayFiltersToUndefined,((e,t)=>t)),byLabel:(0,i.toConduitQueryWitness)(e,u,"tag.existsWithLabel")}};const n=r(185709),a=r(485142),i=r(739136),o=a.gql`
  query Tags($sort: TagsSort, $filter: TagsFilter!, $pagination: Pagination) {
    Tags(sort: $sort, filter: $filter, pagination: $pagination) {
      id
      label
      refsCount
      parentID
    }
  }
`,s=a.gql`
  query TagsCount($filter: TagsFilter!) {
    TagsCount(filter: $filter)
  }
`;t.TAGS_HIERARCHY_QUERY=a.gql`
  query TagsHierarchyV2($filter: TagsHierarchyFilter!, $sort: TagsHierarchySort, $pagination: Pagination) {
    TagsHierarchyV2(filter: $filter, sort: $sort, pagination: $pagination) {
      list {
        id
        label
        level
        hasChildren
        refsCount
      }
      tagsTotalCount
    }
  }
`;const u=a.gql`
  query TagByLabel($label: String!) {
    TagByLabel(label: $label)
  }
`},776520:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.taskQueries=function(e){return{byAssignment:(0,a.toConduitQueryWitness)(e,c,"task.byAssignment"),byDueDate:(0,a.toConduitQueryWitness)(e,u,"task.byDueDate"),byNote:(0,a.toConduitQueryWitness)(e,i,"task.byNote"),byNotebook:(0,a.toConduitQueryWitness)(e,s,"task.byNotebook"),count:(0,a.toConduitQueryWitness)(e,l,"task.count"),inTimeframe:(0,a.toConduitQueryWitness)(e,d,"task.inTimeframe"),myTasks:(0,a.toConduitQueryWitness)(e,o,"task.myTasks"),reminders:(0,a.toConduitQueryWitness)(e,p,"task.reminders")}};const n=r(485142),a=r(739136),i=n.gql`
  query ($sort: TaskKingdomWitnessSort, $filter: TasksByNoteV2Filter!, $pagination: Pagination, $untitledTaskLabel: String!) {
    TasksByNoteV2(sort: $sort, filter: $filter, pagination: $pagination, untitledTaskLabel: $untitledTaskLabel) {
      tasksTotalCount
      list {
        noteID
        label
        isNoteAvailable
        isNoteShared
        taskCount
        tasks {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
    }
  }
`,o=n.gql`
  query MyTasksV2($sort: TaskKingdomSort, $filter: TaskKingdomFilter!, $pagination: Pagination, $untitledTaskLabel: String!) {
    MyTasksV2(sort: $sort, filter: $filter, pagination: $pagination, untitledTaskLabel: $untitledTaskLabel) {
      openTasksCount
      tasksCount
      list {
        id
        label
        description
        priority
        flag
        parentID
        parentLabel
        status
        dueDate
        dueDateUIOption
        timeZone
        recurrence
        repeatAfterCompletion
        reminders {
          id
          reminderDate
          reminderDateUIOption
          noteLevelID
          dueDateOffset
          timeZone
        }
        creator
        assignee {
          id
          label
          email
          photoUrl
        }
        assignedBy {
          id
          label
          email
        }
        hasNote
        sortWeight
        taskGroupNoteLevelID
        isObsoleteVersion
      }
    }
  }
`,s=n.gql`
  query TasksByNotebook($sort: TaskKingdomSort, $filter: TasksByNotebookFilter!, $untitledTaskLabel: String!, $pagination: Pagination) {
    TasksByNotebook(sort: $sort, filter: $filter, untitledTaskLabel: $untitledTaskLabel, pagination: $pagination) {
      tasksTotalCount
      list {
        notebookID
        label
        isNotebookAvailable
        isNotebookShared
        taskCount
        tasks {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
    }
  }
`,u=n.gql`
  query TasksByDueDateV2($sort: TaskKingdomSort, $filter: TasksByDueDateV2Filter!, $untitledTaskLabel: String!, $pagination: Pagination) {
    TasksByDueDateV2(sort: $sort, filter: $filter, untitledTaskLabel: $untitledTaskLabel, pagination: $pagination) {
      tasksTotalCount
      overdue {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      today {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      tomorrow {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      next7Days {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      later {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      noDueDate {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      past {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
    }
  }
`,c=n.gql`
  query TasksByAssignmentV2($sort: TaskKingdomSort, $filter: TasksByAssignmentFilter!, $untitledTaskLabel: String!, $pagination: Pagination) {
    TasksByAssignmentV2(sort: $sort, filter: $filter, untitledTaskLabel: $untitledTaskLabel, pagination: $pagination) {
      tasksTotalCount
      assignedToMe {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      assignedToOthers {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
      unassigned {
        tasksCount
        list {
          id
          label
          description
          priority
          flag
          parentID
          parentLabel
          status
          dueDate
          dueDateUIOption
          timeZone
          recurrence
          repeatAfterCompletion
          reminders {
            id
            reminderDate
            reminderDateUIOption
            noteLevelID
            dueDateOffset
            timeZone
          }
          creator
          assignee {
            id
            label
            email
            photoUrl
          }
          assignedBy {
            id
            label
            email
          }
          hasNote
          sortWeight
          taskGroupNoteLevelID
          isObsoleteVersion
        }
      }
    }
  }
`,l=n.gql`
  query TasksCount($filter: TasksCountFilter!) {
    TasksCount(filter: $filter)
  }
`,d=n.gql`
  query TasksInTimeframe($filter: TasksInTimeframeFilter!, $pagination: Pagination) {
    TasksInTimeframe(filter: $filter, pagination: $pagination) {
      count
      list {
        id
        label
        status
        dueDate
        dueDateUIOption
        assigneeID
      }
    }
  }
`,p=n.gql`
  query RemindersInTask($id: String!) {
    TaskReminders(id: $id) {
      id
      label
      localChangeTimestamp
      reminderDate
      reminderDateUIOption
      timeZone
      dueDateOffset
      status
      noteLevelID
      created
      updated
      sourceTask
    }
  }
`},743537:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SEND_VERIFICATION_EMAIL_QUERY=t.CLIENT_INFO_UPDATE_QUERY=void 0,t.userMutations=function(e){return{sendVerificationEmail:()=>(0,a.executeConduitMutation)(e,t.SEND_VERIFICATION_EMAIL_QUERY,"user.sendVerificationEmail",{}),updateClientInfo:r=>(0,a.executeConduitMutation)(e,t.CLIENT_INFO_UPDATE_QUERY,"user.updateClientInfo",r)}};const n=r(485142),a=r(739136);t.CLIENT_INFO_UPDATE_QUERY=n.gql`
  mutation clientInfoUpdate($key: String!, $value: String) {
    clientInfoUpdate(key: $key, value: $value) {
      result
    }
  }
`,t.SEND_VERIFICATION_EMAIL_QUERY=n.gql`
  mutation sendVerificationEmail {
    sendVerificationEmail {
      success
    }
  }
`},877870:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.userQueries=function(e){return{clientInfo:(0,a.toConduitQueryWitness)(e,i,"user.clientInfo"),promotions:(0,a.toConduitQueryWitness)(e,o,"user.promotions")}};const n=r(485142),a=r(739136),i=n.gql`
  query ClientInfo($key: String!) {
    ClientInfo(key: $key)
  }
`,o=n.gql`
  query Promotions {
    Promotions {
      id
      label
      optedOut
      shownCount
      timeLastShown
    }
  }
`},204704:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WORKSPACES_IN_BUSINESS_DIRECTORY_QUERY=void 0,t.workspaceQueries=function(e){return{workspaces:(0,a.toConduitQueryWitness)(e,i,"workspace.workspaces"),workspacesInBusinessDirectory:(0,a.toConduitQueryWitness)(e,t.WORKSPACES_IN_BUSINESS_DIRECTORY_QUERY,"workspace.workspacesInBusinessDirectory")}};const n=r(485142),a=r(739136),i=n.gql`
  query Workspaces($sort: WorkspacesSort, $pagination: Pagination) {
    Workspaces(sort: $sort, pagination: $pagination) {
      count
      list {
        id
        label
        created
        updated
        isSample
        shareCount
        manager {
          id
        }
        privileges {
          canCreateNote
          canStore
        }
      }
    }
  }
`;t.WORKSPACES_IN_BUSINESS_DIRECTORY_QUERY=n.gql`
  query WorkspacesInBusinessDirectory($filter: WorkspacesInBusinessDirectoryFilter!, $sort: WorkspacesInBusinessDirectorySort, $pagination: Pagination, $cacheMs: Int) {
    WorkspacesInBusinessDirectory(filter: $filter, sort: $sort, pagination: $pagination, cacheMs: $cacheMs) {
      count
      list {
        guid
        title
        description
        workspaceType
        notesCount
        notebooksCount
        created
        updated
        membersCount
        manager
        workspaceMembershipStatus
      }
    }
  }
//# sourceMappingURL=9234.b2147ed6cb931ae00085.js.map
//# debugId=6fd90f21-0a54-5c42-a0be-d493bc7bf12d