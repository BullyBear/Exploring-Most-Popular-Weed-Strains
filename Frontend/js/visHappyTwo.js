// happyBubble();


function happyBubbleTwo() {



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
    .style("width", "250px")
    .style("height", "100px")
    // .style("position", "absolute")
    .style("z-index", "999999")



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



  d3.csv("../static/data/leafly/Frontend/assets/data/happy.csv", function (data) {
    //calculate teh maximum group present
    m = d3.max(data, function (d) { return d.group });
    //create teh color categories
    color = d3.scale.category10()
      // color = d3.scaleOrdinal().range(d3.schemeCategory20)
      .domain(d3.range(m));
    //make teh clusters array each cluster for each group
    clusters = new Array(m);
    dataset = data.map(function (d) {
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
        .children(function (d) { return d.values; })
        .value(function (d) { return d.radius * d.radius; })
        .nodes({
          values: d3.nest()
            .key(function (d) { return d.cluster; })
            .entries(nodes)
        });

      var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        // .gravity(.02)
        // .charge(0)
        .gravity(.1)
        // .gravity(.001)
        .charge(function (d) {
          if (d.radius == clusters[d.cluster].radius) {
            return (-10 * d.radius);
          }
          else {
            return (0);
          }
        })
        .on("tick", tick)
        .start();


      // var svg = d3.select("#happyBubble").append("svg")
      var canvas = d3.select("#happyBubble").append("canvas")
        .attr("class", "forceTransitionHappy")
        // @ilya: added width and height, to make canvas contents visible
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", '0 -50  1250 1250')
        // .append("g")
        .attr("transform", "translate(" + -50 + "," + -150 + ")");

      var context = canvas.node().getContext("2d");

      /*
        @ilya: DOM related code. Safe to remove, as it's not used by canvas

      var detachedContainer = document.createElement("custom");
      var dataContainer = d3.select(detachedContainer);

      // var node = svg.selectAll(".node")
      // var node = canvas.selectAll(".node")
      // var node = context.selectAll(".node")
      var node = dataContainer.selectAll(".node")
        .data(nodes)
        .enter()
        // .append("g")
        .append("circle")
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.radius; })
        .attr("fill", function(d) {
            return color(d.cluster)
        })
        // .call(force.drag);
        node.call(force.drag);

      // node.append("circle")
      //   .attr("class", "circle")
      //   .style("fill", function (d) {
      //     return color(d.cluster);
      //   })
      //   .attr("r", function (d) {
      //     return d.radius
      //   })


      node
      // taco
        .on("mousemove", function (d) {

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
            // .style("left", (d3.event.pageX - 200) + "px")    
            // .style("top", (d3.event.pageY - 28) + "px")
            .style("left", (d3.mouse(this)[0] + 100) + "px")
            .style("top", (d3.mouse(this)[1] + 500) + "px")
              // .style("left", "300px")    
              // .style("top", "100px")
        })
        .on("mouseout", function (d) {
          tooltip.transition().duration(500).style("opacity", 0);
        });
      */



      // @ilya: updated tick function
      // function tick(e) {
      //   context.clearRect(0, 0, width, height)
      //   for (node of nodes) {
      //     cluster(10 * e.alpha * e.alpha)(node)
      //     collide(.1)(node)
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


      // var closeNode;
      // d3.select("canvas").on("mousemove", function(d) {
      //   var p = d3.mouse(this);
      //   closeNode = force.find(p[0], p[1]);
      //   // tick();

      //     // if (d.image) {
      //     //   d3.select("#divImgurlFour").transition().duration(200).attr("src", d.image)
      //     // }

      //     var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
      //       "City:" + " " + d.city + "<br/>" +
      //       "Phenotype:" + " " + d.phenotype + "<br/>" +
      //       "Happy:" + " " + formatTooltip(d.Happy) + "<br/>"
      //     // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"

      //     tooltip.transition().duration(200).style("opacity", 1);
      //     tooltip.html(htmlText)

      //       .style("left", (d3.mouse(this)[0] + 100) + "px")
      //       .style("top", (d3.mouse(this)[1] + 500) + "px")
      // })



      // Move d to be adjacent to the cluster node.
      function cluster(alpha) {
        return function (d) {
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
        return function (d) {
          var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
          quadtree.visit(function (quad, x1, y1, x2, y2) {
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
function happyLeaveTwo() {

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
    .style("width", "250px")
    .style("height", "100px")
    // .style("position", "absolute")
    .style("z-index", "999999")



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



  d3.csv("../static/data/leafly/Frontend/assets/data/happy.csv", function (data) {
    //calculate teh maximum group present
    m = d3.max(data, function (d) { return d.group });
    //create teh color categories
    color = d3.scale.category10()
      // color = d3.scaleOrdinal().range(d3.schemeCategory20)
      .domain(d3.range(m));
    //make teh clusters array each cluster for each group
    clusters = new Array(m);
    dataset = data.map(function (d) {
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
        .children(function (d) { return d.values; })
        .value(function (d) { return d.radius * d.radius; })
        .nodes({
          values: d3.nest()
            .key(function (d) { return d.cluster; })
            .entries(nodes)
        });

      var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        // .gravity(.02)
        // .charge(0)
        .gravity(.1)
        // .gravity(.001)
        .charge(function (d) {
          if (d.radius == clusters[d.cluster].radius) {
            return (-10 * d.radius);
          }
          else {
            return (0);
          }
        })
        .on("tick", tick)
        .start();



      // var svg = d3.select("#happyBubble").append("svg")
      var canvas = d3.select("#happyBubble").append("canvas")
        .attr("class", "forceTransitionHappyTwo")
        .attr("width", width)
        .attr("height", height)
        // .attr("viewBox", '0 -50  1250 1250')
        // .append("g")
        .attr("transform", "translate(" + -50 + "," + -150 + ")")
        .style("opacity", 0);


      var context = canvas.node().getContext("2d");

      // var detachedContainer = document.createElement("custom");
      // var dataContainer = d3.select(detachedContainer);


      // // var node = svg.selectAll(".node")
      // // var node = canvas.selectAll(".node")
      // // var node = context.selectAll(".node")
      // var node = dataContainer.selectAll(".node")
      //   .data(nodes)
      //   .enter()
      //   // .append("g")
      //   .append("circle")
      //   .attr("class", "node")
      //   .attr("cx", function(d) { return d.x; })
      //   .attr("cy", function(d) { return d.y; })
      //   // .attr("cx", Math.cos(d.group / m * 2 * Math.PI) * 100 + width / 2 + Math.random())
      //   // .attr("cy", Math.sin(d.group / m * 2 * Math.PI) * 100 + height / 2 + Math.random())
      //   .attr("r", function(d) { return d.radius; })
      //   .attr("fill", function(d) {
      //       return color(d.cluster)
      //   })
      //   .call(force.drag);


      // node.append("circle")
      //   .attr("class", "circle")
      //   .style("fill", function (d) {
      //     return color(d.cluster);
      //   })
      //   .attr("r", function (d) {
      //     return d.radius
      //   })


      // node.each(function(d) {

      //   var taco = d3.select(this);

      //   context.fillStyle = node.attr("fill");
      //   context.beginPath();
      //   context.arc(taco.attr("cx"), taco.attr("cy"), taco.attr("r"), 0,  2 * Math.PI, true);
      //   // context.arc(taco.attr("r"), 0,  2 * Math.PI, true);
      //   context.fill();
      //   context.closePath();
      // });




      // node
      // // taco
      //   .on("mousemove", function (d) {

      //     // if (d.image) {
      //     //   d3.select("#divImgurlFour").transition().duration(200).attr("src", d.image)
      //     // }

      //     var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
      //       "City:" + " " + d.city + "<br/>" +
      //       "Phenotype:" + " " + d.phenotype + "<br/>" +
      //       "Happy:" + " " + formatTooltip(d.Happy) + "<br/>"
      //     // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"

      //     tooltip.transition().duration(200).style("opacity", 1);
      //     tooltip.html(htmlText)
      //       // .style("left", (d3.event.pageX) -200 + "px")    
      //       // .style("top", (d3.event.pageY - 28) + "px")
      //       .style("left", (d3.mouse(this)[0] + 100) + "px")
      //       .style("top", (d3.mouse(this)[1] + 500) + "px")
      //       // .style("left", "300px")    
      //       // .style("top", "100px")
      //   })
      //   .on("mouseout", function (d) {
      //     tooltip.transition().duration(500).style("opacity", 0);
      //   });


      // @ilya: updated tick function
      // function tick(e) {
      //   context.clearRect(0, 0, width, height)
      //   for (node of nodes) {
      //     cluster(10 * e.alpha * e.alpha)(node)
      //     collide(.1)(node)
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



      var closeNode;
      d3.select("canvas").on("mousemove", function(d) {
        var p = d3.mouse(this);
        closeNode = force.find(p[0], p[1]);
        tick();
      })



      // Move d to be adjacent to the cluster node.
      function cluster(alpha) {
        return function (d) {
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
        return function (d) {
          var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
          quadtree.visit(function (quad, x1, y1, x2, y2) {
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




///////////////////////////// REMOVED BLOCK BELOW //////////////////////////////


    // // gsap.set(".circle", { y: -100 });
    // gsap.set(".circle", { y: 300 });
    // // gsap.set(".circle", { y: 400 });

    // ScrollTrigger.batch(".circle", {
    //   interval: .1, // time window (in seconds) for batching to occur.
    //   batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
    //   // onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
    //   onLeave: batch => gsap.to(batch, { opacity: 0, y: 500, stagger: { each: .1, grid: [1, 3] }, overwrite: true }),
    //   onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: .1, overwrite: true }),
    //   start: "0px bottom",
    //   end: "top top"
    // });


//////////


    // when ScrollTrigger does a refresh(), it maps all the positioning data which
    // factors in transforms, but in this example we're initially setting all the ".box"
    // elements to a "y" of 100 solely for the animation in which would throw off the normal
    // positioning, so we use a "refreshInit" listener to reset the y temporarily. When we
    // return a gsap.set() in the listener, it'll automatically revert it after the refresh()!

    // ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".circle", {y: 0}));




///////////////////////////////////////////////////////////////////////////////////



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


function forceHappyBubbleTwo() {
  ScrollTrigger.create({
    trigger: "#happyBubble",
    // end: "-25% top",
    // onEnter: happyBubble()
    onEnter: () => {
      happyBubbleTwo();
      console.log('element is visible')
    },
    onLeave: () => {
      happyLeaveTwo();
      console.log('element is gone')
    }
  });
}









////////////////////////////////////////////////////////////////////////////// RESET SCROLL UP
const resetVizBubbleTwo = (direction) => {
  if (direction === "up") {
    console.log("resetVizBubbleHappy")
    // d3.selectAll("#happyBubble").style("opacity", 0);
    d3.selectAll("#happyBubble").style("opacity", 1).transition().duration(6000).style("opacity", 0);
  }
}



