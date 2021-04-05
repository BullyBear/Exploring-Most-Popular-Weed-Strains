

// happyBubble();


function happyBubble() {

console.log('hit hit hit')

//////////////////////////////////////// TOOLTIP CODE


// fornat tooltip
var formatTooltip = d3.format(",");


// create a tooltip
var tooltip = d3.select("#happyBubble")
// var tooltip = d3.selectAll(".forceTransitionHappy")
// var tooltip = d3.selectAll(".node")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltipHappy")
    .style("font-size", "12px")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black")
    .style("width", "200px")
    .style("height", "85px")
    .style("position", "absolute")
    .style("z-index", "10")
    // .style("top", "2000px")
    //.style("visibility", "hidden")


// var mouseover = function(d) {
//   // d3.selectAll(".element_opacity_toggle").style("opacity", "0.2")
//   // d3.selectAll("." + d.name + "_identifier").style("opacity", "0.9")
//   tooltip
//     .transition()
//     .duration(200)

//   htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
//               "City:" + " " + d.city + "<br/>" +
//               "Phenotype:" + " " + d.phenotype + "<br/>" +
//               "Happy:" + " " + formatTooltip(d.Happy) + "<br/>" +
//               "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"


//   tooltip
//       .style("opacity", 1)
//       .html(htmlText)
//       .style("left", (d3.mouse(this)[0]+100) + "px")
//       .style("top", (d3.mouse(this)[1]+100) + "px")

//   console.log("bubbleTooltip", htmlText)

//   }


//   var mousemove = function(d) {
//     tooltip
//       .style("left", (d3.mouse(this)[0]+100) + "px")
//       .style("top", (d3.mouse(this)[1]+100) + "px")
//   }


//   var mouseleave = function(d) {
//     // d3.selectAll(".element_opacity_toggle").style("opacity", "0.7")
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }


var width = 1000,
  height = 1000,
  padding = 1, // separation between same-color nodes
  clusterPadding = 3, // separation between different-color nodes
  maxRadius = 10;
  minRadius = 1;
  // maxRadius = 100;
  // minRadius = 14;



d3.csv("../static/data/leafly/leafly/Frontend/assets/data/happy.csv", function(data) {
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
      Happy: d.radius * 5,
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
  var svg = d3.select("#happyBubble")
    .append("svg")
      .attr("class", "forceTransitionHappy")
      .attr("viewBox", '0 -50  1250 1250')
      .append("g")
      .attr("transform", "translate(" + -50+ "," + -150 + ")");
    // .attr("width", width)
    // .attr("height", height);

  // var node = svg.selectAll("circle")
  var node = svg.selectAll(".node")
    .data(nodes)
    // .filter(function(d) { return !d.cluster; })
    .enter()
    .append("g")
    .attr("class", "node")
    .call(force.drag);

  //addcircle to the group
  node.append("circle")
     .attr("class", "circle")
    .style("fill", function(d) {
      return color(d.cluster);
    })
    // .transition()
    // .delay(2000)
    // .duration(2000)
    .attr("r", function(d) {
      return d.radius
    })
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



    node
    .on("mousemove", function(d) {

                // if (d.image) {
                //   d3.select("#divImgurlFour").transition().duration(200).attr("src", d.image)
                // }

      var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
              "City:" + " " + d.city + "<br/>" +
              "Phenotype:" + " " + d.phenotype + "<br/>" +
              "Happy:" + " " + formatTooltip(d.Happy) + "<br/>"
              // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"

        tooltip.transition().duration(200).style("opacity", 1);      
        tooltip.html(htmlText)  
        // .style("left", (d3.event.pageX) + 15 + "px")    
        // .style("top", (d3.event.pageY - 28) + "px")
        .style("left", (d3.mouse(this)[0]+100) + "px")
        .style("top", (d3.mouse(this)[1]+100) + "px")    
    })                  
    .on("mouseout", function(d) {      
        tooltip.transition().duration(500).style("opacity", 0);  
    });



  function tick(e) {
    node
      // .transition()
      // .delay(2000)
      // .duration(2000)
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.1))
      .attr("transform", function(d) {
        var k = "translate(" + d.x + "," + d.y + ")";
        return k;
      })
      // .transition()
      // .delay(2000)
      // .duration(2000)
      // .attr("cx", function(d) { return d.x; })
      // .attr("cy", function(d) { return d.y; });

  }


  // function tick(e) {
  //     node
  //       .each(cluster(e.alpha * .1))
  //       .each(collide(e.alpha * 2))
  //       .attr("cx", function(d) { return d.x; })
  //       .attr("cy", function(d) { return d.y; });
  // }


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




////////////////////////////////////// Scroll Down



// ScrollTrigger.create({
//     trigger: ".node", 
//     start: "top bottom-=2500px", // top part of the trigger element hits bottom of the screen
//     once: true,
//     onEnter: () => {
//       console.log('element is visible')
//     }
//   });





