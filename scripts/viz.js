/* Graph visualization with d3 */

function visualizeNet(){

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
	console.log("Link Source: " + link.source + " Link Target: " + link.target);
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});


 force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(300)
    .charge(-600)
    .on("tick", tick)
    .start();

 svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["link"])
  	.enter().append("marker")
    .attr("id", function(d) { return d; })
	.attr("viewBox", "0 -5 10 10")
	.attr("refX", 5)
	.attr("refY", -1.5)
	.attr("markerWidth", 6)
	.attr("markerHeight", 6)
	.attr("orient", "auto")
	.append("path")
	.attr("d", "M0,-5L10,0L0,5");


rect = svg.append("rect");

path = svg.append("g").selectAll("path")
    	.data(force.links())
  		.enter().append("path")
    	.attr("class", function(d) { return "link " + d.type; })
    	.attr("marker-mid", function(d) { return "url(#" + d.type + ")"; });

    
circle = svg.append("g").selectAll("circle")
		.data(force.nodes())
		.enter().append("circle")
		.call(force.drag)

text = svg.append("g").selectAll("text")
		.data(force.nodes())
		.enter().append("text")
		.text(function(d) { return d.name; })


var drag = force.drag()
    .on("dragstart", dragstart);

    return force;
}

function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}


function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}
