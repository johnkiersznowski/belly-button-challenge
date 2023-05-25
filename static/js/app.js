// constant URL
const DATA_URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// // Load the samples data
// var samplesData = d3.json();

// // Create a dropdown menu to select a sample
// var selDataset = d3.select("#selDataset");
// selDataset.selectAll("option").remove();
// samplesData.forEach(function(sample) {
//   selDataset.append("option").text(sample.sample_id).value(sample.sample_id);
// });

// Create a function to update the charts when a new sample is selected
function updateDisplay(data, subjectID) {
  // Get the selected sample
//   var sample = data.metadata.filter(sampleID =>  {
//     // return sample.sample_id === sampleId;
//     sampleID.id === subjectID
//   });
// console.log(sample)
var sample = data.samples.find(item => item.id == subjectID);
console.log(sample)
  // Update the bar chart
  var barChart = d3.select("#bar");
  barChart.selectAll(".bar").remove();
  barChart.selectAll(".bar").data(sample.otu_ids).enter().append("div")
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
  bubbleChart.selectAll(".bubble").data(sample.otu_labels).enter().append("circle")
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

// optionChanged
function optionChanged(subjectID) {
  d3.json(DATA_URL).then(data => updateDisplay(data, subjectID));
}


// Create a function to initialize the dashboard
function init() {
  // Use D3 to read samples.json from the URL
  d3.json(DATA_URL).then(data => {
      // Get the dropdown select element
      const dropdown = d3.select("#selDataset");

      // Get the sample names from the data
      const sampleNames = data.names;

      // Populate the dropdown with sample names
      sampleNames.forEach(sample => {
        dropdown
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Get the first sample from the data
      const defaultSample = sampleNames[0];

      // Update all plots with the default sample
      optionChanged(defaultSample);
    })
    .catch(error => {
      console.log("Error loading data:", error);
    });
}


// 
init();
