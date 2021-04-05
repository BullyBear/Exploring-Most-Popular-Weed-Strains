

// stressDot();


function stressDot() {


// fornat tooltip
var formatTooltip = d3.format(",");


// create a tooltip
var tooltip = d3.select("#dotStress")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltipStressDot")
    .style("font-size", "12px")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black")
    .style("width", "200px")
    .style("height", "85px")
    .style("position", "absolute")
    .style("z-index", "10")

var data = d3.csv('../static/data/leafly/leafly/Frontend/assets/data/stress_dot_modified.csv', function(data) {

console.log('data', data);

data.forEach(function(d) {
        d["index"] = d["index"];
        d["name"] = d["name"];
        d["review_count"] = +d["review_count"];
        d["review_count_final"] = +d["review_count_final"];
        d["phenotype"] = d["phenotype"];
        d["thc"] = +d["thc"];
        d["cbd"] = +d["cbd"];
        d["imgurl"] = d["imgurl"];
        d["img_url_two"] = d["img_url_two"];
        d["herbal"] = d["herbal"];
        d["peppery"] = d["peppery"];
        d["pine"] = d["pine"];
        d["hotspot"] = d["hotspot"];
        d["latitude"] = +d["latitude"];
        d["longitude"] = +d["longitude"];
        d["city"] = d["city"];
        d["state"] = d["state"];
        d["country"] = d["country"];
        d["zip"] = +d["zip"];
        d["address_total"] = d["address_total"];
        d["address_blank"] = +d["address_blank"];
        d["ADHD"] = +d["ADHD"];
        d["Anorexia"] = +d["Anorexia"];
        d["Anxiety"] = +d["Anxiety"];
        d["Anxious"] = +d["Anxious"];
        d["Anxiety_Combined"] = +d["Anxiety_Combined"];
        d["Aroused"] = +d["Aroused"];
        d["Arthritis"] = +d["Arthritis"];
        d["Asthma"] = +d["Asthma"];
        d["Cancer"] = +d["Cancer"];
        d["Cramps"] = +d["Cramps"];
        d["Creative"] = +d["Creative"];
        d["Depression"] = +d["Depression"];
        d["Dizzy"] = +d["Dizzy"];
        d["Energetic"] = +d["Energetic"];
        d["Epilepsy"] = +d["Epilepsy"];
        d["Euphoric"] = +d["Euphoric"];
        d["Fatigue"] = +d["Fatigue"];
        d["Fibromyalgia"] = +d["Fibromyalgia"];
        d["Focused"] = +d["Focused"];
        d["Giggly"] = +d["Giggly"];
        d["Happy"] = +d["Happy"];
        d["Happy_Modified"] = +d["Happy_Modified"];
        d["Headache"] = +d["Headache"];
        d["Headaches"] = +d["Headaches"];
        d["Headache_Combined"] = +d["Headache_Combined"];
        d["Hungry"] = +d["Hungry"];
        d["Hypertension"] = +d["Hypertension"];
        d["Inflammation"] = +d["Inflammation"];
        d["Insomnia"] = +d["Insomnia"];
        d["Migraines"] = +d["Migraines"];
        d["Nausea"] = +d["Nausea"];
        d["PMS"] = +d["PMS"];
        d["PTSD"] = +d["PTSD"];
        d["Pain"] = +d["Pain"];
        d["Paranoid"] = +d["Paranoid"];
        d["Relaxed"] = +d["Relaxed"];
        d["Seizures"] = +d["Seizures"];
        d["Sleepy"] = +d["Sleepy"];
        d["Spasticity"] = +d["Spasticity"];
        d["Stress"] = +d["Stress"];
        d["Talkative"] = +d["Talkative"];
        d["Tingly"] = +d["Tingly"];
        d["Uplifted"] = +d["Uplifted"];
        d["Appetite"] = +d["Appetite"];
        d["Disease"] = +d["Disease"];
        d["Headaches"] = +d["Headaches"];
        d["Disorder"] = +d["Disorder"];
        d["Eyes"] = +d["Eyes"];
        d["Injury"] = +d["Injury"];
        d["Mouth"] = +d["Mouth"];
        d["Pressure"] = +d["Pressure"];
        d["Sclerosis"] = +d["Sclerosis"];
        d["Spasms"] = +d["Spasms"];
  });

  console.log('data1', data);
 
var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 1560 - margin.left - margin.right,
    height = 1260 - margin.top - margin.bottom;


var colorScheme = d3.scale.ordinal()
                    .domain(data, (function(d) {
                        return d.city
                    }))
                    .range(["#FFADAF", "#FFC980", "#D9D9D9", "#9DACCB", "#95D1A5", "#F586C6", "#BFDD81", "#F18489", "#80BCEC", "#FEFEA9"]);


var x = d3.scale.ordinal()
    .rangePoints([0, width])


// var x = d3.scale.linear()
//     .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


    
var svgSize = {
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom
}

var svg = d3.select("#dotStress")
    .append("svg")
    .attr("class", "stressDotSvg")
    .attr("width", svgSize.width)
    .attr("height", svgSize.height)
    .attr("viewBox", [0, 0, svgSize.width, svgSize.height].join(" "))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = svg.append("g")
    .attr("id", "chartTwo");

// x.domain([28, 100]);
x.domain(data.map(d => d.Stress));
y.domain([5, 33]);
// y.domain(data.map(d => d.thc));

var groups = svg.selectAll(".groupsTwo")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "groupsTwo")
    .attr("nameofrow", function(d){
        return d.name;
    })
    .attr("transform", function(d) {
        // return "translate(" + x(d.day) + ".0)";
        return "translate(" + x(d.Stress) + ".0)";
    });

var dots = groups.selectAll("circle")
    .data(function(d) {
        return [d.thc];
    })
    .enter()
    .append("circle")
    .attr("class", "dotStress")
    .attr("r", 10)
    .attr("cy", function(d) {
        return y(d)
    })
    .style("fill", function (d) { return colorScheme(d3.select(this.parentNode).datum().city); } )
    .style("opacity", 1);

   groups
    .on("mousemove", function(d) {
      var htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
              "City:" + " " + d.city + "<br/>" +
              "Phenotype:" + " " + d.phenotype + "<br/>" +
              "Stress:" + " " + formatTooltip(d.Stress) + "<br/>" +
              "THC:" + " " + formatTooltip(d.thc) + "<br/>"

        tooltip.transition().duration(200).style("opacity", 1);      
        tooltip.html(htmlText)  
        .style("left", (d3.event.pageX) + 15 + "px")    
        .style("top", (d3.event.pageY - 28) + "px");    
    })                  
    .on("mouseout", function(d) {      
        tooltip.transition().duration(500).style("opacity", 0);  
    });


  groups.append("rect")
      .attr("width", function(d) { return x(d.name); })
      .attr("height", height - 1);

  groups.append("text")
      // .attr("x", function(d) { return x(d.name) - 3; })
      .attr("x", width)
      .attr("y", height / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });





// gsap.set(".dotStress", {y: -100});
gsap.set(".dotStress", {y: 500});



ScrollTrigger.batch(".dotStress", {
  interval: .1, // time window (in seconds) for batching to occur.
  batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
  // onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
  // onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
  // onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
  // onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true}),
  onEnter: batch => gsap.to(batch, {opacity: 1, y: 100, stagger: {each: .1, grid: [1, 3]}, overwrite: true}),
  onLeave: batch => gsap.set(batch, {opacity: 0, y: 0, overwrite: true}),
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: .1, overwrite: true}),
  onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 0, overwrite: true}),
  start: "0px bottom",
  end: "top top"
});


ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".dotStress", {y: 0}));


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
//     anim.reverse();
//    }
//    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// }, false);

})

}; 



const killEyes = (direction) => {

    if (direction === "up") {

      console.log("killEyes")

      d3.selectAll(".chartEyes").style("opacity", 0);

      d3.selectAll("#divImgurlThree").style("opacity", 0);

      d3.selectAll("#divImgurlSix").style("opacity", 0);


}

}
