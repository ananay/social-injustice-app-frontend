import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/useD3.js';
import mapData from "../model/us.geojson";

let width = 960;
let height = 500;

let mapSvg;

const Map = (props) => {

    const map_ref = useD3((svg) => {
        let mapSvg = svg
        let usaProjection = d3.geoAlbersUsa()
            .fitSize([+mapSvg.style('width').replace('px', ''), +mapSvg.style('width').replace('px', '')], mapData)
            .translate([width / 2, height / 2])
            .scale([1000]);

        let geoPath = d3.geoPath()
            .projection(usaProjection);


        let extent = [0.5, 1]

        let selectedColor = d3.interpolateViridis;

        let colorScale = d3.scaleSequential(selectedColor)
            .domain(extent);


        let tooltip =
            d3.select("body").append("div")
                .attr("id", "tooltip")
                .style("opacity", 0);


        d3.json(mapData).then((map_data) => {
            // Draw the map

            d3.select("g").remove();

            let g = mapSvg.append('g');

            /**
             * Draw the color scale
             */
            const linearGradient = g.append("defs")
                .append("linearGradient")
                .attr("id", "linear-gradient");
            linearGradient.selectAll("stop")
                .data(colorScale.ticks()
                    .map((t, i, n) => ({
                        offset: `${100 * i / n.length}%`,
                        color: colorScale(t)
                    })))
                .enter()
                .append("stop")
                .attr("offset", d => d.offset)
                .attr("stop-color", d => d.color);
            g.append("rect")
                .attr('transform', `translate(100,520)`)
                .attr("width", 400)
                .attr("height", 20)
                .style("fill", "url(#linear-gradient)");
            const colorAxis = d3.axisBottom(d3.scaleLinear()
                .domain(colorScale.domain())
                .range([0, 400]))
                .ticks(5).tickSize(-20);
            g.append('g').call(colorAxis)
                .attr('class', 'colorLegend')
                .attr('transform', 'translate(100,540)')
                .selectAll('text')
                .style('fill', "#fff")
                .style('text-anchor', 'end')
                .attr('dx', '-10px')
                .attr('dy', '0px')
                .attr('transform', 'rotate(-45)');
            g.append('text')
                .attr('x', 100)
                .attr('y', 510)
                .style('font-size', '.9em')
                .style('fill', "#fff")
                .text("State Index");


            /**
             * State map
             */
            g.selectAll('.stateMap')
                .data(map_data.features)
                .enter()
                .append('path')
                .attr('d', geoPath)
                .classed('stateMap', true)
                .attr('fill', (d, i) => {
                    // Get the color scale based on the national index
                    if (props.currentData.states_index_data != undefined) {
                        return colorScale(props.currentData.states_index_data["index"][d.properties.name])
                    } else {
                        return "#000"
                    }
                })
                .attr('stroke', (d, i) => {
                    if (d.properties.name == props.selectedMapState) {
                        return "#fff"
                    } else {
                        return "#0079C1"
                    }
                })
                .attr('stroke-width', (d, i) => {
                    if (d.properties.name == props.selectedMapState) {
                        return 4
                    } else {
                        return 1
                    }
                })
                .on('mouseover', function (d, i) {
                    d3.select(this)
                        .transition()
                        .style("stroke-width", "6")
                        .style("stroke", "#fff")

                    console.log(d.pageX)
                    console.log(d.pageY)

                    tooltip
                        .html(`
                            <div>
                                State: ${i.properties.name} <br />
                                Index: ${props.currentData.states_index_data["index"][i.properties.name]}
                            </div>
                        `)
                        .transition()
                        .style("left", (d.pageX - 25) + "px")
                        .style("top", (d.pageY + 40) + "px")
                        .style("opacity", 1)

                })
                .on('mouseout', function (d, i) {
                    // if (i.properties.name != props.selectedMapState) {
                    //     d3.select(this)
                    //         .transition()
                    //         .style("fill", (d, i) => {
                    //             if (props.currentData.states_index_data != undefined) {
                    //                 return colorScale(props.currentData.states_index_data["index"][d.properties.name])
                    //             } else {
                    //                 return "#000"
                    //             }
                    //         })
                    // }
                    if (i.properties.name != props.selectedMapState) {
                        d3.select(this)
                            .transition()
                            .style("stroke-width", "1")
                            .style("stroke", "#0079C1")
                    }
                })
                .on('click', (d, i) => {
                    props.setSelectedMapState(i.properties.name);
                });

        })


    })

    return (
        <div className='svg_container'>
            <svg ref={map_ref} id="map_svg"></svg>
        </div>
    )
}

export default Map;