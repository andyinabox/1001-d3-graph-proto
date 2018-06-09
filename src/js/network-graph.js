import * as d3 from 'd3';

export default class NetworkGraph {
    constructor(id, data) {
        this.data = data;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // this.zoom = d3.zoom()
        //     .scaleExtent([1, 10])
        //     .on("zoom", zoomed);

        this.svg = d3.select(id)
            .append('svg')
            .attr("width", this.width)
            .attr("height", this.height)



        // d3.select(id)
        //     .call(this.zoom)
        //     .call(this.zoom.transform, d3.zoomIdentity)

        this.container = this.svg.append("g")

        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id).distance(500))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));

        
        // this.svg.append("rect")
        //     .attr("width", this.width)
        //     .attr("height", this.height)
        //     .style("fill", "none")
        //     .style("pointer-events", "all")
        //     .call(d3.zoom()
        //         .scaleExtent([1 / 2, 8])
        //         .on("zoom", zoomed));

        const zoomed = () => {
            // var t = d3.zoomIdentity
                // .translate(this.width / 2, this.height / 2)
                // .scale(d3.event.transform.k)
                // .translate(-fx, -fy);

            console.log('zoomed');
            // console.log(d3.event.transfor.k);
            // this.container.attr('transform', `translate(${t.x}px, ${t.y}px) scale(${t.k}, ${t.k})`);
            this.container.attr("transform", d3.event.transform);

            // context.save();
            // context.clearRect(0, 0, width, height);
            // context.translate(t.x, t.y);
            // context.scale(t.k, t.k);
            // drawPoints();
            // context.restore();
        }


        // this.drag = d3.drag()
        //     // .origin(function (d) { return d; })
        //     .on("dragstart", this.dragstarted.bind(this))
        //     .on("drag", this.dragged.bind(this))
        //     .on("dragend", this.dragended.bind(this));

    }
    draw() {
        let link = this.container.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.data.links)
            .enter().append("line");

        let node = this.container.append("g")
            .attr("class", "nodes")
            .selectAll("foreignObject")
            .data(this.data.nodes)
            .enter().append("foreignObject")
            .attr("requiredExtensions", "http://www.w3.org/1999/xhtml")
            .attr("class", "node")
            .attr('width', 500)
            .attr('height', 600)
            .html(d => d.content)
            .attr('transform', 'translate(-200, -200)')
            .call(d3.drag()
                .on("start", this.dragstarted.bind(this))
                .on("drag", this.dragged.bind(this))
                .on("end", this.dragended.bind(this)));

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
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }



    // dragstarted(d) {
    //     d3.event.sourceEvent.stopPropagation();
    //     d3.select(this).classed("dragging", true);
    // }

    // dragged(d) {
    //     d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    // }

    // dragended(d) {
    //     d3.select(this).classed("dragging", false);
    // }

}
