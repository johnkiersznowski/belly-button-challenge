// Load the D3 library
d3.select("body").selectAll("script").remove();
d3.import("https://d3js.org/d3.v5.min.js");

// Load the samples data
var samplesData = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json");

// Create a dropdown menu to select a sample
var selDataset = d3.select("#selDataset");
selDataset.selectAll("option").remove();
samplesData.forEach(function(sample) {
  selDataset.append("option").text(sample.sample_id).value(sample.sample_id);
});

// Create a function to update the charts when a new sample is selected
function optionChanged(sampleId) {
  // Get the selected sample
  var sample = samplesData.find(function(sample) {
    return sample.sample_id === sampleId;
  });

  // Update the bar chart
  var barChart = d3.select("#bar");
  barChart.selectAll(".bar").remove();
  barChart.selectAll(".bar").data(sample.top_10_otu_values).enter().append("div")
    .attr("class", "bar")
    .attr("width", function(d) {
      return d;
    })
    .text(function(d) {
      return d;
    });

  // Update the bubble chart
  var bubbleChart = d3.select("#bubble");
  bubbleChart.selectAll(".bubble").remove();
  bubbleChart.selectAll(".bubble").data(sample.otu_values).enter().append("circle")
    .attr("r", function(d) {
      return d;
    })
    .attr("cx", function(d, i) {
      return i;
    })
    .attr("cy", function(d) {
      return d;
    })
    .style("fill", function(d) {
      return d;
    })
    .text(function(d) {
      return d;
    });

  // Update the demographic info
  var sampleMetadata = d3.select("#sample-metadata");
  sampleMetadata.selectAll(".key").remove();
  sampleMetadata.selectAll(".key").data(sample.metadata).enter().append("div")
    .attr("class", "key")
    .text(function(d) {
      return d.key;
    });

  sampleMetadata.selectAll(".value").remove();
  sampleMetadata.selectAll(".value").data(sample.metadata).enter().append("div")
    .attr("class", "value")
    .text(function(d) {
      return d.value;
    });
}

// Set the default sample
optionChanged(samplesData[0].sample_id);
