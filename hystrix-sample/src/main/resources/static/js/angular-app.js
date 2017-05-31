"use strict";angular.module("myApp",["Poop"]),function(b){function c(e){var d=/^\s*?[\+-]?(\d*\.?\d*?)\s*?$/.exec(e);return!!(d&&d.length>0)&&d[1]}function a(e,f){var d=!1;return b.each(e,function(h,g){d||(d=g==f)}),d}b.tinysort={id:"TinySort",version:"1.0.5",copyright:"Copyright (c) 2008-2011 Ron Valstar",uri:"http://tinysort.sjeiti.com/",defaults:{order:"asc",attr:"",place:"start",returns:!1,useVal:!1}},b.fn.extend({tinysort:function(h,j){h&&"string"!=typeof h&&(j=h,h=null);var e=b.extend({},b.tinysort.defaults,j),p={};this.each(function(t){var v=h&&""!=h?b(this).find(h):b(this),u="rand"==e.order?""+Math.random():""==e.attr?e.useVal?v.val():v.text():v.attr(e.attr),s=b(this).parent();p[s]||(p[s]={s:[],n:[]}),v.length>0?p[s].s.push({s:u,e:b(this),n:t}):p[s].n.push({e:b(this),n:t})});for(var g in p)(d=p[g]).s.sort(function(t,s){var i=t.s.toLowerCase?t.s.toLowerCase():t.s,u=s.s.toLowerCase?s.s.toLowerCase():s.s;return c(t.s)&&c(s.s)&&(i=parseFloat(t.s),u=parseFloat(s.s)),("asc"==e.order?1:-1)*(i<u?-1:i>u?1:0)});var m=[];for(var g in p){var d=p[g],n=[],f=b(this).length;switch(e.place){case"first":b.each(d.s,function(s,t){f=Math.min(f,t.n)});break;case"org":b.each(d.s,function(s,t){n.push(t.n)});break;case"end":f=d.n.length;break;default:f=0}for(var q=[0,0],l=0;l<b(this).length;l++){var o=l>=f&&l<f+d.s.length;a(n,l)&&(o=!0);var r=(o?d.s:d.n)[q[o?0:1]].e;r.parent().append(r),!o&&e.returns||m.push(r.get(0)),q[o?0:1]++}}return this.pushStack(m)}}),b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort}(jQuery),function(window,undefined){var cache={};window.tmpl=function tmpl(str,data){try{var fn=/\W/.test(str)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+str.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):cache[str]=cache[str]||tmpl(document.getElementById(str).innerHTML);return data?fn(data):fn}catch(e){console.log(e)}}}(window);var app=angular.module("Poop",["ui.knob"]);app.controller("knobCtrl",function($scope){$scope.value=65,$scope.options={startAngle:30,endAngle:330,trackColor:"rgba(162,121,143,1)",barColor:"rgba(102,0,204,.5)",trackWidth:15,barWidth:15,subText:{enabled:!0,text:"Requests/second"},max:100,scale:{enabled:!0,type:"lines",width:3}}}),function(window){function getRelativePath(path){return location.pathname.slice(0,location.pathname.lastIndexOf("/")+1)+path}function log(message){console.log(message)}function addCommas(nStr){if((nStr+="").length<=3)return nStr;x=nStr.split("."),x1=x[0],x2=x.length>1?"."+x[1]:"";for(var rgx=/(\d+)(\d{3})/;rgx.test(x1);)x1=x1.replace(rgx,"$1,$2");return x1+x2}var htmlTemplate,htmlTemplateContainer;jQuery.get(getRelativePath("../templates/hystrixThreadPool/hystrixThreadPool.html"),function(data){htmlTemplate=data}),jQuery.get(getRelativePath("../templates/hystrixThreadPool/hystrixThreadPoolContainer.html"),function(data){htmlTemplateContainer=data}),window.HystrixThreadPoolMonitor=function(containerId){function preProcessData(data){validateData(data),data.escapedName=data.name.replace(/([ !"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,"\\$1"),converAllAvg(data),calcRatePerSecond(data)}function converAllAvg(data){convertAvg(data,"propertyValue_queueSizeRejectionThreshold",!1),convertAvg(data,"propertyValue_metricsRollingStatisticalWindowInMilliseconds",!1)}function convertAvg(data,key,decimal){data[key]=decimal?roundNumber(data[key]/data.reportingHosts):Math.floor(data[key]/data.reportingHosts)}function calcRatePerSecond(data){var numberSeconds=data.propertyValue_metricsRollingStatisticalWindowInMilliseconds/1e3,totalThreadsExecuted=data.rollingCountThreadsExecuted;totalThreadsExecuted<0&&(totalThreadsExecuted=0),data.ratePerSecond=roundNumber(totalThreadsExecuted/numberSeconds),data.ratePerSecondPerHost=roundNumber(totalThreadsExecuted/numberSeconds/data.reportingHosts)}function validateData(data){assertNotNull(data,"type"),assertNotNull(data,"name"),assertNotNull(data,"currentActiveCount"),assertNotNull(data,"currentCompletedTaskCount"),assertNotNull(data,"currentCorePoolSize"),assertNotNull(data,"currentLargestPoolSize"),assertNotNull(data,"currentMaximumPoolSize"),assertNotNull(data,"currentPoolSize"),assertNotNull(data,"currentQueueSize"),assertNotNull(data,"currentTaskCount"),assertNotNull(data,"rollingCountThreadsExecuted"),assertNotNull(data,"rollingMaxActiveThreads"),assertNotNull(data,"reportingHosts"),assertNotNull(data,"propertyValue_queueSizeRejectionThreshold"),assertNotNull(data,"propertyValue_metricsRollingStatisticalWindowInMilliseconds")}function assertNotNull(data,key){if(void 0==data[key]){if("dependencyOwner"!=key)throw new Error("Key Missing: "+key+" for "+data.name);data.dependencyOwner=data.name}}function displayThreadPool(data){try{preProcessData(data)}catch(err){return void log("Failed preProcessData: "+err.message)}data.addCommas=addCommas,data.roundNumber=roundNumber;var addNew=!1;if(!$("#THREAD_POOL_"+data.escapedName).length){var html=tmpl(htmlTemplateContainer,data);$("#"+containerId+" span.loading").remove(),$("#"+containerId+" div.last").removeClass("last"),$("#"+containerId).append(html),$("#"+containerId+" div.monitor").last().addClass("last"),d3.selectAll("#graph_THREAD_POOL_"+data.escapedName+" svg").append("svg:path"),addNew=!0}$("#THREAD_POOL_"+data.escapedName).attr("rate_value",data.ratePerSecondPerHost),$("#THREAD_POOL_"+data.escapedName+" div.monitor_data").html(tmpl(htmlTemplate,data));var rate=data.ratePerSecondPerHost,errorPercentage=data.currentQueueSize/data.reportingHosts;updateCircle("#THREAD_POOL_"+data.escapedName+" circle",rate,errorPercentage),addNew&&self.sortSameAsLast()}function roundNumber(num){var resultAsString=(Math.round(num*Math.pow(10,1))/Math.pow(10,1)).toString();if(-1==resultAsString.indexOf(".")){resultAsString+=".";for(var i=0;i<1;i++)resultAsString+="0"}return resultAsString}function updateCircle(cssTarget,rate,errorPercentage){var newXaxisForCircle=self.circleXaxis(rate);parseInt(newXaxisForCircle)>parseInt(maxXaxisForCircle)&&(newXaxisForCircle=maxXaxisForCircle);var newYaxisForCircle=self.circleYaxis(rate);parseInt(newYaxisForCircle)>parseInt(maxYaxisForCircle)&&(newYaxisForCircle=maxYaxisForCircle);var newRadiusForCircle=self.circleRadius(rate);parseInt(newRadiusForCircle)>parseInt(maxRadiusForCircle)&&(newRadiusForCircle=maxRadiusForCircle),d3.selectAll(cssTarget).transition().duration(400).attr("cy",newYaxisForCircle).attr("cx",newXaxisForCircle).attr("r",newRadiusForCircle).style("fill",self.colorRange(errorPercentage))}function deleteThreadPool(poolName){$("#THREAD_POOL_"+poolName).remove()}var self=this;this.containerId=containerId;var maxXaxisForCircle="40%",maxYaxisForCircle="40%",maxRadiusForCircle="125";self.circleRadius=d3.scale.pow().exponent(.5).domain([0,2e3]).range(["5",maxRadiusForCircle]),self.circleYaxis=d3.scale.linear().domain([0,2e3]).range(["30%",maxXaxisForCircle]),self.circleXaxis=d3.scale.linear().domain([0,2e3]).range(["30%",maxYaxisForCircle]),self.colorRange=d3.scale.linear().domain([10,25,40,50]).range(["green","#FFCC00","#FF9900","red"]),self.errorPercentageColorRange=d3.scale.linear().domain([0,10,35,50]).range(["grey","black","#FF9900","red"]),setInterval(function(){self.sortSameAsLast()},1e3),self.eventSourceMessageListener=function(e){var data=JSON.parse(e.data);data&&(data.reportingHosts||(data.reportingHosts=1),data&&"HystrixThreadPool"==data.type&&("true"==data.deleteData?deleteThreadPool(data.escapedName):displayThreadPool(data)))}},HystrixThreadPoolMonitor.prototype.sortByVolume=function(){var direction="desc";"rate_desc"==this.sortedBy&&(direction="asc"),this.sortByVolumeInDirection(direction)},HystrixThreadPoolMonitor.prototype.sortByVolumeInDirection=function(direction){this.sortedBy="rate_"+direction,$("#"+this.containerId+" div.monitor").tsort({order:direction,attr:"rate_value"})},HystrixThreadPoolMonitor.prototype.sortAlphabetically=function(){var direction="asc";"alph_asc"==this.sortedBy&&(direction="desc"),this.sortAlphabeticalInDirection(direction)},HystrixThreadPoolMonitor.prototype.sortAlphabeticalInDirection=function(direction){this.sortedBy="alph_"+direction,$("#"+this.containerId+" div.monitor").tsort("p.name",{order:direction})},HystrixThreadPoolMonitor.prototype.sortByMetricInDirection=function(direction,metric){$("#"+this.containerId+" div.monitor").tsort(metric,{order:direction})},HystrixThreadPoolMonitor.prototype.sortSameAsLast=function(){"alph_asc"==this.sortedBy?this.sortAlphabeticalInDirection("asc"):"alph_desc"==this.sortedBy?this.sortAlphabeticalInDirection("desc"):"rate_asc"==this.sortedBy?this.sortByVolumeInDirection("asc"):"rate_desc"==this.sortedBy?this.sortByVolumeInDirection("desc"):"error_asc"==this.sortedBy?this.sortByErrorInDirection("asc"):"error_desc"==this.sortedBy?this.sortByErrorInDirection("desc"):"lat90_asc"==this.sortedBy?this.sortByMetricInDirection("asc","p90"):"lat90_desc"==this.sortedBy?this.sortByMetricInDirection("desc","p90"):"lat99_asc"==this.sortedBy?this.sortByMetricInDirection("asc","p99"):"lat99_desc"==this.sortedBy?this.sortByMetricInDirection("desc","p99"):"lat995_asc"==this.sortedBy?this.sortByMetricInDirection("asc","p995"):"lat995_desc"==this.sortedBy?this.sortByMetricInDirection("desc","p995"):"latMean_asc"==this.sortedBy?this.sortByMetricInDirection("asc","pMean"):"latMean_desc"==this.sortedBy?this.sortByMetricInDirection("desc","pMean"):"latMedian_asc"==this.sortedBy?this.sortByMetricInDirection("asc","pMedian"):"latMedian_desc"==this.sortedBy&&this.sortByMetricInDirection("desc","pMedian")},HystrixThreadPoolMonitor.prototype.sortedBy="alph_asc"}(window),function(window){function getRelativePath(path){return location.pathname.slice(0,location.pathname.lastIndexOf("/")+1)+path}function log(message){console.log(message)}function addCommas(nStr){if((nStr+="").length<=3)return nStr;x=nStr.split("."),x1=x[0],x2=x.length>1?"."+x[1]:"";for(var rgx=/(\d+)(\d{3})/;rgx.test(x1);)x1=x1.replace(rgx,"$1,$2");return x1+x2}var hystrixTemplateCircuit,hystrixTemplateCircuitContainer,sparkline;jQuery.get(getRelativePath("../templates/hystrixCommand/hystrixCircuit.html"),function(data){hystrixTemplateCircuit=data}),jQuery.get(getRelativePath("../templates/hystrixCommand/hystrixCircuitContainer.html"),function(data){hystrixTemplateCircuitContainer=data}),window.HystrixCommandMonitor=function(containerId,args){function preProcessData(data){setIfMissing(data,"rollingCountBadRequests",0),validateData(data),data.escapedName=data.name.replace(/([ !"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g,"\\$1"),convertAllAvg(data),calcRatePerSecond(data)}function setIfMissing(data,key,defaultValue){void 0==data[key]&&(data[key]=defaultValue)}function convertAllAvg(data){convertAvg(data,"errorPercentage",!0),convertAvg(data,"latencyExecute_mean",!1),convertAvg(data,"latencyTotal_mean",!1)}function convertAvg(data,key,decimal){data[key]=getInstanceAverage(data[key],data.reportingHosts,decimal)}function getInstanceAverage(value,reportingHosts,decimal){return decimal?roundNumber(value/reportingHosts):Math.floor(value/reportingHosts)}function calcRatePerSecond(data){var numberSeconds=data.propertyValue_metricsRollingStatisticalWindowInMilliseconds/1e3,totalRequests=data.requestCount;totalRequests<0&&(totalRequests=0),data.ratePerSecond=roundNumber(totalRequests/numberSeconds),data.ratePerSecondPerHost=roundNumber(totalRequests/numberSeconds/data.reportingHosts)}function validateData(data){assertNotNull(data,"reportingHosts"),assertNotNull(data,"type"),assertNotNull(data,"name"),assertNotNull(data,"group"),assertNotNull(data,"isCircuitBreakerOpen"),assertNotNull(data,"errorPercentage"),assertNotNull(data,"errorCount"),assertNotNull(data,"requestCount"),assertNotNull(data,"rollingCountCollapsedRequests"),assertNotNull(data,"rollingCountExceptionsThrown"),assertNotNull(data,"rollingCountFailure"),assertNotNull(data,"rollingCountFallbackFailure"),assertNotNull(data,"rollingCountFallbackRejection"),assertNotNull(data,"rollingCountFallbackSuccess"),assertNotNull(data,"rollingCountResponsesFromCache"),assertNotNull(data,"rollingCountSemaphoreRejected"),assertNotNull(data,"rollingCountShortCircuited"),assertNotNull(data,"rollingCountSuccess"),assertNotNull(data,"rollingCountThreadPoolRejected"),assertNotNull(data,"rollingCountTimeout"),assertNotNull(data,"rollingCountBadRequests"),assertNotNull(data,"currentConcurrentExecutionCount"),assertNotNull(data,"latencyExecute_mean"),assertNotNull(data,"latencyExecute"),assertNotNull(data,"latencyTotal_mean"),assertNotNull(data,"latencyTotal"),assertNotNull(data,"propertyValue_circuitBreakerRequestVolumeThreshold"),assertNotNull(data,"propertyValue_circuitBreakerSleepWindowInMilliseconds"),assertNotNull(data,"propertyValue_circuitBreakerErrorThresholdPercentage"),assertNotNull(data,"propertyValue_circuitBreakerForceOpen"),assertNotNull(data,"propertyValue_circuitBreakerForceClosed"),assertNotNull(data,"propertyValue_executionIsolationStrategy"),assertNotNull(data,"propertyValue_executionIsolationThreadTimeoutInMilliseconds"),assertNotNull(data,"propertyValue_executionIsolationThreadInterruptOnTimeout"),assertNotNull(data,"propertyValue_executionIsolationSemaphoreMaxConcurrentRequests"),assertNotNull(data,"propertyValue_fallbackIsolationSemaphoreMaxConcurrentRequests"),assertNotNull(data,"propertyValue_requestCacheEnabled"),assertNotNull(data,"propertyValue_requestLogEnabled"),assertNotNull(data,"propertyValue_metricsRollingStatisticalWindowInMilliseconds")}function assertNotNull(data,key){if(void 0==data[key])throw new Error("Key Missing: "+key+" for "+data.name)}function displayCircuit(data){try{preProcessData(data)}catch(err){return void log("Failed preProcessData: "+err.message)}data.addCommas=addCommas,data.roundNumber=roundNumber,data.getInstanceAverage=getInstanceAverage;var addNew=!1;if(!$("#CIRCUIT_"+data.escapedName).length){void 0!=self.args.includeDetailIcon&&self.args.includeDetailIcon?data.includeDetailIcon=!0:data.includeDetailIcon=!1;var html=tmpl(hystrixTemplateCircuitContainer,data);$("#"+containerId+" span.loading").remove(),$("#"+containerId).append(html),d3.selectAll("#graph_CIRCUIT_"+data.escapedName+" svg").append("svg:path"),addNew=!0}$("#CIRCUIT_"+data.escapedName+" div.monitor_data").html(tmpl(hystrixTemplateCircuit,data));var ratePerSecond=data.ratePerSecond,ratePerSecondPerHostDisplay=data.ratePerSecondPerHost,errorThenVolume=1e8*data.errorPercentage+ratePerSecond;$("#CIRCUIT_"+data.escapedName).attr("rate_value",ratePerSecond),$("#CIRCUIT_"+data.escapedName).attr("error_then_volume",errorThenVolume),$("#CIRCUIT_"+data.escapedName+" a.errorPercentage").css("color",self.circuitErrorPercentageColorRange(data.errorPercentage)),updateCircle("circuit","#CIRCUIT_"+data.escapedName+" circle",ratePerSecondPerHostDisplay,data.errorPercentage),data.graphValues?updateSparkline("circuit","#CIRCUIT_"+data.escapedName+" path",data.graphValues):updateSparkline("circuit","#CIRCUIT_"+data.escapedName+" path",ratePerSecond),addNew&&self.sortSameAsLast()}function roundNumber(num){var resultAsString=(Math.round(num*Math.pow(10,1))/Math.pow(10,1)).toString();return-1==resultAsString.indexOf(".")&&(resultAsString+=".0"),resultAsString}function updateCircle(variablePrefix,cssTarget,rate,errorPercentage){var newXaxisForCircle=self[variablePrefix+"CircleXaxis"](rate);parseInt(newXaxisForCircle)>parseInt(maxXaxisForCircle)&&(newXaxisForCircle=maxXaxisForCircle);var newYaxisForCircle=self[variablePrefix+"CircleYaxis"](rate);parseInt(newYaxisForCircle)>parseInt(maxYaxisForCircle)&&(newYaxisForCircle=maxYaxisForCircle);var newRadiusForCircle=self[variablePrefix+"CircleRadius"](rate);parseInt(newRadiusForCircle)>parseInt(maxRadiusForCircle)&&(newRadiusForCircle=maxRadiusForCircle),d3.selectAll(cssTarget).transition().duration(400).attr("cy",newYaxisForCircle).attr("cx",newXaxisForCircle).attr("r",newRadiusForCircle).style("fill",self[variablePrefix+"ColorRange"](errorPercentage))}function updateSparkline(variablePrefix,cssTarget,newDataPoint){var currentTimeMilliseconds=(new Date).getTime(),data=self[variablePrefix+cssTarget+"_data"];for(void 0===data?(data="object"==typeof newDataPoint?newDataPoint:[{v:parseFloat(newDataPoint),t:currentTimeMilliseconds}],self[variablePrefix+cssTarget+"_data"]=data):"object"==typeof newDataPoint?data=newDataPoint:data.push({v:parseFloat(newDataPoint),t:currentTimeMilliseconds});data.length>200;)data.shift();if(1!=data.length||0!=data[0].v){data.length>1&&0==data[0].v&&0!=data[1].v&&data.shift();var xScale=d3.time.scale().domain([new Date(currentTimeMilliseconds-12e4),new Date(currentTimeMilliseconds)]).range([0,140]),yMin=d3.min(data,function(d){return d.v}),yMax=d3.max(data,function(d){return d.v}),yScale=d3.scale.linear().domain([yMin,yMax]).nice().range([60,0]);sparkline=d3.svg.line().x(function(d,i){return xScale(new Date(d.t))}).y(function(d){return yScale(d.v)}).interpolate("basis"),d3.selectAll(cssTarget).attr("d",sparkline(data))}}function deleteCircuit(circuitName){$("#CIRCUIT_"+circuitName).remove()}var self=this;self.args=args,void 0==self.args&&(self.args={}),this.containerId=containerId;var maxXaxisForCircle="40%",maxYaxisForCircle="40%",maxRadiusForCircle="125";self.circuitCircleRadius=d3.scale.pow().exponent(.5).domain([0,400]).range(["5",maxRadiusForCircle]),self.circuitCircleYaxis=d3.scale.linear().domain([0,400]).range(["30%",maxXaxisForCircle]),self.circuitCircleXaxis=d3.scale.linear().domain([0,400]).range(["30%",maxYaxisForCircle]),self.circuitColorRange=d3.scale.linear().domain([10,25,40,50]).range(["green","#FFCC00","#FF9900","red"]),self.circuitErrorPercentageColorRange=d3.scale.linear().domain([0,10,35,50]).range(["grey","black","#FF9900","red"]),setInterval(function(){self.sortSameAsLast()},1e4),self.eventSourceMessageListener=function(e){var data=JSON.parse(e.data);data&&(data.reportingHosts||(data.reportingHosts=1),data&&"HystrixCommand"==data.type&&("true"==data.deleteData?deleteCircuit(data.escapedName):displayCircuit(data)))}},HystrixCommandMonitor.prototype.sortByVolume=function(){var direction="desc";"rate_desc"==this.sortedBy&&(direction="asc"),this.sortByVolumeInDirection(direction)},HystrixCommandMonitor.prototype.sortByVolumeInDirection=function(direction){this.sortedBy="rate_"+direction,$("#"+this.containerId+" div.monitor").tsort({order:direction,attr:"rate_value"})},HystrixCommandMonitor.prototype.sortAlphabetically=function(){var direction="asc";"alph_asc"==this.sortedBy&&(direction="desc"),this.sortAlphabeticalInDirection(direction)},HystrixCommandMonitor.prototype.sortAlphabeticalInDirection=function(direction){this.sortedBy="alph_"+direction,$("#"+this.containerId+" div.monitor").tsort("p.name",{order:direction})},HystrixCommandMonitor.prototype.sortByError=function(){var direction="desc";"error_desc"==this.sortedBy&&(direction="asc"),this.sortByErrorInDirection(direction)},HystrixCommandMonitor.prototype.sortByErrorInDirection=function(direction){this.sortedBy="error_"+direction,$("#"+this.containerId+" div.monitor").tsort(".errorPercentage .value",{order:direction})},HystrixCommandMonitor.prototype.sortByErrorThenVolume=function(){var direction="desc";"error_then_volume_desc"==this.sortedBy&&(direction="asc"),this.sortByErrorThenVolumeInDirection(direction)},HystrixCommandMonitor.prototype.sortByErrorThenVolumeInDirection=function(direction){this.sortedBy="error_then_volume_"+direction,$("#"+this.containerId+" div.monitor").tsort({order:direction,attr:"error_then_volume"})},HystrixCommandMonitor.prototype.sortByLatency90=function(){var direction="desc";"lat90_desc"==this.sortedBy&&(direction="asc"),this.sortedBy="lat90_"+direction,this.sortByMetricInDirection(direction,".latency90 .value")},HystrixCommandMonitor.prototype.sortByLatency99=function(){var direction="desc";"lat99_desc"==this.sortedBy&&(direction="asc"),this.sortedBy="lat99_"+direction,this.sortByMetricInDirection(direction,".latency99 .value")},HystrixCommandMonitor.prototype.sortByLatency995=function(){var direction="desc";"lat995_desc"==this.sortedBy&&(direction="asc"),this.sortedBy="lat995_"+direction,this.sortByMetricInDirection(direction,".latency995 .value")},HystrixCommandMonitor.prototype.sortByLatencyMean=function(){var direction="desc";"latMean_desc"==this.sortedBy&&(direction="asc"),this.sortedBy="latMean_"+direction,this.sortByMetricInDirection(direction,".latencyMean .value")},HystrixCommandMonitor.prototype.sortByLatencyMedian=function(){var direction="desc";"latMedian_desc"==this.sortedBy&&(direction="asc"),this.sortedBy="latMedian_"+direction,this.sortByMetricInDirection(direction,".latencyMedian .value")},HystrixCommandMonitor.prototype.sortByMetricInDirection=function(direction,metric){$("#"+this.containerId+" div.monitor").tsort(metric,{order:direction})},HystrixCommandMonitor.prototype.sortSameAsLast=function(){"alph_asc"==this.sortedBy?this.sortAlphabeticalInDirection("asc"):"alph_desc"==this.sortedBy?this.sortAlphabeticalInDirection("desc"):"rate_asc"==this.sortedBy?this.sortByVolumeInDirection("asc"):"rate_desc"==this.sortedBy?this.sortByVolumeInDirection("desc"):"error_asc"==this.sortedBy?this.sortByErrorInDirection("asc"):"error_desc"==this.sortedBy?this.sortByErrorInDirection("desc"):"error_then_volume_asc"==this.sortedBy?this.sortByErrorThenVolumeInDirection("asc"):"error_then_volume_desc"==this.sortedBy?this.sortByErrorThenVolumeInDirection("desc"):"lat90_asc"==this.sortedBy?this.sortByMetricInDirection("asc",".latency90 .value"):"lat90_desc"==this.sortedBy?this.sortByMetricInDirection("desc",".latency90 .value"):"lat99_asc"==this.sortedBy?this.sortByMetricInDirection("asc",".latency99 .value"):"lat99_desc"==this.sortedBy?this.sortByMetricInDirection("desc",".latency99 .value"):"lat995_asc"==this.sortedBy?this.sortByMetricInDirection("asc",".latency995 .value"):"lat995_desc"==this.sortedBy?this.sortByMetricInDirection("desc",".latency995 .value"):"latMean_asc"==this.sortedBy?this.sortByMetricInDirection("asc",".latencyMean .value"):"latMean_desc"==this.sortedBy?this.sortByMetricInDirection("desc",".latencyMean .value"):"latMedian_asc"==this.sortedBy?this.sortByMetricInDirection("asc",".latencyMedian .value"):"latMedian_desc"==this.sortedBy&&this.sortByMetricInDirection("desc",".latencyMedian .value")},HystrixCommandMonitor.prototype.sortedBy="alph_asc"}(window);