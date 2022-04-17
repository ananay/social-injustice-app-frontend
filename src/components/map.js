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

        d3.json(mapData).then((map_data) => {
            // Draw the map
            
            d3.select("g").remove();

            let g = mapSvg.append('g');

            g.selectAll('.stateMap')
                .data(map_data.features)
                .enter()
                .append('path')
                .attr('d', geoPath)
                .classed('stateMap', true)
                .attr('fill', (d, i) => {
                    if (d.properties.name == props.selectedMapState) {
                        return "#fff";
                    } else {
                        return "#000";
                    }
                })
                .attr('stroke', "#fff")
                .on('mouseover', function (d, i) {
                    d3.select(this)
                        .transition()
                        .style("fill", "#fff")
                })
                .on('mouseout', function (d, i) {
                    if (i.properties.name != props.selectedMapState) {
                        d3.select(this)
                            .transition()
                            .style("fill", "#000")
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