'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

var WindowScroller = function (_Component) {
  _inherits(WindowScroller, _Component);

  function WindowScroller(props) {
    _classCallCheck(this, WindowScroller);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowScroller).call(this, props));

    _this.state = {
      scrollTop: 0,
      height: 0
    };

    _this._onScrollWindow = _this._onScrollWindow.bind(_this);
    _this._onResizeWindow = _this._onResizeWindow.bind(_this);
    _this._enablePointerEventsAfterDelayCallback = _this._enablePointerEventsAfterDelayCallback.bind(_this);
    return _this;
  }

  _createClass(WindowScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._positionFromTop = _reactDom2.default.findDOMNode(this).getBoundingClientRect().top;

      this.setState({ height: window.innerHeight });

      window.addEventListener('scroll', this._onScrollWindow, false);
      window.addEventListener('resize', this._onResizeWindow, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._onScrollWindow, false);
      window.removeEventListener('resize', this._onResizeWindow, false);
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this2 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this2._setNextStateAnimationFrameId = null;
        _this2.setState(state);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var scrollTop = _state.scrollTop;
      var height = _state.height;


      return _react2.default.createElement(
        'div',
        null,
        children({
          height: height,
          scrollTop: scrollTop
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(this._enablePointerEventsAfterDelayCallback, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_enablePointerEventsAfterDelayCallback',
    value: function _enablePointerEventsAfterDelayCallback() {
      this._disablePointerEventsTimeoutId = null;

      document.body.style.pointerEvents = this._originalBodyPointerEvents;

      this._originalBodyPointerEvents = null;
    }
  }, {
    key: '_onResizeWindow',
    value: function _onResizeWindow(event) {
      var onResize = this.props.onResize;


      var height = window.innerHeight || 0;

      this.setState({ height: height });

      onResize({ height: height });
    }
  }, {
    key: '_onScrollWindow',
    value: function _onScrollWindow(event) {
      var onScroll = this.props.onScroll;

      // In IE10+ scrollY is undefined, so we replace that with the latter

      var scrollY = 'scrollY' in window ? window.scrollY : document.documentElement.scrollTop;

      var scrollTop = Math.max(0, scrollY - this._positionFromTop);

      this._setNextState({ scrollTop: scrollTop });

      if (this._originalBodyPointerEvents == null) {
        this._originalBodyPointerEvents = document.body.style.pointerEvents;

        document.body.style.pointerEvents = 'none';

        this._enablePointerEventsAfterDelay();
      }

      onScroll({ scrollTop: scrollTop });
    }
  }]);

  return WindowScroller;
}(_react.Component);

WindowScroller.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-resize: ({ height }) */
  onResize: _react.PropTypes.func.isRequired,

  /** Callback to be invoked on-scroll: ({ scrollTop }) */
  onScroll: _react.PropTypes.func.isRequired
};
WindowScroller.defaultProps = {
  onResize: function onResize() {},
  onScroll: function onScroll() {}
};
exports.default = WindowScroller;