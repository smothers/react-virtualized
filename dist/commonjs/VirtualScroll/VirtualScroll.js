'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll(props, context) {
    _classCallCheck(this, VirtualScroll);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).call(this, props, context));

    _this._cellRenderer = _this._cellRenderer.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    _this._wrapIndexGetter = _this._wrapIndexGetter.bind(_this);
    return _this;
  }

  _createClass(VirtualScroll, [{
    key: 'forceUpdateGrid',
    value: function forceUpdateGrid() {
      this._Grid.forceUpdate();
    }

    /** See Grid#measureAllCells */

  }, {
    key: 'measureAllRows',
    value: function measureAllRows() {
      this._Grid.measureAllCells();
    }

    /** See Grid#recomputeGridSize */

  }, {
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this._Grid.recomputeGridSize({
        rowIndex: index
      });
      this.forceUpdateGrid();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var autoHeight = _props.autoHeight;
      var className = _props.className;
      var estimatedRowSize = _props.estimatedRowSize;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var rowHeight = _props.rowHeight;
      var overscanRowCount = _props.overscanRowCount;
      var rowClassName = _props.rowClassName;
      var rowCount = _props.rowCount;
      var rowStyle = _props.rowStyle;
      var scrollToAlignment = _props.scrollToAlignment;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var style = _props.style;
      var tabIndex = _props.tabIndex;
      var width = _props.width;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);
      var cellClassName = this._wrapIndexGetter(rowClassName);
      var cellStyle = this._wrapIndexGetter(rowStyle);

      return _react2.default.createElement(_Grid2.default, {
        ref: function ref(c) {
          _this2._Grid = c;
        },
        'aria-label': this.props['aria-label'],
        className: classNames,
        cellRenderer: this._cellRenderer,
        cellClassName: cellClassName,
        cellStyle: cellStyle,
        columnWidth: width,
        columnCount: 1,
        estimatedRowSize: estimatedRowSize,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: this._onScroll,
        onSectionRendered: this._onSectionRendered,
        overscanRowCount: overscanRowCount,
        autoHeight: autoHeight,
        rowHeight: rowHeight,
        rowCount: rowCount,
        scrollToAlignment: scrollToAlignment,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        style: style,
        tabIndex: tabIndex,
        width: width
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_cellRenderer',
    value: function _cellRenderer(_ref) {
      var columnIndex = _ref.columnIndex;
      var isScrolling = _ref.isScrolling;
      var rowIndex = _ref.rowIndex;
      var rowRenderer = this.props.rowRenderer;


      return rowRenderer({
        index: rowIndex,
        isScrolling: isScrolling
      });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref2) {
      var clientHeight = _ref2.clientHeight;
      var scrollHeight = _ref2.scrollHeight;
      var scrollTop = _ref2.scrollTop;
      var onScroll = this.props.onScroll;


      onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref3) {
      var rowOverscanStartIndex = _ref3.rowOverscanStartIndex;
      var rowOverscanStopIndex = _ref3.rowOverscanStopIndex;
      var rowStartIndex = _ref3.rowStartIndex;
      var rowStopIndex = _ref3.rowStopIndex;
      var onRowsRendered = this.props.onRowsRendered;


      onRowsRendered({
        overscanStartIndex: rowOverscanStartIndex,
        overscanStopIndex: rowOverscanStopIndex,
        startIndex: rowStartIndex,
        stopIndex: rowStopIndex
      });
    }
  }, {
    key: '_wrapIndexGetter',
    value: function _wrapIndexGetter(value) {
      return value instanceof Function ? function (_ref4) {
        var rowIndex = _ref4.rowIndex;
        return value({ index: rowIndex });
      } : function () {
        return value;
      };
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  autoHeight: _react.PropTypes.bool,

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /**
   * Used to estimate the total height of a VirtualScroll before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  estimatedRowSize: _react.PropTypes.number.isRequired,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * ({ index: number }): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index; ({ index: number }): node */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Optional custom CSS class for individual rows */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /** Number of rows in list. */
  rowCount: _react.PropTypes.number.isRequired,

  /** Optional custom styles for individual cells */
  rowStyle: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),

  /** See Grid#scrollToAlignment */
  scrollToAlignment: _react.PropTypes.oneOf(['auto', 'end', 'start', 'center']).isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Optional inline style */
  style: _react.PropTypes.object,

  /** Tab index for focus */
  tabIndex: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  estimatedRowSize: 30,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowCount: 10,
  scrollToAlignment: 'auto',
  style: {}
};
exports.default = VirtualScroll;