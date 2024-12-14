const React = require("react");

const IconMock = React.forwardRef((props, ref) => (
  <span
    ref={ref}
    {...props}
    data-testid={props["data-testid"] || "icon-mock"}
  />
));

module.exports = IconMock;
module.exports.default = IconMock;
