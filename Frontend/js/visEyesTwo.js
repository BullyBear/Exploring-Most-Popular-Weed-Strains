

// eyesBubble();


function eyesBubbleTwo() {


  //////////////////////////////////////// TOOLTIP CODE

// fornat tooltip
var formatTooltip = d3.format(",");



// create a tooltip
var tooltip = d3.select("#eyesBubble")
// var tooltip = d3.selectAll(".forceTransitionHappy")
// var tooltip = d3.selectAll(".node")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltipEyes")
    .style("font-size", "12px")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black")
    .style("width", "250px")
    .style("height", "100px")
    .style("position", "absolute")
    .style("z-index", "999999")


var width = 1000,
  height = 1000,
  padding = 1, // separation between same-color nodes
  clusterPadding = 3, // separation between different-color nodes
  maxRadius = 10;
  minRadius = 1;
  // maxRadius = 100;
  // minRadius = 14;



d3.csv("../static/data/leafly/Frontend/assets/data/eyes.csv", function(data) {
  //calculate teh maximum group present
  m = d3.max(data, function(d){return d.group});
  //create teh color categories
  color = d3.scale.category10()
  // color = d3.scaleOrdinal().range(d3.schemeCategory20)
  .domain(d3.range(m));
  //make teh clusters array each cluster for each group
  clusters = new Array(m);
  dataset = data.map(function(d) {
    //find teh radius intered in the csv
  var r = parseInt(d.radius);
   
    var dta = {
      cluster: d.group,//group
      name: d.name,//label
      radius: r,//radius
      city: d.city,
      phenotype: d.phenotype,
      Eyes: d.radius * 5,
      image: d.img_url_two,
      x: Math.cos(d.group / m * 2 * Math.PI) * 100 + width / 2 + Math.random(),
      y: Math.sin(d.group / m * 2 * Math.PI) * 100 + height / 2 + Math.random()
    };
    //add the one off the node inside teh cluster
    if (!clusters[d.group] || (d.radius > clusters[d.group].radius)) clusters[d.group] = dta;
    return dta;
  });
  //after mapping use that t make the graph
  makeGraph(dataset);
// });

//this will make the grapg from nodes
function makeGraph(nodes) {

  var pack = d3.layout.pack()
      .sort(null)
      .size([width, height])
      .children(function(d) { return d.values; })
      .value(function(d) { return d.radius * d.radius; })
      .nodes({values: d3.nest()
        .key(function(d) { return d.cluster; })
        .entries(nodes)});

  var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    // .gravity(.02)
    // .charge(0)
    .gravity(.1)
    // .gravity(.001)
    .charge(function(d) {
        if(d.radius == clusters[d.cluster].radius) {
          return(-10 * d.radius);
        }
        else {
          return(0);
        }
      })
    .on("tick", tick)
    .start();


  // var svg = d3.select("body")
  // var svg = d3.select("#eyesBubble").append("svg")
  var canvas = d3.select("#eyesBubble").append("canvas")
      .attr("class", "forceTransitionEyes")
      .attr("width", width)
      .attr("height", height)
      // .attr("viewBox", '0 -50  1000 1000')
      // .attr("viewBox", '0 -50  1250 1250')
      // .append("g")
      .attr("transform", "translate(" + -50+ "," + -150 + ")");
    // .attr("width", width)
    // .attr("height", height);

    var context = canvas.node().getContext("2d");

  // var node = svg.selectAll("circle")
  // var node = svg.selectAll(".nodeThree")
  //   .data(nodes)
  //   // .filter(function(d) { return !d.cluster; })
  //   .enter()
  //   .append("g")
  //   .attr("class", "nodeThree")
  //   .call(force.drag);

  // //addcircle to the group
  // node.append("circle")
  //   .attr("class", "circleThree")
  //   .style("fill", function(d) {
  //     return color(d.cluster);
  //   })
  //   .attr("r", function(d) {
  //     return d.radius
  //   })
    // .attr({r: function(d) { return(d.radius); },
    //       cx: function(d) { return(d.x); },
    //       cy: function(d) { return(d.y); },
    //     })


    //add text to the group    
  // node.append("text")
  //   .text(function(d) {
  //     return d.name;
  //   })
  //   .attr("dx", -10)
  //   .attr("dy", ".35em")
  //   .text(function(d) {
  //     return d.name
  //   })
  //   .style("stroke", "none");


    // node
    // .on("mousemove", function(d) {

    //             // if (d.image) {
    //             //   d3.select("#divImgurlFour").transition().duration(200).attr("src", d.image)
    //             // }

    //   var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
    //           "City:" + " " + d.city + "<br/>" +
    //           "Phenotype:" + " " + d.phenotype + "<br/>" +
    //           "Eyes:" + " " + formatTooltip(d.Eyes) + "<br/>"
    //           // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"

    //     tooltip.transition().duration(200).style("opacity", 1);      
    //     tooltip.html(htmlText)  
    //     // .style("left", (d3.event.pageX) + 15 + "px")    
    //     // .style("top", (d3.event.pageY - 28) + "px")
    //     // .style("left", "300px")    
    //     // .style("top", "300px")
    //     .style("left", (d3.mouse(this)[0] + 100) + "px")
    //     .style("top", (d3.mouse(this)[1] + 500) + "px")   
    // })                  
    // .on("mouseout", function(d) {      
    //     tooltip.transition().duration(500).style("opacity", 0);  
    // });





      // function tick(e) {
      //   // when use canvas, render from the blank canvas on each tick
      //   context.clearRect(0, 0, width, height)
      //   for (node of nodes) {
      //     // apply forces calculations
      //     cluster(10 * e.alpha * e.alpha)(node)
      //     collide(.1)(node)

      //     // render a node on the canvas
      //     context.beginPath();
      //     context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, true);
      //     context.fillStyle = color(node.cluster)
      //     context.fill();
      //     context.closePath();
      //   }

      // }



      function tick(e) {
        context.clearRect(0, 0, width, height)
        const clusterFn = cluster(10 * e.alpha * e.alpha)
        const collideFn = collide(.1)
        for (node of nodes) {
          clusterFn(node)
          collideFn(node)
          context.beginPath();
          context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, true);
          context.fillStyle = color(node.cluster)
          context.fill();
          context.closePath();
        }
      }


  // Move d to be adjacent to the cluster node.
  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }

  // Resolves collisions between d and all other circles.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

}


})


}; 





