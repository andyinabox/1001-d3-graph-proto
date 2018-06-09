import * as d3 from 'd3';

export default class NetworkGraph {
    constructor(id, data) {
        this.data = data;
        this.width = 1024;
        this.height = 768;
        this.svg = d3.select(id)
            .append('svg')
            .attr("width", this.width)
            .attr("height", this.height);
        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id( d => d.id ))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));

    }
    draw() {
        let link = this.svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.data.links)
            .enter().append("line");

        let node = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("foreignObject")
            .data(this.data.nodes)
            .enter().append("foreignObject")
            .attr("requiredExtensions", "http://www.w3.org/1999/xhtml")
            .attr("class", "node")
            .attr('width', 300)
            .attr('height', 400)
            .html(d => d.content);

        // node.append('body')
        //     .attr('xmlns', 'http://www.w3.org/1999/xhtml')
        //         .html(d => d.content);
        
        


        this.simulation
            .nodes(this.data.nodes)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(this.data.links);

        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; });
        }
    }

    dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

}
