// Create a function to initialize the dashboard
function init() {
    // Use D3 to read samples.json from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
      
    .then(data => {
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
        updatePlots(defaultSample);
      })
      .catch(error => {
        console.log("Error loading data:", error);
      });
  }
  
  // Define a function to update all the plots
  function updatePlots(sample) {
    // Use D3 to read samples.json from the URL
    d3.json(
      "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    )
      .then(data => {
        // Get the sample metadata for the selected sample
        const metadata = data.metadata.find(obj => obj.id === sample);
  
        // Display the sample metadata
        displayMetadata(metadata);
  
        // Get the sample data for the selected sample
        const sampleData = data.samples.find(obj => obj.id === sample);
  
        // Update the bar chart
        updateBarChart(sampleData);
  
        // Update the bubble chart
        updateBubbleChart(sampleData);
      })
      .catch(error => {
        console.log("Error loading data:", error);
      });
  }
  
  // Define a function to display the sample metadata
  function displayMetadata(metadata) {
    // Get the metadata element
    const metadataElement = d3.select("#sample-metadata");
  
    // Clear any existing metadata
    metadataElement.selectAll("*").remove();
  
    // Append each key-value pair as a new row in the metadata table
    Object.entries(metadata).forEach(([key, value]) => {
      metadataElement
        .append("p")
        .text(`${key}: ${value}`);
    });
  }
  
  // Define a function to update the bar chart
  function updateBarChart(sampleData) {
   
    // Get the top 10 OTUs for the default sample
    const top10OTUs = sampleData.sample_values.slice(0, 10).reverse();
    const top10OTULabels = sampleData.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    const top10OTUHoverText = sampleData.otu_labels.slice(0, 10).reverse();
        
    // Create the trace for the bar chart
    const trace = {
        x: top10OTUs,
        y: top10OTULabels,
        text: top10OTUHoverText,
        type: "bar",
        orientation: "h",
    };
        
    // Create the data array for the bar chart
    const dataBar = [trace];
        
    // Create the layout for the bar chart
    const layoutBar = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };
        
        // Plot the bar chart
        Plotly.newPlot("bar", dataBar, layoutBar);

        // Get the necessary data for the bubble chart
        const otuIds = sampleData.otu_ids;
        const sampleValues = sampleData.sample_values;
        const markerSizes = sampleData.sample_values;
        const markerColors = sampleData.otu_ids;
        const textValues = sampleData.otu_labels;
      
        // Create the trace for the bubble chart
        const traceBubble = {
            x: otuIds,
            y: sampleValues,
            text: textValues,
            mode: "markers",
            marker: {
                size: markerSizes,
                color: markerColors
            }
        };
      
        // Create the data array for the bubble chart
        const dataBubble = [traceBubble];
      
        // Create the layout for the bubble chart
        const layoutBubble = {
            title: "Belly Button Biodiversity - Bubble Chart",
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" }
        };
      
        // Plot the bubble chart
        Plotly.newPlot("bubble", dataBubble, layoutBubble);

        // Get the metadata for the default sample
        const metadata = data.metadata[0];

        // Select the sample metadata element
        const sampleMetadata = d3.select("#sample-metadata");

        // Clear any existing metadata
        sampleMetadata.html("");

        // Loop through each key-value pair in the metadata and append it to the sample metadata element
        Object.entries(metadata).forEach(([key, value]) => {
            sampleMetadata.append("p").text(`${key}: ${value}`);
        });

        }
  
  // Call the init() function to initialize the dashboard
  init();
  
