<#import "/spring.ftl" as spring />
<!doctype html>
<html lang="en">
<head>
    <base href="${basePath}">
	<meta charset="utf-8" />
	<title>Hystrix Monitor</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- d3 -->
    <script type="text/javascript" src="bower_components/d3/d3.min.js" ></script>

	<!-- Javascript to monitor and display -->
    <script type="text/javascript" src="<@spring.url '/webjars/jquery/2.1.1/jquery.min.js'/>" ></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/ng-knob/dist/ng-knob.min.js"></script>
    <script src="bower_components/angularjs-slider/dist/rzslider.min.js"></script>
    <link rel="stylesheet" type="text/css" href="bower_components/angularjs-slider/dist/rzslider.min.css"/>
    <script src="bower_components/angular-ui-switch/angular-ui-switch.min.js"></script>
    <link rel="stylesheet" type="text/css" href="bower_components/angular-ui-switch/angular-ui-switch.min.css"/>
    <link rel="stylesheet" href="/bower_components/angular-material/angular-material.css">
    <script src="bower_components/angular-aria/angular-aria.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-material/angular-material.js"></script>


    <script src="js/angular-app.js"></script>
	<!-- Our custom CSS -->
	<link rel="stylesheet" type="text/css" href="css/main.css" />

</head>
<body ng-app="myApp">
<div class="hystrix-dashbord">
    <div id="header">
        <h2><span id="title_name"></span></h2>
    </div>

    <div class="container">
        <div class="row">
            <div class="menubar">
                <div class="title">
                    Circuit
                </div>
                <div class="menu_actions">
                    Sort:
                    <a href="javascript://" onclick="hystrixMonitor.sortByErrorThenVolume();">Error then Volume</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortAlphabetically();">Alphabetical</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByVolume();">Volume</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByError();">Error</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByLatencyMean();">Mean</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByLatencyMedian();">Median</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByLatency90();">90</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByLatency99();">99</a> |
                    <a href="javascript://" onclick="hystrixMonitor.sortByLatency995();">99.5</a>
                </div>
                <div class="menu_legend">
                    <span class="success">Success</span> | <span class="shortCircuited">Short-Circuited</span> | <span
                        class="badRequest"> Bad Request</span> | <span class="timeout">Timeout</span> | <span
                        class="rejected">Rejected</span> | <span class="failure">Failure</span> | <span
                        class="errorPercentage">Error %</span>
                </div>
            </div>
        </div>
        <div id="dependencies" class="row dependencies"><span class="loading">Loading ...</span></div>

        <div class="spacer"></div>

        <div class="row">
            <div class="menubar">
                <div class="title">
                    Thread Pools
                </div>
                <div class="menu_actions">
                    Sort: <a href="javascript://" onclick="dependencyThreadPoolMonitor.sortAlphabetically();">Alphabetical</a>
                    |
                    <a href="javascript://" onclick="dependencyThreadPoolMonitor.sortByVolume();">Volume</a> |
                </div>
            </div>
        </div>
        <div id="dependencyThreadPools" class="row dependencyThreadPools"><span class="loading">Loading ...</span></div>
    </div>
</div>
<div ng-controller="knobCtrl">
    <ui-knob value="value" options="options"></ui-knob>
</div>
<div ng-controller="sliderCtrl">
    <rzslider rz-slider-model="value"></rzslider>
</div>
<div ng-controller="switchCtrl">
    <switch ng-model="enabled" class="green"></switch> {{enabled}}
</div>

<md-button class="md-fab" aria-label="FAB">
    <md-icon md-svg-src="images/power-symbol.svg"></md-icon>
</md-button>

<script>
    /**
     * Queue up the monitor to start once the page has finished loading.
     *
     * This is an inline script and expects to execute once on page load.
     */

            // commands
    var hystrixMonitor = new HystrixCommandMonitor('dependencies', {includeDetailIcon: false});
    var hostname = document.location.hostname;
    var stream = "http://" + hostname + ":3344/hystrix.stream";

    var commandStream = stream;
    var poolStream = stream;
    $('#title_name').text("Hystrix Stream: " + decodeURIComponent(stream));

    $(window).load(function () { // within load with a setTimeout to prevent the infinite spinner
        setTimeout(function () {
            // sort by error+volume by default
            hystrixMonitor.sortByErrorThenVolume();

            // start the EventSource which will open a streaming connection to the server
            var source = new EventSource(commandStream);

            // add the listener that will process incoming events
            source.addEventListener('message', hystrixMonitor.eventSourceMessageListener, false);

            source.addEventListener('error', function (e) {
                $("#dependencies .loading").html("Unable to connect to Command Metric Stream.");
                $("#dependencies .loading").addClass("failed");
                if (e.eventPhase == EventSource.CLOSED) {
                    // Connection was closed.
                    console.log("Connection was closed on error: " + JSON.stringify(e));
                } else {
                    console.log("Error occurred while streaming: " + JSON.stringify(e));
                }
            }, false);
        }, 0);
    });

    // thread pool
    var dependencyThreadPoolMonitor = new HystrixThreadPoolMonitor('dependencyThreadPools');

    $(window).load(function () { // within load with a setTimeout to prevent the infinite spinner
        setTimeout(function () {

            dependencyThreadPoolMonitor.sortByVolume();

            // start the EventSource which will open a streaming connection to the server
            var source = new EventSource(poolStream);

            // add the listener that will process incoming events
            source.addEventListener('message', dependencyThreadPoolMonitor.eventSourceMessageListener, false);

            source.addEventListener('error', function (e) {
                $("#dependencies .loading").html("Unable to connect to Command Metric Stream.");
                $("#dependencies .loading").addClass("failed");
                if (e.eventPhase == EventSource.CLOSED) {
                    // Connection was closed.
                    console.log("Connection was closed on error: " + e);
                } else {
                    console.log("Error occurred while streaming: " + e);
                }
            }, false);
        }, 0);
    });

    //Read a page's GET URL variables and return them as an associative array.
    // from: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
</script>
</body>
</html>
