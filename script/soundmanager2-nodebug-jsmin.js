/*!
   SoundManager 2: Javascript Sound for the Web
   --------------------------------------------
   http://schillmania.com/projects/soundmanager2/

   Copyright (c) 2007, Scott Schiller. All rights reserved.
   Code provided under the BSD License:
   http://schillmania.com/projects/soundmanager2/license.txt

   V2.95b.20100101+DEV.20100320
*/

/*jslint white: false, onevar: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, newcap: true, immed: true */

(function(g){function n(o,p){this.flashVersion=8;this.debugFlash=this.debugMode=false;this.useConsole=true;this.waitForWindowLoad=this.consoleOnly=false;this.nullURL="null.mp3";this.allowPolling=true;this.useMovieStar=this.useFastPolling=false;this.bgColor="#ffffff";this.useHighPerformance=false;this.flashLoadTimeout=1E3;this.wmode=null;this.allowFullScreen=true;this.allowScriptAccess="always";this.handleFlashBlock=true;this.defaultOptions={autoLoad:false,stream:true,autoPlay:false,onid3:null,onload:null, whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onstop:null,onfinish:null,onbeforefinish:null,onbeforefinishtime:5E3,onbeforefinishcomplete:null,onjustbeforefinish:null,onjustbeforefinishtime:200,multiShot:true,multiShotEvents:false,position:null,pan:0,volume:100};this.flash9Options={isMovieStar:null,usePeakData:false,useWaveformData:false,useEQData:false,onbufferchange:null,ondataerror:null};this.movieStarOptions={onmetadata:null,useVideo:false,bufferTime:2};var l,a=this, j,m;this.version=null;this.versionNumber="V2.95b.20100101+DEV.20100320";this.movieURL=null;this.url=o||null;this.altURL=null;this.enabled=this.swfLoaded=false;this.o=null;this.movieID="sm2-container";this.id=p||"sm2movie";this.swfCSS={swfDefault:"movieContainer",swfTimeout:"swf_timedout",swfUnblocked:"swf_unblocked",sm2Debug:"sm2_debug",highPerf:"high_performance",flashDebug:"flash_debug"};this.oMC=null;this.sounds={};this.soundIDs=[];this.isFullScreen=this.muted=false;this.isIE=navigator.userAgent.match(/MSIE/i); this.isSafari=navigator.userAgent.match(/safari/i);this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.didFlashBlock=this.specialWmodeCase=false;this._onready=[];this._debugOpen=true;this._windowLoaded=this._disabled=this._didInit=this._appendSuccess=this._didAppend=false;this._hasConsole=typeof console!=="undefined"&&typeof console.log!=="undefined";this._debugLevels=["log","info","warn","error"];this._defaultFlashVersion=8;this._oRemovedHTML=this._oRemoved=null;j=function(c){return document.getElementById(c)}; this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?\.*)?$/i,flash9:/\.mp3(\?\.*)?$/i};this.baseMimeTypes=/^audio\/(?:x-)?(?:mp(?:eg|3))\s*;?/i;this.netStreamMimeTypes=/^audio\/(?:x-)?(?:mp(?:eg|3)|mp4a-latm|aac|speex)\s*;?/i;this.netStreamTypes=["aac","flv","mov","mp4","m4v","f4v","m4a","mp4v","3gp","3g2"];this.netStreamPattern=new RegExp("\\.("+this.netStreamTypes.join("|")+")(\\?.*)?$","i");this.mimePattern=a.baseMimeTypes;this.features={buffering:false,peakData:false,waveformData:false,eqData:false, movieStar:false};this.sandbox={type:null,types:{remote:"remote (domain-based) rules",localWithFile:"local with file access (no internet access)",localWithNetwork:"local with network (internet access only, no local access)",localTrusted:"local, trusted (local+internet access)"},description:null,noRemote:null,noLocal:null};this._setVersionInfo=function(){if(a.flashVersion!==8&&a.flashVersion!==9){alert(a._str("badFV",a.flashVersion,a._defaultFlashVersion));a.flashVersion=a._defaultFlashVersion}a.version= a.versionNumber+(a.flashVersion===9?" (AS3/Flash 9)":" (AS2/Flash 8)");if(a.flashVersion>8){a.defaultOptions=a._mergeObjects(a.defaultOptions,a.flash9Options);a.features.buffering=true}if(a.flashVersion>8&&a.useMovieStar){a.defaultOptions=a._mergeObjects(a.defaultOptions,a.movieStarOptions);a.filePatterns.flash9=new RegExp("\\.(mp3|"+a.netStreamTypes.join("|")+")(\\?.*)?$","i");a.mimePattern=a.netStreamMimeTypes;a.features.movieStar=true}else{a.useMovieStar=false;a.features.movieStar=false}a.filePattern= a.filePatterns[a.flashVersion!==8?"flash9":"flash8"];a.movieURL=a.flashVersion===8?"soundmanager2.swf":"soundmanager2_flash9.swf";a.features.peakData=a.features.waveformData=a.features.eqData=a.flashVersion>8};this._overHTTP=document.location?document.location.protocol.match(/http/i):null;this._initPending=this._waitingforEI=false;this._tryInitOnFocus=this.isSafari&&typeof document.hasFocus==="undefined";this._isFocused=typeof document.hasFocus!=="undefined"?document.hasFocus():null;this._okToDisable= !this._tryInitOnFocus;this.useAltURL=!this._overHTTP;this.strings={};this._str=function(){var c=Array.prototype.slice.call(arguments),b=c.shift();b=a.strings&&a.strings[b]?a.strings[b]:"";var d,e;if(b&&c&&c.length){d=0;for(e=c.length;d<e;d++)b=b.replace("%s",c[d])}return b};this.supported=function(){return a._didInit&&!a._disabled};this.getMovie=function(c){return a.isIE?g[c]:a.isSafari?j(c)||document[c]:j(c)};this.loadFromXML=function(c){try{a.o._loadFromXML(c)}catch(b){a._failSafely();return true}}; this.createSound=function(c){var b=null;b=null;if(!a._didInit)throw a._complain("soundManager.createSound(): "+a._str("notReady"),arguments.callee.caller);if(arguments.length===2)c={id:arguments[0],url:arguments[1]};b=b=a._mergeObjects(c);b.id.toString().charAt(0).match(/^[0-9]$/);if(a._idCheck(b.id,true))return a.sounds[b.id];if(a.flashVersion>8&&a.useMovieStar){if(b.isMovieStar===null)b.isMovieStar=b.url.match(a.netStreamPattern)?true:false;if(b.isMovieStar&&b.usePeakData)b.usePeakData=false}a.sounds[b.id]= new l(b);a.soundIDs[a.soundIDs.length]=b.id;a.flashVersion===8?a.o._createSound(b.id,b.onjustbeforefinishtime):a.o._createSound(b.id,b.url,b.onjustbeforefinishtime,b.usePeakData,b.useWaveformData,b.useEQData,b.isMovieStar,b.isMovieStar?b.useVideo:false,b.isMovieStar?b.bufferTime:false);if(b.autoLoad||b.autoPlay)a.sounds[b.id]&&a.sounds[b.id].load(b);b.autoPlay&&a.sounds[b.id].play();return a.sounds[b.id]};this.createVideo=function(c){if(arguments.length===2)c={id:arguments[0],url:arguments[1]};if(a.flashVersion>= 9){c.isMovieStar=true;c.useVideo=true}else return false;return a.createSound(c)};this.destroyVideo=this.destroySound=function(c,b){if(!a._idCheck(c))return false;for(var d=0;d<a.soundIDs.length;d++)a.soundIDs[d]===c&&a.soundIDs.splice(d,1);a.sounds[c].unload();b||a.sounds[c].destruct();delete a.sounds[c]};this.load=function(c,b){if(!a._idCheck(c))return false;a.sounds[c].load(b)};this.unload=function(c){if(!a._idCheck(c))return false;a.sounds[c].unload()};this.start=this.play=function(c,b){if(!a._didInit)throw a._complain("soundManager.play(): "+ a._str("notReady"),arguments.callee.caller);if(!a._idCheck(c)){b instanceof Object||(b={url:b});if(b&&b.url){b.id=c;return a.createSound(b).play()}else return false}a.sounds[c].play(b)};this.setPosition=function(c,b){if(!a._idCheck(c))return false;a.sounds[c].setPosition(b)};this.stop=function(c){if(!a._idCheck(c))return false;a.sounds[c].stop()};this.stopAll=function(){for(var c in a.sounds)a.sounds[c]instanceof l&&a.sounds[c].stop()};this.pause=function(c){if(!a._idCheck(c))return false;a.sounds[c].pause()}; this.pauseAll=function(){for(var c=a.soundIDs.length;c--;)a.sounds[a.soundIDs[c]].pause()};this.resume=function(c){if(!a._idCheck(c))return false;a.sounds[c].resume()};this.resumeAll=function(){for(var c=a.soundIDs.length;c--;)a.sounds[a.soundIDs[c]].resume()};this.togglePause=function(c){if(!a._idCheck(c))return false;a.sounds[c].togglePause()};this.setPan=function(c,b){if(!a._idCheck(c))return false;a.sounds[c].setPan(b)};this.setVolume=function(c,b){if(!a._idCheck(c))return false;a.sounds[c].setVolume(b)}; this.mute=function(c){var b=0;if(typeof c!=="string")c=null;if(c){if(!a._idCheck(c))return false;a.sounds[c].mute()}else{for(b=a.soundIDs.length;b--;)a.sounds[a.soundIDs[b]].mute();a.muted=true}};this.muteAll=function(){a.mute()};this.unmute=function(c){if(typeof c!=="string")c=null;if(c){if(!a._idCheck(c))return false;a.sounds[c].unmute()}else{for(c=a.soundIDs.length;c--;)a.sounds[a.soundIDs[c]].unmute();a.muted=false}};this.unmuteAll=function(){a.unmute()};this.toggleMute=function(c){if(!a._idCheck(c))return false; a.sounds[c].toggleMute()};this.getMemoryUse=function(){if(a.flashVersion===8)return 0;if(a.o)return parseInt(a.o._getMemoryUse(),10)};this.disable=function(c){if(typeof c==="undefined")c=false;if(a._disabled)return false;a._disabled=true;for(var b=a.soundIDs.length;b--;)a._disableObject(a.sounds[a.soundIDs[b]]);a.initComplete(c)};this.canPlayMIME=function(c){return c?c.match(a.mimePattern)?true:false:null};this.canPlayURL=function(c){return c?c.match(a.filePattern)?true:false:null};this.canPlayLink= function(c){if(typeof c.type!=="undefined"&&c.type)if(a.canPlayMIME(c.type))return true;return a.canPlayURL(c.href)};this.getSoundById=function(c){if(!c)throw new Error("SoundManager.getSoundById(): sID is null/undefined");return a.sounds[c]};this.onready=function(c,b){if(c&&c instanceof Function){b||(b=g);a._addOnReady(c,b);a._processOnReady();return true}else throw a._str("needFunction");};this.oninitmovie=function(){};this.onload=function(){k._wD("soundManager.onload()",1)};this.onerror=function(){}; this._idCheck=this.getSoundById;this._complain=function(c,b){if(!b)return new Error("Error: "+c);typeof console!=="undefined"&&typeof console.trace!=="undefined"&&console.trace();c="Error: "+c+". \nCaller: "+b.toString();return new Error(c)};m=function(){return false};m._protected=true;this._disableObject=function(c){for(var b in c)if(typeof c[b]==="function"&&typeof c[b]._protected==="undefined")c[b]=m};this._failSafely=function(c){if(typeof c==="undefined")c=false;if(!a._disabled||c)a.disable(c)}; this._normalizeMovieURL=function(c){var b=null;if(c)if(c.match(/\.swf(\?\.*)?$/i)){if(b=c.substr(c.toLowerCase().lastIndexOf(".swf?")+4))return c}else if(c.lastIndexOf("/")!==c.length-1)c+="/";return(c&&c.lastIndexOf("/")!==-1?c.substr(0,c.lastIndexOf("/")+1):"./")+a.movieURL};this._getDocument=function(){return document.body?document.body:document.documentElement?document.documentElement:document.getElementsByTagName("div")[0]};this._getDocument._protected=true;this._setPolling=function(c,b){if(!a.o|| !a.allowPolling)return false;a.o._setPolling(c,b)};this._createMovie=function(c,b){var d=b?b:a.url;b=a.altURL?a.altURL:d;var e,f,i,h;if(a.debugURLParam.test(g.location.href.toString()))a.debugMode=true;if(a._didAppend&&a._appendSuccess)return false;a._didAppend=true;a._setVersionInfo();a.url=a._normalizeMovieURL(a._overHTTP?d:b);b=a.url;if(a.useHighPerformance&&a.useMovieStar&&a.defaultOptions.useVideo===true)a.useHighPerformance=false;a.wmode=!a.wmode&&a.useHighPerformance&&!a.useMovieStar?"transparent": a.wmode;if(a.wmode!==null&&!a.isIE&&navigator.platform.match(/win32/i)){a.specialWmodeCase=true;a.wmode=null}if(a.flashVersion===8)a.allowFullScreen=false;e={name:c,id:c,src:b,width:"100%",height:"100%",quality:"high",allowScriptAccess:a.allowScriptAccess,bgcolor:a.bgColor,pluginspage:"http://www.macromedia.com/go/getflashplayer",type:"application/x-shockwave-flash",wmode:a.wmode,allowfullscreen:a.allowFullScreen?"true":"false"};if(a.debugFlash)e.FlashVars="debug=1";a.wmode||delete e.wmode;if(a.isIE){d= document.createElement("div");i='<object id="'+c+'" data="'+b+'" type="'+e.type+'" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+b+'" /><param name="AllowScriptAccess" value="'+a.allowScriptAccess+'" /><param name="quality" value="'+e.quality+'" />'+(a.wmode?'<param name="wmode" value="'+a.wmode+'" /> ':"")+'<param name="bgcolor" value="'+a.bgColor+'" /><param name="allowFullScreen" value="'+e.allowFullScreen+'" />'+(a.debugFlash?'<param name="FlashVars" value="'+e.FlashVars+ '" />':"")+"<!-- --\></object>"}else{d=document.createElement("embed");for(f in e)e.hasOwnProperty(f)&&d.setAttribute(f,e[f])}if(a.debugMode){h=document.createElement("div");h.id=a.debugID+"-toggle";c={position:"fixed",bottom:"0px",right:"0px",width:"1.2em",height:"1.2em",lineHeight:"1.2em",margin:"2px",textAlign:"center",border:"1px solid #999",cursor:"pointer",background:"#fff",color:"#333",zIndex:10001};h.appendChild(document.createTextNode("-"));h.onclick=a._toggleDebug;h.title="Toggle SM2 debug console"; if(navigator.userAgent.match(/msie 6/i)){h.style.position="absolute";h.style.cursor="hand"}for(f in c)if(c.hasOwnProperty(f))h.style[f]=c[f]}c=a.getSWFCSS();if(f=a._getDocument()){a.oMC=j(a.movieID)?j(a.movieID):document.createElement("div");if(a.oMC.id){b=a.oMC.className;a.oMC.className=(b?b+" ":a.swfCSS.swfDefault)+(c?" "+c:"");a.oMC.appendChild(d);if(a.isIE){c=a.oMC.appendChild(document.createElement("div"));c.className="sm2-object-box";c.innerHTML=i}a._appendSuccess=true}else{a.oMC.id=a.movieID; a.oMC.className=a.swfCSS.swfDefault+" "+c;c=null;b=a.useHighPerformance?{position:"fixed",width:"6px",height:"6px",bottom:"0px",left:"0px",overflow:"hidden"}:{position:"absolute",width:"6px",height:"6px",top:"-9999px",left:"-9999px"};e=null;if(!a.debugFlash)for(e in b)if(b.hasOwnProperty(e))a.oMC.style[e]=b[e];try{a.isIE||a.oMC.appendChild(d);f.appendChild(a.oMC);if(a.isIE){c=a.oMC.appendChild(document.createElement("div"));c.className="sm2-object-box";c.innerHTML=i}a._appendSuccess=true}catch(q){throw new Error(a._str("appXHTML")); }}if(a.debugMode&&!j(a.debugID)&&(!a._hasConsole||!a.useConsole||a.useConsole&&a._hasConsole&&!a.consoleOnly)){i=document.createElement("div");i.id=a.debugID;i.style.display=a.debugMode?"block":"none";if(a.debugMode&&!j(h.id)){try{f.appendChild(h)}catch(r){throw new Error(a._str("appXHTML"));}f.appendChild(i)}}}};this._writeDebug=function(c,b,d){var e,f;if(!a.debugMode)return false;if(typeof d!=="undefined"&&d)c=c+" | "+(new Date).getTime();if(a._hasConsole&&a.useConsole){d=a._debugLevels[b];typeof console[d]!== "undefined"?console[d](c):console.log(c);if(a.useConsoleOnly)return true}try{e=j("soundmanager-debug");if(!e)return false;f=document.createElement("div");if(++a._wdCount%2===0)f.className="sm2-alt";b=typeof b==="undefined"?0:parseInt(b,10);f.appendChild(document.createTextNode(c));if(b){if(b>=2)f.style.fontWeight="bold";if(b===3)f.style.color="#ff3333"}e.insertBefore(f,e.firstChild)}catch(i){}};this._writeDebug._protected=true;this._wdCount=0;this._wdCount._protected=true;this._wD=this._writeDebug; this._wDS=function(c){if(!c)return""};this._wDS._protected=true;this._wDAlert=function(c){alert(c)};if(g.location.href.indexOf("debug=alert")+1&&a.debugMode)a._wD=a._wDAlert;this._toggleDebug=function(){var c=j(a.debugID),b=j(a.debugID+"-toggle");if(!c)return false;if(a._debugOpen){b.innerHTML="+";c.style.display="none"}else{b.innerHTML="-";c.style.display="block"}a._debugOpen=!a._debugOpen};this._toggleDebug._protected=true;this._debug=function(){for(var c=0,b=a.soundIDs.length;c<b;c++)a.sounds[a.soundIDs[c]]._debug()}; this._debugTS=function(c,b,d){if(typeof sm2Debugger!=="undefined")try{sm2Debugger.handleEvent(c,b,d)}catch(e){}};this._debugTS._protected=true;this._mergeObjects=function(c,b){var d={},e,f;for(e in c)if(c.hasOwnProperty(e))d[e]=c[e];c=typeof b==="undefined"?a.defaultOptions:b;for(f in c)if(c.hasOwnProperty(f)&&typeof d[f]==="undefined")d[f]=c[f];return d};this.go=this.createMovie=function(c){if(c)a.url=c;a._initMovie()};this._initMovie=function(){if(a.o)return false;a.o=a.getMovie(a.id);if(!a.o){if(a.oRemoved){if(a.isIE)a.oMC.innerHTML= a.oRemovedHTML;else a.oMC.appendChild(a.oRemoved);a.oRemoved=null;a._didAppend=true}else a._createMovie(a.id,a.url);a.o=a.getMovie(a.id)}typeof a.oninitmovie==="function"&&setTimeout(a.oninitmovie,1)};this.waitForExternalInterface=function(){if(a._waitingForEI)return false;a._waitingForEI=true;if(a._tryInitOnFocus&&!a._isFocused)return false;var c;a._didInit||(c=a.getMoviePercent());setTimeout(function(){c=a.getMoviePercent();a._didInit||a._debugTS("flashtojs",false,": Timed out"+a._overHTTP?" (Check flash security or flash blockers)": " (No plugin/missing SWF?)");if(!a._didInit&&a._okToDisable)if(c)a.flashLoadTimeout!==0&&a._failSafely(true);else if(a.handleFlashBlock||a.flashLoadTimeout===0)a.handleFlashBlock&&a.flashBlockHandler();else a._failSafely(true)},a.flashLoadTimeout)};this.getSWFCSS=function(){var c=[];a.debugMode&&c.push(a.swfCSS.sm2Debug);a.debugFlash&&c.push(a.swfCSS.flashDebug);a.useHighPerformance&&c.push(a.swfCSS.highPerf);return c.join(" ")};this.flashBlockHandler=function(){if(a.supported())a.oMC.className=a.getSWFCSS()+ " "+a.swfCSS.swfDefault+(" "+a.swfCSS.swfUnblocked);else{a.oMC.className=a.getSWFCSS()+" "+a.swfCSS.swfDefault+" "+a.swfCSS.swfTimeout;a._processOnReady(true);a.onerror instanceof Function&&a.onerror.apply(g);a.didFlashBlock=true}};this.getMoviePercent=function(){return a.o&&typeof a.o.PercentLoaded!=="undefined"?a.o.PercentLoaded():null};this.handleFocus=function(){if(a._isFocused||!a._tryInitOnFocus)return true;a._okToDisable=true;a._isFocused=true;a._tryInitOnFocus&&g.removeEventListener("mousemove", a.handleFocus,false);a._waitingForEI=false;setTimeout(a.waitForExternalInterface,500);if(g.removeEventListener)g.removeEventListener("focus",a.handleFocus,false);else g.detachEvent&&g.detachEvent("onfocus",a.handleFocus)};this.initComplete=function(c){if(a._didInit)return false;if(!(a.handleFlashBlock&&a.flashLoadTimeout&&!a.getMoviePercent()))a._didInit=true;if(a._disabled||c){a.oMC.className=a.getSWFCSS()+" "+a.swfCSS.swfTimeout;a._processOnReady();a._debugTS("onload",false);a.onerror instanceof Function&&a.onerror.apply(g);return false}else a._debugTS("onload",true);if(a.waitForWindowLoad&&!a._windowLoaded){if(g.addEventListener)g.addEventListener("load",a._initUserOnload,false);else g.attachEvent&&g.attachEvent("onload",a._initUserOnload);return false}else a._initUserOnload()};this._addOnReady=function(c,b){a._onready.push({method:c,scope:b||null,fired:false})};this._processOnReady=function(c){if(!a._didInit&&!c)return false;c={success:c?a.supported():!a._disabled};var b=[],d,e,f=!a.handleFlashBlock|| a.handleFlashBlock&&!a.supported();d=0;for(e=a._onready.length;d<e;d++)a._onready[d].fired!==true&&b.push(a._onready[d]);if(b.length){d=0;for(e=b.length;d<e;d++){b[d].scope?b[d].method.apply(b[d].scope,[c]):b[d].method(c);if(!f)b[d].fired=true}}};this._initUserOnload=function(){g.setTimeout(function(){a.handleFlashBlock&&a.flashBlockHandler();a._processOnReady();a.onload.apply(g)})};this.init=function(){a._initMovie();if(a._didInit)return false;if(g.removeEventListener)g.removeEventListener("load", a.beginDelayedInit,false);else g.detachEvent&&g.detachEvent("onload",a.beginDelayedInit);try{a.o._externalInterfaceTest(false);if(a.allowPolling)a._setPolling(true,a.useFastPolling?true:false);a.debugMode||a.o._disableDebug();a.enabled=true;a._debugTS("jstoflash",true)}catch(c){a._debugTS("jstoflash",false);a._failSafely(true);a.initComplete();return false}a.initComplete()};this.beginDelayedInit=function(){a._windowLoaded=true;setTimeout(a.waitForExternalInterface,500);setTimeout(a.beginInit,20)}; this.beginInit=function(){if(a._initPending)return false;a.createMovie();a._initMovie();return a._initPending=true};this.domContentLoaded=function(){document.removeEventListener&&document.removeEventListener("DOMContentLoaded",a.domContentLoaded,false);a.go()};this._externalInterfaceOK=function(){if(a.swfLoaded)return false;(new Date).getTime();a._debugTS("swf",true);a._debugTS("flashtojs",true);a.swfLoaded=true;a._tryInitOnFocus=false;a.isIE?setTimeout(a.init,100):a.init()};this._setSandboxType= function(c){var b=a.sandbox;b.type=c;b.description=b.types[typeof b.types[c]!=="undefined"?c:"unknown"];if(b.type==="localWithFile"){b.noRemote=true;b.noLocal=false}else if(b.type==="localWithNetwork"){b.noRemote=false;b.noLocal=true}else if(b.type==="localTrusted"){b.noRemote=false;b.noLocal=false}};this.reboot=function(){for(var c=a.soundIDs.length;c--;)a.sounds[a.soundIDs[c]].destruct();try{if(a.isIE)a.oRemovedHTML=a.o.innerHTML;a.oRemoved=a.o.parentNode.removeChild(a.o)}catch(b){}a.oRemovedHTML= null;a.oRemoved=null;a.enabled=false;a._didInit=false;k._waitingForEI=false;a._initPending=false;a._didAppend=false;a._appendSuccess=false;a._disabled=false;a.swfLoaded=false;a.soundIDs={};a.sounds=[];a.o=null;for(c=a._onready.length;c--;)a._onready[c].fired=false;g.setTimeout(k.beginDelayedInit,20)};this.destruct=function(){a.disable(true)};l=function(c){var b=this;this.sID=c.id;this.url=c.url;this._iO=this.instanceOptions=this.options=a._mergeObjects(c);this.pan=this.options.pan;this.volume=this.options.volume; this._lastURL=null;this._debug=function(){if(a.debugMode){var d=null,e=[],f,i;for(d in b.options)if(b.options[d]!==null)if(b.options[d]instanceof Function){f=b.options[d].toString();f=f.replace(/\s\s+/g," ");i=f.indexOf("{");e[e.length]=" "+d+": {"+f.substr(i+1,Math.min(Math.max(f.indexOf("\n")-1,64),64)).replace(/\n/g,"")+"... }"}else e[e.length]=" "+d+": "+b.options[d]}};this._debug();this.id3={};this.resetProperties=function(){b.bytesLoaded=null;b.bytesTotal=null;b.position=null;b.duration=null; b.durationEstimate=null;b.loaded=false;b.playState=0;b.paused=false;b.readyState=0;b.muted=false;b.didBeforeFinish=false;b.didJustBeforeFinish=false;b.isBuffering=false;b.instanceOptions={};b.instanceCount=0;b.peakData={left:0,right:0};b.waveformData={left:[],right:[]};b.eqData=[];b.eqData.left=[];b.eqData.right=[]};b.resetProperties();this.load=function(d){if(typeof d!=="undefined"){b._iO=a._mergeObjects(d);b.instanceOptions=b._iO}else{d=b.options;b._iO=d;b.instanceOptions=b._iO;if(b._lastURL&&b._lastURL!== b.url){b._iO.url=b.url;b.url=null}}if(typeof b._iO.url==="undefined")b._iO.url=b.url;if(b._iO.url===b.url&&b.readyState!==0&&b.readyState!==2)return false;b.url=b._iO.url;b._lastURL=b._iO.url;b.loaded=false;b.readyState=1;b.playState=0;try{if(a.flashVersion===8)a.o._load(b.sID,b._iO.url,b._iO.stream,b._iO.autoPlay,b._iO.whileloading?1:0);else{a.o._load(b.sID,b._iO.url,b._iO.stream?true:false,b._iO.autoPlay?true:false);b._iO.isMovieStar&&b._iO.autoLoad&&!b._iO.autoPlay&&b.pause()}}catch(e){a._debugTS("onload", false);a.onerror();a.disable()}};this.unload=function(){if(b.readyState!==0){b.readyState!==2&&b.setPosition(0,true);a.o._unload(b.sID,a.nullURL);b.resetProperties()}};this.destruct=function(){a.o._destroySound(b.sID);a.destroySound(b.sID,true)};this.start=this.play=function(d){d||(d={});b._iO=a._mergeObjects(d,b._iO);b._iO=a._mergeObjects(b._iO,b.options);b.instanceOptions=b._iO;if(b.playState===1){d=b._iO.multiShot;if(!d)return false}if(!b.loaded)if(b.readyState===0){b._iO.autoPlay=true;b.load(b._iO)}else if(b.readyState=== 2)return false;if(b.paused)b.resume();else{b.playState=1;if(!b.instanceCount||a.flashVersion>8)b.instanceCount++;b.position=typeof b._iO.position!=="undefined"&&!isNaN(b._iO.position)?b._iO.position:0;b._iO.onplay&&b._iO.onplay.apply(b);b.setVolume(b._iO.volume,true);b.setPan(b._iO.pan,true);a.o._start(b.sID,b._iO.loop||1,a.flashVersion===9?b.position:b.position/1E3)}};this.stop=function(d){if(b.playState===1){b.playState=0;b.paused=false;b._iO.onstop&&b._iO.onstop.apply(b);a.o._stop(b.sID,d);b.instanceCount= 0;b._iO={}}};this.setPosition=function(d){if(typeof d==="undefined")d=0;d=Math.min(b.duration,Math.max(d,0));b._iO.position=d;a.o._setPosition(b.sID,a.flashVersion===9?b._iO.position:b._iO.position/1E3,b.paused||!b.playState)};this.pause=function(){if(b.paused||b.playState===0)return false;b.paused=true;a.o._pause(b.sID);b._iO.onpause&&b._iO.onpause.apply(b)};this.resume=function(){if(!b.paused||b.playState===0)return false;b.paused=false;a.o._pause(b.sID);b._iO.onresume&&b._iO.onresume.apply(b)}; this.togglePause=function(){if(b.playState===0){b.play({position:a.flashVersion===9?b.position:b.position/1E3});return false}b.paused?b.resume():b.pause()};this.setPan=function(d,e){if(typeof d==="undefined")d=0;if(typeof e==="undefined")e=false;a.o._setPan(b.sID,d);b._iO.pan=d;if(!e)b.pan=d};this.setVolume=function(d,e){if(typeof d==="undefined")d=100;if(typeof e==="undefined")e=false;a.o._setVolume(b.sID,a.muted&&!b.muted||b.muted?0:d);b._iO.volume=d;if(!e)b.volume=d};this.mute=function(){b.muted= true;a.o._setVolume(b.sID,0)};this.unmute=function(){b.muted=false;a.o._setVolume(b.sID,typeof b._iO.volume!=="undefined"?b._iO.volume:b.options.volume)};this.toggleMute=function(){b.muted?b.unmute():b.mute()};this._whileloading=function(d,e,f){if(b._iO.isMovieStar){b.bytesLoaded=d;b.bytesTotal=e;b.duration=Math.floor(f);b.durationEstimate=b.duration}else{b.bytesLoaded=d;b.bytesTotal=e;b.duration=Math.floor(f);b.durationEstimate=parseInt(b.bytesTotal/b.bytesLoaded*b.duration,10);if(b.durationEstimate=== undefined)b.durationEstimate=b.duration}b.readyState!==3&&b._iO.whileloading&&b._iO.whileloading.apply(b)};this._onid3=function(d,e){var f=[],i,h;i=0;for(h=d.length;i<h;i++)f[d[i]]=e[i];b.id3=a._mergeObjects(b.id3,f);b._iO.onid3&&b._iO.onid3.apply(b)};this._whileplaying=function(d,e,f,i,h){if(isNaN(d)||d===null)return false;if(b.playState===0&&d>0)d=0;b.position=d;if(a.flashVersion>8){if(b._iO.usePeakData&&typeof e!=="undefined"&&e)b.peakData={left:e.leftPeak,right:e.rightPeak};if(b._iO.useWaveformData&& typeof f!=="undefined"&&f)b.waveformData={left:f.split(","),right:i.split(",")};if(b._iO.useEQData)if(typeof h!=="undefined"&&h.leftEQ){d=h.leftEQ.split(",");b.eqData=d;b.eqData.left=d;if(typeof h.rightEQ!=="undefined"&&h.rightEQ)b.eqData.right=h.rightEQ.split(",")}}if(b.playState===1){b.isBuffering&&b._onbufferchange(0);b._iO.whileplaying&&b._iO.whileplaying.apply(b);b.loaded&&b._iO.onbeforefinish&&b._iO.onbeforefinishtime&&!b.didBeforeFinish&&b.duration-b.position<=b._iO.onbeforefinishtime&&b._onbeforefinish()}}; this._onload=function(d){d=d===1?true:false;b.loaded=d;b.readyState=d?3:2;b._iO.onload&&b._iO.onload.apply(b)};this._onbeforefinish=function(){if(!b.didBeforeFinish){b.didBeforeFinish=true;b._iO.onbeforefinish&&b._iO.onbeforefinish.apply(b)}};this._onjustbeforefinish=function(){if(!b.didJustBeforeFinish){b.didJustBeforeFinish=true;b._iO.onjustbeforefinish&&b._iO.onjustbeforefinish.apply(b)}};this._onfinish=function(){b._iO.onbeforefinishcomplete&&b._iO.onbeforefinishcomplete.apply(b);b.didBeforeFinish= false;b.didJustBeforeFinish=false;if(b.instanceCount){b.instanceCount--;if(!b.instanceCount){b.playState=0;b.paused=false;b.instanceCount=0;b.instanceOptions={}}if(!b.instanceCount||b._iO.multiShotEvents)b._iO.onfinish&&b._iO.onfinish.apply(b)}};this._onmetadata=function(d){if(!d.width&&!d.height){d.width=320;d.height=240}b.metadata=d;b.width=d.width;b.height=d.height;b._iO.onmetadata&&b._iO.onmetadata.apply(b)};this._onbufferchange=function(d){if(b.playState===0)return false;if(d===b.isBuffering)return false; b.isBuffering=d===1?true:false;b._iO.onbufferchange&&b._iO.onbufferchange.apply(b)};this._ondataerror=function(){b.playState>0&&b._iO.ondataerror&&b._iO.ondataerror.apply(b)}};this._onfullscreenchange=function(c){a.isFullScreen=c===1?true:false;if(!a.isFullScreen)try{g.focus()}catch(b){}};if(g.addEventListener){g.addEventListener("focus",a.handleFocus,false);g.addEventListener("load",a.beginDelayedInit,false);g.addEventListener("unload",a.destruct,false);a._tryInitOnFocus&&g.addEventListener("mousemove", a.handleFocus,false)}else if(g.attachEvent){g.attachEvent("onfocus",a.handleFocus);g.attachEvent("onload",a.beginDelayedInit);g.attachEvent("unload",a.destruct)}else{a._debugTS("onload",false);k.onerror();k.disable()}document.addEventListener&&document.addEventListener("DOMContentLoaded",a.domContentLoaded,false)}var k=null;if(typeof SM2_DEFER==="undefined"||!SM2_DEFER)k=new n;g.SoundManager=n;g.soundManager=k})(window);