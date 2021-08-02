// Set svg dimensions
var margin = {top: 30, right: 30, bottom: 70, left: 60};
const width = 1000;
const height = 600;

// Compute plot dimensions
var plotWidth = width - margin.left - margin.right;
var plotHeight = height - margin.top - margin.bottom;

// Add svg to body
var svg = d3.select("#dataviz")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var scaleX = d3.scaleBand()
                .range([ 0, plotWidth ])
                .padding(0.2);

// Add x axis
var axisX = svg.append("g")
                .attr("transform", "translate(0," + plotHeight + ")")
                .attr("class", "axisX")

// Initialize the Y axis
var scaleY = d3.scaleLinear()
                .range([ plotHeight, 0]);

// Add y axis
var axisY = svg.append("g")
                .attr("class", "axisY")

addChartLabels(svg)

// create a tooltip
var TooltipSummary = d3.select("body")
                        .append("div")
                        .attr('class', 'tooltipsummary')
                        .attr('width', 300)
                        .style("opacity", 0)
                        .text('Data Point Summary')

var Tooltip = TooltipSummary
                            .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0)
                            .style("background-color", "white")
                            .style("border", "solid")
                            .style("border-width", "2px")
                            .style("border-radius", "5px")
                            .style("padding", "5px")

/* Get Data */

function getData1900(){

    // Define data
    var data = {}

    data.annotations = [
        {
            note:
            {
                title: "USA saw 6 reported attacks in 1900",
                label: "twice as many attacks as the next nations",
            },
            x: plotWidth * .15,
            y: plotHeight * .01,
            dx: plotWidth * .20,
            dy: 0,
            color: '#Ff5000'
        },
        {
            note:
            {
                title: "Other leading nations",
                label: "saw no attacks this year",
            },
            x: plotWidth * .80,
            y: plotHeight * .80,
            dx: 0,
            dy: 0,
            color: '#4caf50'
        }
    ]

    data.data = [
        {"group": "AUSTRALIA", "value": 3, "male": 3, "female": 0, "fatal": 1},
        {"group": "SOUTH AFRICA", "value": 3, "male": 3, "female": 0, "fatal": 1},
        {"group": "USA", "value": 6, "male": 5, "female": 0, "fatal": 0},
        {"group": "BRAZIL", "value": 0, "male": 0, "female": 0, "fatal": 0},
        {"group": "MEXICO", "value": 0, "male": 0, "female": 0, "fatal": 0},
    ];

    return data
}

function getData1950(){
    var data = {};

    data.data = [
        {"group": "AUSTRALIA", "value": 13, "male": 11, "female": 0, "fatal": 2},
        {"group": "USA", "value": 9, "male": 9, "female": 0, "fatal": 1},
        {"group": "SOUTH AFRICA", "value": 5, "male": 5, "female": 0, "fatal": 2},
        {"group": "BRAZIL", "value": 0, "male": 0, "female": 0, "fatal": 0},
        {"group": "MEXICO", "value": 0, "male": 0, "female": 0, "fatal": 0},
    ]

    data.annotations = [
        {
            note:
            {
                title: "Aussies overtook the USA in attacks",
                label: "nearly 4x attacks as the start of the century",
            },
            x: plotWidth * .05,
            y: plotHeight * 0.01,
            dx: plotWidth * .25,
            dy: 0,
            color: '#0040ff'
        },
        {
            note:
            {
                title: "Attacks in the USA stay near 1900 levels",
                label: "over 50 years later, not a substanial increase in attacks",
            },
            x: plotWidth * .30,
            y: plotHeight * .35,
            dx: plotWidth * .15,
            dy: -plotHeight * .05,
            color: '#Ff5000'
        },
    ]

    return data

}

function getData2018(){

    var data = {};
    data.data = [
        {"group": "USA", "value": 10, "male": 8, "female": 2, "fatal": 0},
        {"group": "AUSTRALIA", "value": 23, "male": 20, "female": 3, "fatal": 0},
        {"group": "BRAZIL", "value": 5, "male": 4, "female": 1, "fatal": 1},
        {"group": "SOUTH AFRICA", "value": 4, "male": 4, "female": 0, "fatal": 0},
        {"group": "MEXICO", "value": 1, "male": 1, "female": 0, "fatal": 0},
    ];

    data.annotations = [
        {
            note:
            {
                title: "Aussies continue their lead in shark attacks",
                label: "nearly double the attacks seen in 1950",
            },
            x: plotWidth * .06,
            y: plotHeight * 0.01,
            dx: plotWidth * .20,
            dy: 0,
            color: '#0040ff'
        },
        {
            note:
            {
                title: "USA stays in second",
                label: "attacks stay near consistent yet again",
            },
            x: plotWidth * .30,
            y: plotHeight * .60,
            dx: plotWidth * .05,
            dy: -plotHeight * .15,
            color: '#Ff5000'
        },
        {
            note:
            {
                title: "More countries rose in shark attacks",
                label: "South Africa saw reductions while Brazil & Mexico saw increases",
            },
            x: plotWidth * .65,
            y: plotHeight * .55,
            dx: 0,
            dy: 0,
            color: '#00cc66'
        }
    ]

    return data
}

