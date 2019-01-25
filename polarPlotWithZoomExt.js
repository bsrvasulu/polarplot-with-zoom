var margin = margin = {top: -5, right: -5, bottom: -5, left: -5}
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2 - 30;
console.log("radius = " + radius);
var padding = 20;
var brushFill = 'redBrushed';

var reMap = function(oldValue) {
  var oldMin = 0,
      oldMax = -359,
      newMin = 0,
      newMax = (Math.PI * 2),
      newValue = (((oldValue - 90 - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;  
  return newValue;  
}

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


var reMapRadius = function(oldValue) {
  var maxRadius = 46.355;
  var sFactor = radius/(46.355 + 18.5);
  //var newValue =  radius/71.355 * oldValue;
  var newValue =  sFactor * oldValue;
  return newValue;  
}
    
var dataJson = {"angle":[359.4125,359.4135,359.4146,359.4167,359.4178,359.4189,359.421,359.4221,359.4232,359.4242,359.4253,359.4264,359.4274,359.4285,359.4296,359.4306,359.4317,359.4328,359.4338,359.4349,359.436,359.4424,359.4435,359.4445,359.4456,359.4467,359.4488,359.4509,359.452,359.4531,359.4541,359.4563,359.4573,359.4584,359.4595,359.4605,359.4616,359.4627,359.4648,359.4659,359.467,359.468,359.4691,359.4702,359.4712,359.4723,359.4734,359.4744,359.4755,359.4766,359.4776,359.4787,359.4798,359.4958,359.5054,359.5065,359.5076,359.5086,359.5097,359.5108,359.5129,359.5257,359.6806,359.6817,359.6828,359.686,359.687,359.6881,359.6892,359.6902,359.6913,359.6924,359.6935,359.6945,359.6956,359.6967,359.6977,359.6988,359.6999,359.7009,359.7041,359.7052,359.7063,359.7073,359.7084,359.7095,359.7105,359.7116,359.7138,359.7148,359.7159,359.717,359.7202,359.7212,359.7223,359.7234,359.7244,359.7255,359.7266,359.7276,359.7287,359.7298,359.7308,359.7319,359.733,359.7341,359.7351,359.7383,359.7394,359.7405,359.7415,359.7426,359.7437,359.7447,359.7458,359.7469,359.7479,359.749,359.7501,359.7511,359.7522,359.7533,359.7661,359.7672,359.7682,359.7693,359.7704,359.7714,359.7725,359.7736,359.7747,359.7757,359.7768,359.7779,359.7789,359.78,359.7811,359.795,359.796,359.7971,359.7982,359.7992,359.8003,359.8014,359.8035,359.8056,359.8067,359.8078,359.8088,359.8099,359.811,359.812,359.8131,359.8142,359.8163,359.8174,359.8206,359.8217,359.8227,359.8249,359.8259,359.827,359.8281,359.8291,359.8302,359.8313,359.8323,359.8334,359.8345,359.8356,359.8366,359.842,359.843,359.8441,359.8452,359.8462,359.8473,359.8484,359.8494,359.8505,359.8537,359.8548,359.8558,359.8569,359.858,359.8591,359.8601,359.8623,359.8633,359.8644,359.8655,359.8665,359.8687,359.8697,359.8708,359.8719,359.8729,359.874,359.8751,359.8761,359.8783,359.8794,359.8804,359.8815,359.8826,359.8836,359.8847,359.8858,359.8868,359.8879,359.889,359.89,359.8911,359.8922,359.8932,359.9125,359.9135,359.9146,359.9157,359.9167,359.9178,359.9189,359.92,359.921,359.9328], "radius":[45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608,45.0608]};
// var ang = dataJson.angle;
// console.log('ang: ' + dataJson.angle[0]);
// console.log('rad: ' + dataJson.radius[0]);

// var data2 = [
//   [reMap(25), reMapRadius(45.0609), 5, 'theta: 25; r = 45.09', 2]
//   ];
// var data = [
//   [reMap(25), reMapRadius(45.0609), 5, 'theta: 25; r = 45.09', 2],
//   [reMap(25.1), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(25.2), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(25.3), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(25.4), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(25.5), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(26), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(27), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(28), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(105), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 1],
//   [reMap(106), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(106.1), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(106.2), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(106.3), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(106.4), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(106.5), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(106.6), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 3],
//   [reMap(266), reMapRadius(20.2042), 1, 'theta: 25; r = 45.09', 1],
//   [reMap(8), reMapRadius(320.2042), 1, 'theta: 25; r = 45.09', 1],
//   [reMap(189), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(350), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(119), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2],
//   [reMap(305), reMapRadius(45.0609), 1, 'theta: 25; r = 45.09', 2]
// ];

function convertData(jdata){
  var rdata = [];
  var ang = jdata.angle;
  var rad = jdata.radius;
  var i = 0;
  var tdata = [reMap(ang[i]), reMapRadius(rad[i]), 1, ' theta: ' + ang[i] + ' <br /> r = '       + rad[i] + ' ', 1, ang[i], rad[i]];
    rdata.push(tdata);
  console.log('theta: ' + ang[i] + '; r = '       + rad[i] + ' ');
  var lastAngle = null;
  for(i = 1; i < ang.length; i++){
     //if(rad[i] === rad[i-1] && (lastAngle !== null && ang[i] < lastAngle + 0.5)) continue;
    var tdata = [reMap(ang[i]), reMapRadius(rad[i]), 1, ' theta: ' + ang[i] + ' <br> r = '       + rad[i] + ' ', 1, ang[i], rad[i]];
    lastAngle = ang[i];
    rdata.push(tdata);
  }
  return rdata;
}

var data = convertData(dataJson);
//console.log(data);

var color = d3.scaleOrdinal(d3.schemeCategory10);

// radius of the whole chart
var r = d3.scaleLinear()
    .domain([0, radius])
    .range([0, radius]);

var r2 = d3.scaleLinear()
    .domain([0, radius])
    .range([0, radius/5]);

var line = d3.lineRadial()
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

var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended);//,
            //idleTimeout,
            //idleDelay = 350;

var zoom = d3.zoom()
    //.center([width / 2, height / 2])
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

var pts = container2.selectAll('point')
  .data(data)
  .enter()
  .append('circle')
  .attr("cx", function(d){
    console.log('cx: ' + width / 2);
    return width / 2;
  })
  .attr("cy", function(d){
    console.log('cy: ' + height / 2);
    return height / 2;
  })
  .attr('class', 'point')
  .attr('transform', function(d) {
    //console.log(d);
    var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
    var spCoors = coors.split(',');
    d[5] = parseInt(spCoors[0]);
    d[6] = parseInt(spCoors[1]);
    console.log('coors: ' + JSON.stringify(coors));
    console.log('d[5]: ' + JSON.stringify(d[5]));
    console.log('d[6]: ' + JSON.stringify(d[6]));
    return 'translate(' + coors + ')'
  })
  .attr('rx', function(d) {
    console.log('rx: ' + JSON.stringify(d[5]));
    return d[5];
  })
  .attr('ry', function(d) {
    return d[6];
  })
  // .attr("cx", function(d) {
  //   //console.log(d);
  //   var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
  //   console.log('cx: ' + coors[0]);
  //   return coors[0];
  // })
  // .attr("cy",  function(d) {
  //   //console.log(d);
  //   var coors = line([d]).slice(1).slice(0, -1); // removes 'M' and 'Z' from string
  //   console.log('cy: ' + coors[1]);
  //   return coors[1];
  // })
  .attr('r', 0.5)
  // .attr('r', function(d) {
  // console.log("2 - d[2] = " + d[2])
  //   return 1;
  // })
  .attr('fill',function(d,i){
    return color(d[4]);
  }).on("click", function(d){
    console.log(d); 
    d[4] = 5;
    d3.select(this).attr("fill", 'red');
    //return color(d[4]);
    //return tooltip.style("visibility", "visible");
  })
  .on("mouseover", function(d) {		
      div.transition()		
        .duration(200)		
        .style("opacity", .9);		
      div	.html(d[3])//"angle: " + d[5] + '<br />' + ' radius: ' + d[6])	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
  })					
  .on("mouseout", function(d) {		
      div.transition()		
        .duration(500)		
        .style("opacity", 0);	
  });

var brushArea = null;
// container2.append("g")
//   .attr("class", "brush")
//   .call(brush);

function isBrushed(brush_coords, cx, cy) {
  var x0 = brush_coords[0][0],
      x1 = brush_coords[1][0],
      y0 = brush_coords[0][1],
      y1 = brush_coords[1][1];
  console.log('isBrushed: ' + (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1));
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}
function brushended() {
    var s = d3.event.selection;
  console.log(d3.event.selection);
    if (d3.event.selection != null) {
      console.log('not null d3.event.selection');
      // revert circles to initial style
      //pts.attr("class", "non_brushed");
      var brush_coords = d3.brushSelection(this);
      // // style brushed circles
      pts.filter(function (){
        var cx = parseInt(d3.select(this).attr("rx")) + parseInt(d3.select(this).attr("cx")),
            cy = parseInt(d3.select(this).attr("ry")) + parseInt(d3.select(this).attr("cy"));
        console.log('cx: ' + JSON.stringify(cx));
        console.log('cy: ' + JSON.stringify(cy));
        return isBrushed(brush_coords, cx, cy);
      })
      .attr("class", function(){        
        return brushFill;
      });
    }
}

function zoomed() {
  //both forms works
  //container.attr("transform", d3.event.transform);
  //container2.attr("transform", d3.event.transform);
    container.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);
    container2.attr('transform', `translate(${d3.event.transform.x},  	 ${d3.event.transform.y}) scale(${d3.event.transform.k})`);  
  
  container2.selectAll('circle')
  .attr('transform', function(d) {
    var coors = line([d]).slice(1).slice(0, -1); 
    return 'translate(' + coors + ')'
  })
  .attr('r', function(d) {
    //var transform = d3.zoomTransform(container2);
    //console.log('transform.x: ' + transform.x)
    return 0.2;
  });  
}

// function zoomInClick(){
//   //container.transition().duration(1000).call(zoom.scaleBy, 2);
//   //container2.transition().duration(1000).call(zoom.scaleBy, 2);
//   zoom.scaleBy(container, 1.2);
//   zoom.scaleBy(container2, 1.2);
//   container.attr("transform", d3.event.transform);
//   container2.attr("transform", d3.event.transform);
  
//   // container.attr("transform", d3.event.transform);
//   // container2.attr("transform", d3.event.transform);
//   // container2.selectAll('circle')
//   // .attr('transform', function(d) {
//   //   var coors = line([d]).slice(1).slice(0, -1); 
//   //   return 'translate(' + coors + ')'
//   // })
//   // .attr('r', function(d) {
//   //   return 2;
//   // });
// }

// function zoomOutClick(){
//   container.transition().duration(1000).call(zoom.scaleBy, 0.9);
//   container2.transition().duration(1000).call(zoom.scaleBy, 0.8);
// }

// d3.select("#zoom_in").on('click', zoomInClick);
// d3.select("#zoom_out").on('click', zoomOutClick);

function transition(zoomLevel) {
  svg.transition()
      .delay(100)
      .duration(700)
      .call(zoom.scaleBy, zoomLevel);
      //.call(zoom.transform, transform);
      //.on("end", function() { canvas.call(transition); });
}

d3.selectAll('button').on('click', function() {
  if (this.id === 'zoom_in') {
    transition(1.2); // increase on 0.2 each time
  }
  if (this.id === 'zoom_out') {
    transition(0.8); // deacrease on 0.2 each time
  }
  if (this.id === 'zoom_init') {
    svg.transition()
        .delay(100)
        .duration(700)
        .call(zoom.scaleTo, 1); // return to initial state
  }
  if (this.id === 'stop-brush') {
    if(brushArea){
      container2.select(".brush").remove();
      brushArea = null;
    } else{
      //alert('brushArea - null');
   brushArea = container2.append("g")
      .attr("class", "brush")
      .call(brush);
    }
  }
});

function getColor(pattern){
  if(pattern === '1') brushFill = 'redBrushed';
  else if(pattern === '2') brushFill = 'greenBrushed';
}