// let anim = gsap.to(".node", 1, {
//   scrollTrigger: ".node", // start the animation when ".box" enters the viewport (once)
//   scale: 1,
//   ease: Back.easeOut,
//   // stagger: {
//   //   grid: "auto",
//   //   from: "start",
//   //   axis: "y",
//   //   each: 0.1
//   // }
// });


// let anim = gsap.to(".node", {
//   scrollTrigger: ".node",
//   // start: "bottom top",
//   x: 2000
//   // y: 500
// });



// gsap.set(".node", {y: 50});

// ScrollTrigger.batch(".node", {
//   interval: 0.1, // time window (in seconds) for batching to occur. 
//   batchMax: 30,   // maximum batch size (targets). Can be function-based for dynamic values

//   // onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
//   // onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   // onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
//   // onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true}),

//   onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
//   onLeave: batch => gsap.set(batch, {opacity: 0, y: 1000, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
//   onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: -1000, overwrite: true}),
//   // you can also define most normal ScrollTrigger values like start, end, etc.
//   start: "20px bottom",
//   end: "top top"
// });


// ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".node", {y: 0}));





/////////////////////////////////////// Scroll Up

// var lastScrollTop = 0;

// // element should be replaced with the actual target element ("where you typed window") on which you have applied scroll, use window in case of no target element(which i did).
// window.addEventListener("scroll", function(){ 
//    var st = window.pageYOffset || document.documentElement.scrollTop; 
//    // if (st > lastScrollTop){
//    //    // downscroll code
//    // } else {
//    //    // upscroll code
//    // }

//    if (st < lastScrollTop){
//    // if (st < lastScrollTop - 1000){
//     anim.reverse();
//    }
//    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// }, false);





// gsap.set(".node", {y: -100});

// ScrollTrigger.batch(".node", {
//   interval: .1, // time window (in seconds) for batching to occur.
//   batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
//   onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
//   onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
//   onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true}),
//   start: "0px bottom",
//   end: "top top"
// });


// ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".node", {y: 0}));





})



};









// happyLeave();


