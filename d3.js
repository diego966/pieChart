// Seed data to populate the donut pie chart
var seedData = [{
  "label": "Un contrat d'entre-tien pertinent",
  "value": 25,
  "link": "https://facebook.github.io/react/"
}, {
  "label": "Une renovation energetique optimisee",
  "value": 25,
  "link": "https://redux.js.org/"
}, {
  "label": "Une prise en charge a 100%",
  "value": 25,
  "link": "https://vuejs.org/"
}, {
  "label": "Un reseau de partenaires RGE",
  "value": 25,
  "link": "https://angularjs.org/"
}, {
  "label": "Contactez votre expert",
  "value": 25,
  "link": "https://meteorhacks.com/meteor-js-web-framework-for-everyone"
}, {
  "label": "Calculez vos aides",
  "value": 25,
  "link": "https://nodejs.org/"
}, {
  "label": "Votre audir energetique",
  "value": 25,
  "link": "https://nodejs.org/"
}, {
  "label": "Votre guide de renovation",
  "value": 25,
  "link": "https://nodejs.org/"
}];

// Define size & radius of donut pie chart
var width = 850,
    height =850,
    radius = Math.min(width, height) / 2;

// Define arc colours
var colour = d3.scaleOrdinal(["#b7ce36", "#b7ce36", "#b7ce36","#b7ce36","#263b4e","#263b4e","#263b4e","#263b4e"]);

// Define arc ranges
var arcText = d3.scaleOrdinal()
  .range([0, width]);

// Determine size of arcs
var arc = d3.arc()
  .innerRadius(radius - 240)
  .outerRadius(radius - 10);

// Create the donut pie chart layout
var pie = d3.pie()
  .value(function (d) { return d["value"]; })
  .sort(null);


// Append SVG attributes and append g to the SVG
var svg = d3.select("#donut-chart")
  .attr("width", 800)
  .attr("height", 800)
  .append("g")
    .attr('transform', 'translate(450, 425)') 

//give first four g elements class farfar
$("g g:nth-of-type(even)").addClass("testme")
// Define inner circle
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 210)
  .attr("fill", "#fff") ;

// Calculate SVG paths and fill in the colours
var g = svg.selectAll(".arc")
  .data(pie(seedData))
  .enter().append("g")
  .attr("class", "arc")
  
    
  // Make each arc clickable 
  .on("click", function(d, i) {
    window.location = seedData[i].link;
  });

  // Append the path to each g
  g.append("path")
    .attr("d", arc)
    .attr("fill", function(d, i) {
      return colour(i);
    });


  // Append text labels to each arc
  g.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
  
    .attr("class","labelme")
    .text(function(d,i) { return seedData[i].label; })
  
g.selectAll(".arc text").call(wrap, arcText.range([0, width]));

// Append text to the inner circle
var imgurl='https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=1600&h=900'
var defs = svg.append("defs").attr("id", "imgdefs")
var catpattern = defs.append("pattern")
                        .attr("id", "catpattern")
                        .attr("height", 1)
                        .attr("width", 1)
                        .attr("x", "0")
                        .attr("y", "0")
catpattern.append("image")
     .attr("x", -160)
     .attr("y", -220)
     .attr("height", 755)
     .attr("width", 700)
     .attr("xlink:href", imgurl)
svg.append("circle")
    .attr("r", 156)
    .attr("cy", 0)
    .attr("cx", 0)
    .attr("fill", "url(#catpattern)")


//Create an SVG path (based on bl.ocks.org/mbostock/2565344)

// Wrap function to handle labels with longer text
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    console.log("tspan: " + tspan);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 90) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", + 1 + "em").text(word);
      }
    }
  });
}
