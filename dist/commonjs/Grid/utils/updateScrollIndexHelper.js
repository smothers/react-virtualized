'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateScrollIndexHelper;

var _getUpdatedOffsetForIndex = require('../../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 * This function also ensures that the scroll ofset isn't past the last column/row of cells.
 *
 * @param cellsSize Width or height of cells for the current axis
 * @param cellSizeAndPositionManager Manages size and position metadata of cells
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an scroll-to-index value
 */
function updateScrollIndexHelper(_ref) {
  var cellSize = _ref.cellSize;
  var cellSizeAndPositionManager = _ref.cellSizeAndPositionManager;
  var previousCellsCount = _ref.previousCellsCount;
  var previousCellSize = _ref.previousCellSize;
  var previousScrollToAlignment = _ref.previousScrollToAlignment;
  var previousScrollToIndex = _ref.previousScrollToIndex;
  var previousSize = _ref.previousSize;
  var scrollOffset = _ref.scrollOffset;
  var scrollToAlignment = _ref.scrollToAlignment;
  var scrollToIndex = _ref.scrollToIndex;
  var size = _ref.size;
  var updateScrollIndexCallback = _ref.updateScrollIndexCallback;

  var cellCount = cellSizeAndPositionManager.getCellCount();
  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToAlignment !== previousScrollToAlignment || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback(scrollToIndex);

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && cellCount > 0 && (size < previousSize || cellCount < previousCellsCount)) {
    scrollToIndex = cellCount - 1;

    var cellMetadatum = cellSizeAndPositionManager.getSizeAndPositionOfCell(scrollToIndex);
    var calculatedScrollOffset = (0, _getUpdatedOffsetForIndex2.default)({
      cellOffset: cellMetadatum.offset,
      cellSize: cellMetadatum.size,
      containerSize: size,
      currentOffset: scrollOffset
    });

    // Only adjust the scroll position if we've scrolled below the last set of rows.
    if (calculatedScrollOffset < scrollOffset) {
      updateScrollIndexCallback(cellCount - 1);
    }
  }
}