function happyLeave() {

console.log('run run run')

//////////////////////////////////////// TOOLTIP CODE


// fornat tooltip
var formatTooltip = d3.format(",");


// create a tooltip
var tooltip = d3.select("#happyBubble")
// var tooltip = d3.selectAll(".forceTransitionHappy")
// var tooltip = d3.selectAll(".node")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltipHappyTwo")
    .style("font-size", "12px")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black")
    .style("width", "200px")
    .style("height", "85px")
    .style("position", "absolute")
    .style("z-index", "10")
    // .style("top", "2000px")
    //.style("visibility", "hidden")


// var mouseover = function(d) {
//   // d3.selectAll(".element_opacity_toggle").style("opacity", "0.2")
//   // d3.selectAll("." + d.name + "_identifier").style("opacity", "0.9")
//   tooltip
//     .transition()
//     .duration(200)

//   htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
//               "City:" + " " + d.city + "<br/>" +
//               "Phenotype:" + " " + d.phenotype + "<br/>" +
//               "Happy:" + " " + formatTooltip(d.Happy) + "<br/>" +
//               "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"


//   tooltip
//       .style("opacity", 1)
//       .html(htmlText)
//       .style("left", (d3.mouse(this)[0]+100) + "px")
//       .style("top", (d3.mouse(this)[1]+100) + "px")

//   console.log("bubbleTooltip", htmlText)

//   }


//   var mousemove = function(d) {
//     tooltip
//       .style("left", (d3.mouse(this)[0]+100) + "px")
//       .style("top", (d3.mouse(this)[1]+100) + "px")
//   }


//   var mouseleave = function(d) {
//     // d3.selectAll(".element_opacity_toggle").style("opacity", "0.7")
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", 0)
//   }


var width = 1000,
  height = 1000,
  padding = 1, // separation between same-color nodes
  clusterPadding = 3, // separation between different-color nodes
  maxRadius = 10;
  minRadius = 1;
  // maxRadius = 100;
  // minRadius = 14;



d3.csv("/Frontend/assets/data/happy.csv", function(data) {
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
      Happy: d.radius * 5,
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
  var svg = d3.select("#happyBubble")
    .append("svg")
      .attr("class", "forceTransitionHappy")
      .attr("viewBox", '0 -50  1000 1000')
      .append("g")
      .attr("transform", "translate(" + -50+ "," + -150 + ")");
    // .attr("width", width)
    // .attr("height", height);

  // var node = svg.selectAll("circle")
  var node = svg.selectAll(".node")
    .data(nodes)
    // .filter(function(d) { return !d.cluster; })
    .enter()
    .append("g")
    .attr("class", "node")
    .call(force.drag);

  //addcircle to the group
  node.append("circle")
     .attr("class", "circle")
    .style("fill", function(d) {
      return color(d.cluster);
    })
    // .transition()
    // .delay(2000)
    // .duration(2000)
    .attr("r", function(d) {
      return d.radius
    })
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



    node
    .on("mousemove", function(d) {

                // if (d.image) {
                //   d3.select("#divImgurlFour").transition().duration(200).attr("src", d.image)
                // }

      var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
              "City:" + " " + d.city + "<br/>" +
              "Phenotype:" + " " + d.phenotype + "<br/>" +
              "Happy:" + " " + formatTooltip(d.Happy) + "<br/>"
              // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"

        tooltip.transition().duration(200).style("opacity", 1);      
        tooltip.html(htmlText)  
        // .style("left", (d3.event.pageX) + 15 + "px")    
        // .style("top", (d3.event.pageY - 28) + "px")
        .style("left", (d3.mouse(this)[0]+100) + "px")
        .style("top", (d3.mouse(this)[1]+100) + "px")    
    })                  
    .on("mouseout", function(d) {      
        tooltip.transition().duration(500).style("opacity", 0);  
    });



  function tick(e) {
    node
      // .transition()
      // .delay(2000)
      // .duration(2000)
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.1))
      .attr("transform", function(d) {
        var k = "translate(" + d.x + "," + d.y + ")";
        return k;
      })
      // .transition()
      // .delay(2000)
      // .duration(2000)
      // .attr("cx", function(d) { return d.x; })
      // .attr("cy", function(d) { return d.y; });

  }


  // function tick(e) {
  //     node
  //       .each(cluster(e.alpha * .1))
  //       .each(collide(e.alpha * 2))
  //       .attr("cx", function(d) { return d.x; })
  //       .attr("cy", function(d) { return d.y; });
  // }


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




////////////////////////////////////// Scroll Down



// ScrollTrigger.create({
//     trigger: ".node", 
//     start: "top bottom-=2500px", // top part of the trigger element hits bottom of the screen
//     once: true,
//     onEnter: () => {
//       console.log('element is visible')
//     }
//   });





// let anim = gsap.to(".node", 1, {
//   scrollTrigger: ".node", // start the animation when ".box" enters the viewport (once)
//   scale: 1,
//   ease: Back.easeOut,
//   // stagger: {
//   //   grid: "auto",
//   //   from: "start",
//   //   axis: "y",
//   //   each: 0.1
//   // }
// });


// let anim = gsap.to(".node", {
//   scrollTrigger: ".node",
//   // start: "bottom top",
//   x: 2000
//   // y: 500
// });




gsap.set(".circle", {y: -100});

ScrollTrigger.batch(".circle", {
  interval: .1, // time window (in seconds) for batching to occur.
  batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
  // onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
  onLeave: batch => gsap.to(batch, {opacity: 0, y: 500, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
  start: "0px bottom",
  end: "top top"
});

// when ScrollTrigger does a refresh(), it maps all the positioning data which
// factors in transforms, but in this example we're initially setting all the ".box"
// elements to a "y" of 100 solely for the animation in which would throw off the normal
// positioning, so we use a "refreshInit" listener to reset the y temporarily. When we
// return a gsap.set() in the listener, it'll automatically revert it after the refresh()!

// ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".circle", {y: 0}));





/////////////////////////////////////// Scroll Up

// var lastScrollTop = 0;

// // element should be replaced with the actual target element ("where you typed window") on which you have applied scroll, use window in case of no target element(which i did).
// window.addEventListener("scroll", function(){ 
//    var st = window.pageYOffset || document.documentElement.scrollTop; 
//    // if (st > lastScrollTop){
//    //    // downscroll code
//    // } else {
//    //    // upscroll code
//    // }

//    if (st < lastScrollTop){
//    // if (st < lastScrollTop - 1000){
//     anim.reverse();
//    }
//    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// }, false);





// gsap.set(".node", {y: -100});

// ScrollTrigger.batch(".node", {
//   interval: .1, // time window (in seconds) for batching to occur.
//   batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
//   onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
//   onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
//   onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true}),
//   start: "0px bottom",
//   end: "top top"
// });


// ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".node", {y: 0}));





})



};





// gsap.set(".node", {y: -100});

// ScrollTrigger.batch(".node", {
//   interval: .1, // time window (in seconds) for batching to occur.
//   batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values

//   // onEnter: batch => gsap.to(batch, {opacity: 0}),
//   // onEnterBack: batch => gsap.to(batch, {opacity: 1}),

//   onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
//   onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
//   onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true}),

//   start: "-200px bottom",
//   end: "top top"
// });

// ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".node", {y: 0}));





function forceHappyBubble() {


ScrollTrigger.create({
    trigger: "#startBubble", 
    // onEnter: happyBubble()
    onEnter: () => {
      happyBubble();
      console.log('element is visible')
    },
    onLeave: () => {
      happyLeave();
      console.log('element is gone')
    }
  });


}





////////////////////////////////////////////////////////////////////////////// RESET SCROLL UP


const resetVizBubble = (direction) => {

    if (direction === "up") {

      console.log("resetVizBubbleHappy")

    d3.selectAll("#happyBubble").style("opacity", 0);

}

}









