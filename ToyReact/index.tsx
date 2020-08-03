/* @jsx ToyReact.createElement */
import { ToyReact, Component } from "./lib/index";

class Text extends Component {
  render() {
    return (
      <div style={{ color: "blue", backgroundColor: "yellow" }}>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span id="a" className="red">
          {"Hello, "}
        </span>
        <span style="color:green;">World</span>
        {" !"}
        <Text />
        <button onClick={() => alert("123")}> Click Me </button>
      </div>
    );
  }
}

function tick() {
  ToyReact.render(<MyComponent />, document.body);
}

setInterval(tick, 1000);
