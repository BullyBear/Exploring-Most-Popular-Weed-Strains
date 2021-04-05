////////////////////////////////////////////////////////////////////// HAPPY



// happy();


// async function happy() {
function happy() {




//////////////////////////////////////// TOOLTIP CODE

// fornat tooltip
var formatTooltip = d3.format(",");


// create a tooltip
var tooltip = d3.select(".chartHappy")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("font-size", "12px")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "black")
    // .style("width", "135px")
    .style("width", "200px")
    // .style("height", "155px")
    .style("height", "85px")
    .style("position", "absolute")
    .style("z-index", "10")
    //.style("visibility", "hidden")


var mouseover = function(d) {
  // d3.selectAll(".element_opacity_toggle").style("opacity", "0.2")
  // d3.selectAll("." + d.name + "_identifier").style("opacity", "0.9")
  tooltip
    .transition()
    .duration(200)

  htmlText = "<span style='font-weight:bold; font-size:14px;'>" + d.name + "</span>" + "<br/>" +
              "City:" + " " + d.city + "<br/>" +
              "Phenotype:" + " " + d.phenotype + "<br/>" +
              "Happy:" + " " + formatTooltip(d.Happy) + "<br/>"

               // d3.select("#divImgurl").attr("src", d.img_url_two)
              // "Picture:" + " " + d3.select("#divImgurl").attr("src", d.img_url_two) + "<br/>"
              if (d.imgurl) {
                // d3.select("#divImgurl").attr("src", d.img_url_two).transition().duration(200)
                d3.select("#divImgurlFour").transition().duration(200).attr("src", d.imgurl)
              }


              else {
                d3.select("#divImgurlFour").transition().duration(200).attr("src", '/Backend/python_scripts/assets/data/happy.png')
              }

              if (d.img_url_two) {
                // d3.select("#divImgurl").attr("src", d.img_url_two).transition().duration(200)
                d3.select("#divImgurl").transition().duration(200).attr("src", d.img_url_two)
              }

              else {
                d3.select("#divImgurl").transition().duration(200).attr("src", '/Backend/python_scripts/assets/data/potleaf.jpg')
              }



  tooltip
      .style("opacity", 1)
      .html(htmlText)
      .style("left", (d3.mouse(this)[0]+100) + "px")
      .style("top", (d3.mouse(this)[1]+100) + "px")
      // .style("left", d + "px")     
      // .style("top", d + "px")
      // .style("left", (d3.event.pageX[0]+100) + "px")     
      // .style("top", (d3.event.pageY[1]+100) + "px")
      // .style("left", d3.select(this).attr("cx") + "px")     
      // .style("top", d3.select(this).attr("cy") + "px")


  // console.log("happy", htmlText)

  }


  var mousemove = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+100) + "px")
      .style("top", (d3.mouse(this)[1]+100) + "px")
      // .style("left", d + "px")     
      // .style("top", d + "px")
      // .style("left", (d3.event.pageX[0]+100) + "px")     
      // .style("top", (d3.event.pageY[1]+100) + "px")
      // .style("left", d3.select(this).attr("cx") + "px")     
      // .style("top", d3.select(this).attr("cy") + "px")
    

      // d3.select("#divImgurl")
      // .style("left", (d3.mouse(this)[0]+100) + "px")
      // .style("top", (d3.mouse(this)[1]+100) + "px")

  }


  var mouseleave = function(d) {
    // d3.selectAll(".element_opacity_toggle").style("opacity", "0.7")
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)

      
    // d3.select("#divImgurl").attr("src", d.img_url_two).style("opacity", 0)
    // d3.select(this).attr("src", d.img_url_two).style("opacity", 0)
  }



// const data = await d3.csv('/Backend/python_scripts/assets/data/modified_data_happy.csv');
const data = d3.csv('../static/data/leafly/leafly/Backend/python_scripts/assets/data/modified_data_happy.csv', function(data){


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


  console.log('data', data);


  uncount = (data, accessor) =>
      data.reduce((arr, item) => {
        const count = accessor(item)
        for (let i = 0; i < count; i++) {
          arr.push({
            ...item
          })
        }
        return arr
      }, []);

  const boxes = uncount(data, d => d.Happy_Modified);

  const nest = d3
      .nest()
      // .key(d => d.name)
      // .key(d => d.city=='Portland')
      // .key(d => d.Happy)
      .key(d => d.city)
      .entries(boxes);


  console.log('nest', nest);


  const colors = ["#f08be7", "#ee5ee1", "#f2a3eb"];


  // scaleColor = d3.scaleOrdinal()
  scaleColor = d3.scale.ordinal()
      .domain(data.map(d => d.phenotype))
      // .domain(data.map(d => d.rating))
      .range(colors);




  // const graph = d3.select(".chartHappy")
  //   .style("opacity", 1)
  //   .append("svg")
  //     .attr("class", "happyChart")
  //     .attr("viewBox", '0 -50  1000 1000')
  //     .append("g")
  //     .attr("transform", "translate(" + -50+ "," + -150 + ")");



    const graph = d3.select(".chartHappy")
                      .style("opacity", 1);


    d3.select("#divImgurl")
                      .style("opacity", 1);

    d3.select("#divImgurlFour")
                      .style("opacity", 1);



    const group = graph
      .selectAll(".containerTwo")
      .data(nest)

      .enter()
      .append("div")

      // .join("div")

      .attr("class", "containerTwo");


    group
      // .append('g')
      .selectAll(".box")
      .data(d => d.values)

      .enter()
      .append("div")

      // .join("div")

      .attr("class", "box")
      // .attr("class", "circle")
      .style("background-color", d => scaleColor(d.phenotype))
      // .style("background-color", d => scaleColor(d.rating));
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);




////////////////////////////////////// Scroll Down

let anim = gsap.to(".box", 1, {
  scrollTrigger: ".box", // start the animation when ".box" enters the viewport (once)
  scale: 1,
  ease: Back.easeOut,
  stagger: {
    grid: "auto",
    from: "start",
    axis: "y",
    each: 0.1
  }
});




/////////////////////////////////////// Scroll Up   


//ORIGINAL
// gsap.set(".box", {y: 0});              

// ScrollTrigger.batch(".box", {
//   interval: 10, // time window (in seconds) for batching to occur.
//   batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
//   onEnterBack: batch => gsap.to(batch, {opacity: 0, y: 0, ease: Back.easeOut, stagger: .1, overwrite: true}),
//   // onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
//   start: "top top",
//   end: "0px bottom"
// });




//NEW
gsap.set(".box", {y: 0});              

ScrollTrigger.batch(".box", {
  interval: 10, // time window (in seconds) for batching to occur.
  batchMax: 2,   // maximum batch size (targets). Can be function-based for dynamic values
  onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, ease: Back.easeOut, stagger: .1, overwrite: true}),
  // onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
  start: "top top",
  end: "0px bottom"
});









})


} //Happy












////////////////////////////////////////////////////////////////////////////// RESET SCROLL UP


const resetVizTop = (direction) => {

    if (direction === "up") {

      console.log("resetVizTop")

      happy();


}

}