function getDataByYear(year){

    switch(year){
        case 1900:
            return getData1900();
        case 1950:
            return getData1950();
        case 2018:
            return getData2018();
        default:
            return getData1900();
    }
}

/* Add Methods */

function addChartLabels(selection){

    // Add chart title
    selection.append("text")
        .attr("transform", "translate(" + (plotWidth / 2) + " ," + (0) + ")")
        .attr('class', 'chart-title')
        .style("text-anchor", "middle")

    // Add x axis label
    selection.append("text")
        .attr("transform", "translate(" + (plotWidth / 2) + " ," + (plotHeight + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Countries");

    // Add y axis label
    selection.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (plotHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of shark attacks");
}

/* Update Methods */

function updateAnnotations(selection, annotations){

    // Clear old annotations
    d3.selectAll('g.annotation-group').remove()

    // Add new annotations
    if (annotations){

        const makeAnnotations = d3.annotation()
                                .type(d3.annotationLabel)
                                .annotations(annotations)

        selection
                .append("g")
                .attr("class", "annotation-group")
                .call(makeAnnotations)
    }
}

function updateAxesBar(data){

    // Update X axis
    scaleX.domain(data.map(function(d) { return d.group; }))
    axisX.call(d3.axisBottom(scaleX))

    // Update Y axis
    scaleY.domain([0, d3.max(data, function(d) { return d.value }) ]);
    axisY.transition().duration(1000).call(d3.axisLeft(scaleY));

}

function updateRect(selection, key){

    // Introduce new data elements
    selection
            .enter()
            .append("rect")
                .attr("class", "data_rect")
                .attr("x", function(d) { return scaleX(d.group); })
                .attr("y", function(d) { return scaleY(d.value); })
                .attr("width", scaleX.bandwidth())
                .attr("height", function(d) { return plotHeight - scaleY(d.value); })
                .attr("fill", "#0099CC")
            .merge(selection)
                .attr("class", "data_rect")
                .transition(1000)
                .attr("x", function(d) { return scaleX(d.group); })
                .attr("y", function(d) { return scaleY(d.value); })
                .attr("width", scaleX.bandwidth())
                .attr("height", function(d) { return plotHeight - scaleY(d.value); })
                .attr("fill", "#0099CC")

    // Remove groups not in data
    selection
            .exit()
            .transition()
            .duration(500)
            .attr('height', 0)
            .remove()

    // Apply interactivity
    d3.selectAll('rect.data_rect')
        .on('mouseenter', function (actual, i) {

            d3.select(this)
                .attr('opacity', 0.5)
                .style("stroke", "1")
                .style("stroke", "black")

            Tooltip
                .style("opacity", 1)

            TooltipSummary
                .style("opacity", 1)
        })
        .on('mouseleave', function (actual, i) {

            d3.select(this)
                .attr('opacity', 1)
                .style("stroke", "none")

            Tooltip
                .style("opacity", 0)

            TooltipSummary
                .style("opacity", 0)
        })
        .on('mousemove', function (d) {

            var string = `Year: ${key} <br>Country: ${d.group} <br>Attacks on Males: ${d.male} <br>Attacks on Females: ${d.female} <br>Total Attacks: ${d.value} <br>Fatal Attacks: ${d.fatal}`

            Tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .html(string)
        })

}

// Update plots with the given key
function updateChartBar(key) {

    var data = null
    var annotations = null

    console.log(key)

    // Grab relevant data
    var obj = getDataByYear(key)
    var data = obj.data
    var annotations = obj.annotations

    // Update chart title
    d3.selectAll('text.chart-title')
        .text(`Year: ${key}`)

    // Sort the data
    data.sort(function(a, b) {
                return d3.descending(a.value, b.value)
                })

    // Bind data to rectangles
    var bars = svg
                .selectAll("rect")
                .data(data)

    // Update chart
    updateAxesBar(data)
    updateRect(bars, key)
    updateAnnotations(svg, annotations)

}
