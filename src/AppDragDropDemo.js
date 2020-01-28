import React, { Component } from "react";
import { connect } from "react-redux";

import { dragAction, updateItemAction } from "./store/actions/dragAction";

import "./AppDragDropDemo.css";

class AppDragDropDemo extends Component {
  type = "";
  state = {
    value: "",
    focused: null
  };
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
      type: this.type,
      value: ""
    };
    this.props.dropped(pos);
  };

  handleChange = (ev, idx) => {
    this.setState({
      value: ev.target.value
    });
  };

  onFocus = (e, idx) => {
    // onFocus
    this.setState({
      focused: idx,
      value: e.target.value
    });
  };

  onBlur = (e, idx) => {
    // onBlur
    this.props.updateItem(idx, e.target.value);
    this.setState({
      focused: null,
      value: ""
    });
  };

  render() {
    const { items } = this.props;
    const { focused, value } = this.state;
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
        {items.map((obj, idx) => {
          return (
            <div
              className="drawing-items"
              key={idx}
              style={{
                width: `${obj.type === "line" ? "2px" : "100px"}`,
                borderRadius: `${obj.type === "circle" ? "100%" : "0"}`,
                transform: `translate(${obj.x}px, ${obj.y}px)`,
                background: `${obj.type === 'line' ? '#000000': '#f0f8ff'}`
              }}
            >
              {obj.type !== "line" && (
                <textarea
                  name={"item_" + idx}
                  value={focused === idx ? value : obj.value}
                  onFocus={e => this.onFocus(e, idx)}
                  onBlur={e => this.onBlur(e, idx)}
                  onChange={ev => this.handleChange(ev, idx)}
                ></textarea>
              )}
            </div>
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
  dropped: item => dispatch(dragAction(item)),
  updateItem: (id, value) => dispatch(updateItemAction(id, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDragDropDemo);
