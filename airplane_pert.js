
<!doctype html>
<html>
<head>
<script src="https://cdn.anychart.com/releases/8.2.1/js/anychart-base.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.2.1/themes/dark_blue.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.2.1/js/anychart-ui.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.2.1/js/anychart-exports.min.js"></script>
<script src="https://cdn.anychart.com/releases/8.2.1/js/anychart-pert.min.js"></script>
<link rel="stylesheet" href="https://cdn.anychart.com/releases/8.2.1/css/anychart-ui.min.css" />
<link rel="stylesheet" href="https://cdn.anychart.com/releases/8.2.1/fonts/css/anychart-font.min.css" />
<style>
html, body, #container {
width: 100%;
height: 100%;
margin: 0;
padding: 0;
}
</style>
</head>
<body>
<div id="container"></div>
<script type="text/javascript">
anychart.onDocumentReady(function() {
anychart.theme('darkBlue');
// data
var data = getData();

// set filling method for tree
var treeData = anychart.data.tree(data, 'as-table');

// create PERT chart
var chart = anychart.pert();
// set spacing between milestones
chart.data(treeData)
.horizontalSpacing('18.7%')
// set padding for chart
.padding([25, 50, 0, 50]);

// get duration project
var duration = chart.getStat('pertChartProjectDuration');

// set title text
chart.title()
.enabled(true)
.useHtml(true)
.padding([0, 0, 35, 0])
.text(
"Airplane Design Process with PERT Chart" +
"<br>" + "Project duration: " +
duration + ' days'
);

// set settings for tasks
var tasks = chart.tasks();
// format upper label task
tasks.upperLabels().format(function() {
return this.item.get('fullName');
});

// format lower label task
tasks.lowerLabels().format('{%duration} days');

// create tasks tooltip
var taskTooltip = tasks.tooltip();
// tooltip settings
taskTooltip.separator(true)
.titleFormat(function() {
// return fullName from data
return this.item.get('fullName');
});
taskTooltip.title().useHtml(true);

// set settings for milestones
var milestones = chart.milestones();
// set milestones color
milestones.color('#2C81D5')
// set milestones item size
.size('6.5%');
milestones.hovered().fill(function() {
return anychart.color.lighten(this.sourceColor, 0.25);
});
milestones.tooltip().format(defuaultMilesoneTooltipTextFormatter);

// set settings for critical milestones
var critMilestones = chart.criticalPath().milestones();
// format label
critMilestones.labels().format(function() {
return this['creator'] ? this['creator'].get('name') : this['isStart'] ? 'Start' : 'Finish';
});
// set color
critMilestones.color('#E24B26')
// fill color for critMilestones item
.fill(function() {
return this['creator'] ? this.sourceColor : this['isStart'] ? '#60727B' : '#60727B';
});

// hover fill/stroke color for critMilestones item
critMilestones.hovered()
.fill(function() {
return this['creator'] ? anychart.color.lighten(this.sourceColor, 0.25) : this['isStart'] ? '#60727b' : '#60727b';
})
.stroke(function() {
return this['creator'] ? '1.5 #a94e3d' : null;
});

// set container id for the chart
chart.container('container');
// initiate chart drawing
chart.draw();
});

function defuaultMilesoneTooltipTextFormatter() {
var result = '';
var i = 0;
if (this['successors'] && this['successors'].length) {
result += 'Successors:';
for (i = 0; i < this['successors'].length; i++) {
result += '\n - ' + this['successors'][i].get('fullName');
}
if (this['predecessors'] && this['predecessors'].length)
result += '\n\n';
}
if (this['predecessors'] && this['predecessors'].length) {
result += 'Predecessors:';
for (i = 0; i < this['predecessors'].length; i++) {
result += '\n - ' + this['predecessors'][i].get('fullName');
}
}
return result;
}

function getData() {
return [{
id: '1',
duration: 30,
name: '1',
fullName: 'Aerodynamics'
},
{
id: '2',
duration: 50,
name: '2',
fullName: 'Build & Test Model'
},
{
id: '3',
duration: 35,
name: '3',
fullName: 'Structure'
},
{
id: '4',
duration: 50,
name: '4',
dependsOn: ['1'],
fullName: 'Propulsion'
},
{
id: '5',
duration: 60,
name: '5',
dependsOn: ['2'],
fullName: 'Build Prototype'
},
{
id: '6',
duration: 40,
name: '6',
dependsOn: ['3'],
fullName: 'Control & Stability'
},
{
id: '7',
duration: 20,
name: '7',
dependsOn: ['4'],
fullName: 'Wind Tunnel'
},
{
id: '8',
duration: 20,
name: '8',
dependsOn: ['6'],
fullName: 'Computation'
},
{
id: '9',
duration: 45,
name: '9',
dependsOn: ['7'],
fullName: 'Review'
},
{
id: '10',
duration: 30,
name: '10',
dependsOn: ['8'],
fullName: 'Flight Simulation'
},
{
id: '11',
duration: 50,
name: '11',
dependsOn: ['9'],
fullName: 'Research flights'
},
{
id: '12',
duration: 45,
name: '12',
dependsOn: ['10'],
fullName: 'Revise & Review'
},
{
id: '13',
duration: 25,
name: '13',
dependsOn: ['5'],
fullName: 'Finalize'
}
]
}
</script>
</body>
</html>
