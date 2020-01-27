import React, { Component } from "react";
import { connect } from "react-redux";

import { dragAction } from "./store/actions/dragAction";

import "./AppDragDropDemo.css";

class AppDragDropDemo extends Component {
  type = "";
  handleDragStart = (ev, type) => {
    this.type = type;
    const yFact = type === "circle" ? 100 : type === "line" ? 200 : 0;
    const xFact = type === "line" ? 48 : 0;
    this.initialPos = {
      x: ev.pageX - xFact,
      y: ev.pageY - yFact
    };
  };

  handleDragOver = ev => {
    ev.preventDefault();
  };

  handleDrop = ev => {
    const pos = {
      x: ev.pageX - this.initialPos.x,
      y: ev.pageY - this.initialPos.y,
      type: this.type
    };
    this.props.dropped(pos);
  };
  render() {
    console.log(
      "TCL: AppDragDropDemo -> render -> this.props.items",
      this.props.items
    );
    const { items } = this.props;
    return (
      <div className="container-drag">
        <div>
          <div
            className="box square"
            onDragStart={e => this.handleDragStart(e, "square")}
            draggable
          ></div>
          <div
            className="box circle"
            onDragStart={e => this.handleDragStart(e, "circle")}
            draggable
          ></div>
          <div
            className="box line"
            onDragStart={e => this.handleDragStart(e, "line")}
            draggable
          ></div>
        </div>
        <div
          className="drawing"
          onDragOver={e => this.handleDragOver(e)}
          onDrop={e => this.handleDrop(e)}
        ></div>
        {items.map((obj, i) => {
          return (
            <div
              className="drawing-items"
              key={i}
              style={{
                width: `${obj.type === "line" ? "4px" : "100px"}`,
                borderRadius: `${obj.type === "circle" ? "100%" : "0"}`,
                transform: `translate(${obj.x}px, ${obj.y}px)`
              }}
            ></div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  items: store.dragReducer.items
});

const mapDispatchToProps = dispatch => ({
  dropped: item => dispatch(dragAction(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDragDropDemo);
