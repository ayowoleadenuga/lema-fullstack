const React = require("react");

const SvgrMock = React.forwardRef((props, ref) => (
  <span data-testid="delete-icon" ref={ref} {...props} />
));

module.exports = SvgrMock;
module.exports.ReactComponent = SvgrMock;
