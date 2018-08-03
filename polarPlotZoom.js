var margin = {top: -5, right: -5, bottom: -5, left: -5},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2 - 30;
console.log("radius = " + radius);

var reMap = function(oldValue) {
  var oldMin = 0,
      oldMax = -359,
      newMin = 0,
      newMax = (Math.PI * 2),
      newValue = (((oldValue - 90 - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;  
  return newValue;  
}

var reMapRadius = function(oldValue) {
  var newValue =  radius/70 * oldValue;
  return newValue;  
}

var data = [
  [reMap(25), reMapRadius(45.0609), 1, '', 2],
  [reMap(25.1), reMapRadius(45.0609), 1, '', 2],
  [reMap(25.2), reMapRadius(45.0609), 1, '', 2],
  [reMap(25.3), reMapRadius(45.0609), 1, '', 2],
  [reMap(25.4), reMapRadius(45.0609), 1, '', 2],
  [reMap(25.5), reMapRadius(45.0609), 1, '', 2],
  [reMap(26), reMapRadius(45.0609), 1, '', 2],
  [reMap(27), reMapRadius(45.0609), 1, '', 2],
  [reMap(28), reMapRadius(45.0609), 1, '', 2],
  [reMap(105), reMapRadius(20.2042), 1, '', 1],
  [reMap(106), reMapRadius(20.2042), 1, '', 3],
  [reMap(106.1), reMapRadius(20.2042), 1, '', 3],
  [reMap(106.2), reMapRadius(20.2042), 1, '', 3],
  [reMap(106.3), reMapRadius(20.2042), 1, '', 3],
  [reMap(106.4), reMapRadius(20.2042), 1, '', 3],
  [reMap(106.5), reMapRadius(20.2042), 1, '', 3],
  [reMap(106.6), reMapRadius(20.2042), 1, '', 3],
  [reMap(266), reMapRadius(20.2042), 1, '', 1],
  [reMap(8), reMapRadius(320.2042), 1, '', 1],
  [reMap(189), reMapRadius(45.0609), 1, '', 2],
  [reMap(350), reMapRadius(45.0609), 1, '', 2],
  [reMap(119), reMapRadius(45.0609), 1, '', 2],
  [reMap(305), reMapRadius(45.0609), 1, '', 2]
];

var color = d3.scale.category10();

// radius of the whole chart
var r = d3.scale.linear()
    .domain([0, radius])
    .range([0, radius]);

var r2 = d3.scale.linear()
    .domain([0, radius])
    .range([0, radius/5]);

var line = d3.svg.line.radial()
    .radius(function(d) {
      return r(d[1]);
    })
    .angle(function(d) {
      return -d[0] + Math.PI / 2;
    });

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("a simple tooltip");


var zoom = d3.behavior.zoom()
    .center([width / 2, height / 2])
    .scaleExtent([1, 100])
    .on("zoom", zoomed);


//var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

//var svg = d3.select("body").append("svg")
var svg = d3.select("#div_svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
  .call(zoom);

var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "white")
    .style("pointer-events", "all");

var container = svg.append("g");
var container2= svg.append("g");


container.append("g")
    .attr("class", "axis")
    .selectAll("circle")
    .data(r.ticks(1).slice(1))
    .enter().append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", r);

container.append("g")
    .attr("class", "axis")
    .selectAll("circle")
    .data(r2.ticks(1).slice(1))
    .enter().append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", r2);

container2.selectAll('point')
  .data(data)
  .enter()
  .append('circle')
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr('class', 'point')
  .attr('transform', function(d) {
    //console.log(d);
    var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
    return 'translate(' + coors + ')'
  })
  .attr('r',1)
  // .attr('r', function(d) {
  // console.log("2 - d[2] = " + d[2])
  //   return 1;
  // })
  .attr('fill',function(d,i){
    return color(d[4]);
  }).on("click", function(d){
    console.log(d);    
    //return tooltip.style("visibility", "visible");
  });

// var center = svg.append("circle")
//     .style("fill", "red")
//     .attr("cx", width / 2)
//     .attr("cy", height / 2)
//     .attr("r",5);

function zoomed() {
  //container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  
container.attr("transform",
       "translate(" + zoom.translate() + ")" +
       "scale(" + zoom.scale() + ")"
   );
    // var points = d3.selectAll("point")
    // 					.attr("r", 0.001*zoom.scale());
  //container2.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
 container2.attr("transform",
       "translate(" + zoom.translate() + ")" +
       "scale(" + zoom.scale() + ")"
   );
  
    //container2.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  
// container2.selectAll('circle').attr('r', function (d, i)
//   {
//     console.log("r = " + d3.select(this).attr('r'));
//     return d3.select(this).attr('r');
//   });
  

  
  //console.log(d3.event.scale);
  console.log(zoom.scale())
  container2.selectAll('circle')
  .attr('transform', function(d) {
    //console.log(d);
    var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
    return 'translate(' + coors + ')'
  })
  .attr('r', function(d) {
    return 1/(zoom.scale());
  });
  // .attr('r', function(d) {
  // console.log("3 - d[2] = " + d[2])
  //   return 1/(d3.event.scale);
  //    //return 1/(zoom.scale);
  // });
}

function interpolateZoom (translate, scale) {
    var self = this;
    return d3.transition().duration(350).tween("zoom", function () {
        var iTranslate = d3.interpolate(zoom.translate(), translate),
            iScale = d3.interpolate(zoom.scale(), scale);
        return function (t) {
            zoom
                .scale(iScale(t))
                .translate(iTranslate(t));
            zoomed();
        };
    });
}

function zoomClick(){
  //alert('zoom click');
      var clicked = d3.event.target,
        direction = 1,
        factor = 0.2,
        target_zoom = 1,
        center = [width / 2, height / 2],
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
        translate0 = [],
        l = [],
        view = {x: translate[0], y: translate[1], k: zoom.scale()};

    d3.event.preventDefault();
    direction = (this.id === 'zoom_in') ? 1 : -1;
    target_zoom = zoom.scale() * (1 + factor * direction);

    if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
    view.k = target_zoom;
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

    view.x += center[0] - l[0];
    view.y += center[1] - l[1];

    interpolateZoom([view.x, view.y], view.k);
}
d3.selectAll('button').on('click', zoomClick);