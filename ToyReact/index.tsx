/* @jsx ToyReact.createElement */
import { ToyReact } from "./lib/index";
let a: any = (
  <div>
    <span id="a">Hello</span>
    <span>,</span>
    World!
  </div>
);

ToyReact.render(a, document.body);
