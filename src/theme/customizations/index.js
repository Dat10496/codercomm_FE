import Link from "./Link";
import Lists from "./Lists";
import Card from "./Card";
import IconButton from "./IconButton";

function customizationComponents(theme) {
  return {
    ...Link(theme),
    ...Lists(theme),
    ...Card(theme),
    ...IconButton(theme),
  };
}

export default customizationComponents;