function eyesLeaveTwo() {



  //////////////////////////////////////// TOOLTIP CODE

// fornat tooltip
var formatTooltip = d3.format(",");


// create a tooltip
var tooltip = d3.select("#eyesBubble")
// var tooltip = d3.selectAll(".forceTransitionHappy")
// var tooltip = d3.selectAll(".node")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltipEyesTwo")
    .style("font-size", "12px")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black")
    .style("width", "250px")
    .style("height", "100px")
    .style("position", "absolute")
    .style("z-index", "999999")


var width = 1000,
  height = 1000,
  padding = 1, // separation between same-color nodes
  clusterPadding = 3, // separation between different-color nodes
  maxRadius = 10;
  minRadius = 1;
  // maxRadius = 100;
  // minRadius = 14;



d3.csv("../static/data/leafly/Frontend/assets/data/eyes.csv", function(data) {
  //calculate teh maximum group present
  m = d3.max(data, function(d){return d.group});
  //create teh color categories
  color = d3.scale.category10()
  // color = d3.scaleOrdinal().range(d3.schemeCategory20)
  .domain(d3.range(m));
  //make teh clusters array each cluster for each group
  clusters = new Array(m);
  dataset = data.map(function(d) {
    //find teh radius intered in the csv
  var r = parseInt(d.radius);
   
    var dta = {
      cluster: d.group,//group
      name: d.name,//label
      radius: r,//radius
      city: d.city,
      phenotype: d.phenotype,
      Eyes: d.radius * 5,
      image: d.img_url_two,
      x: Math.cos(d.group / m * 2 * Math.PI) * 100 + width / 2 + Math.random(),
      y: Math.sin(d.group / m * 2 * Math.PI) * 100 + height / 2 + Math.random()
    };
    //add the one off the node inside teh cluster
    if (!clusters[d.group] || (d.radius > clusters[d.group].radius)) clusters[d.group] = dta;
    return dta;
  });
  //after mapping use that t make the graph
  makeGraph(dataset);
// });

//this will make the grapg from nodes
function makeGraph(nodes) {

  var pack = d3.layout.pack()
      .sort(null)
      .size([width, height])
      .children(function(d) { return d.values; })
      .value(function(d) { return d.radius * d.radius; })
      .nodes({values: d3.nest()
        .key(function(d) { return d.cluster; })
        .entries(nodes)});

  var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    // .gravity(.02)
    // .charge(0)
    .gravity(.1)
    // .gravity(.001)
    .charge(function(d) {
        if(d.radius == clusters[d.cluster].radius) {
          return(-10 * d.radius);
        }
        else {
          return(0);
        }
      })
    .on("tick", tick)
    .start();


  // var svg = d3.select("body")
  // var svg = d3.select("#eyesBubble").append("svg")
  var canvas = d3.select("#eyesBubble").append("canvas")
      .attr("class", "forceTransitionEyesTwo")
      .attr("width", width)
      .attr("height", height)
      // .attr("viewBox", '0 -50  1000 1000')
      // .attr("viewBox", '0 -50  1250 1250')
      // .append("g")
      .attr("transform", "translate(" + -50+ "," + -150 + ")")
      .style("opacity", 0)


  var context = canvas.node().getContext("2d");

  // var node = svg.selectAll("circle")
  // var node = svg.selectAll(".nodeThree")
  //   .data(nodes)
  //   // .filter(function(d) { return !d.cluster; })
  //   .enter()
  //   .append("g")
  //   .attr("class", "nodeThree")
  //   .call(force.drag);

  // //addcircle to the group
  // node.append("circle")
  //   .attr("class", "circleThree")
  //   .style("fill", function(d) {
  //     return color(d.cluster);
  //   })
  //   .attr("r", function(d) {
  //     return d.radius
  //   })
    // .attr({r: function(d) { return(d.radius); },
    //       cx: function(d) { return(d.x); },
    //       cy: function(d) { return(d.y); },
    //     })


    //add text to the group    
  // node.append("text")
  //   .text(function(d) {
  //     return d.name;
  //   })
  //   .attr("dx", -10)
  //   .attr("dy", ".35em")
  //   .text(function(d) {
  //     return d.name
  //   })
  //   .style("stroke", "none");


    // node
    // .on("mousemove", function(d) {

    //             // if (d.image) {
    //             //   d3.select("#divImgurlFour").transition().duration(200).attr("src", d.image)
    //             // }

    //   var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
    //           "City:" + " " + d.city + "<br/>" +
    //           "Phenotype:" + " " + d.phenotype + "<br/>" +
    //           "Eyes:" + " " + formatTooltip(d.Eyes) + "<br/>"
    //           // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"

    //     tooltip.transition().duration(200).style("opacity", 1);      
    //     tooltip.html(htmlText)  
    //     // .style("left", (d3.event.pageX) + 15 + "px")    
    //     // .style("top", (d3.event.pageY - 28) + "px")
    //     .style("left", (d3.mouse(this)[0] + 100) + "px")
    //     .style("top", (d3.mouse(this)[1] + 500) + "px")
    //     // .style("left", "300px")    
    //     // .style("top", "300px")       
    // })                  
    // .on("mouseout", function(d) {      
    //     tooltip.transition().duration(500).style("opacity", 0);  
    // });


    // @ilya: updated tick function
    // function tick(e) {
    //     // when use canvas, render from the blank canvas on each tick
    //     context.clearRect(0, 0, width, height)
    //     for (node of nodes) {
    //       // apply forces calculations
    //       cluster(10 * e.alpha * e.alpha)(node)
    //       collide(.1)(node)

    //       // render a node on the canvas
    //       context.beginPath();
    //       context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, true);
    //       context.fillStyle = color(node.cluster)
    //       context.fill();
    //       context.closePath();
    //     }

    // }



      function tick(e) {
        context.clearRect(0, 0, width, height)
        const clusterFn = cluster(10 * e.alpha * e.alpha)
        const collideFn = collide(.1)
        for (node of nodes) {
          clusterFn(node)
          collideFn(node)
          context.beginPath();
          context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI, true);
          context.fillStyle = color(node.cluster)
          context.fill();
          context.closePath();
        }
      }



  // Move d to be adjacent to the cluster node.
  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }

  // Resolves collisions between d and all other circles.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

}



// gsap.set(".circleThree", {y: -100});
// // gsap.set(".circleThree", {y: 300});


// ScrollTrigger.batch(".circleThree", {
//   interval: .1, // time window (in seconds) for batching to occur.
//   batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
//   // onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   onLeave: batch => gsap.to(batch, {opacity: 0, y: 500, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
//   start: "0px bottom",
//   end: "top top"
// });



})



};




function forceEyesBubbleTwo() {


ScrollTrigger.create({
    trigger: "#eyesBubble", 
    // onEnter: happyBubble()
    onEnter: () => {
      eyesBubbleTwo();
    },
    onLeave: () => {
      eyesLeaveTwo();
    }
  });

}




////////////////////////////////////////////////////////////////////////////// RESET SCROLL UP


const resetVizBubbleEyesTwo = (direction) => {

    if (direction === "up") {

      console.log("resetVizBubbleEyes")

    // d3.selectAll("#eyesBubble").style("opacity", 0);
     d3.selectAll("#eyesBubble").style("opacity", 1).transition().duration(6000).style("opacity", 0);


}

}




