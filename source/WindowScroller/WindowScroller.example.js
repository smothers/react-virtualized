/** @flow */
import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox'
import WindowScroller from './WindowScroller'
import VirtualScroll from '../VirtualScroll'
import AutoSizer from '../AutoSizer'
import shallowCompare from 'react-addons-shallow-compare'
import styles from './WindowScroller.example.css'

export default class AutoSizerExample extends Component {
  static propTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired
  }

  constructor (props) {
    super(props)
    this._rowRenderer = this._rowRenderer.bind(this)
  }

  render () {
    const { list, ...props } = this.props

    return (
      <ContentBox
        {...props}
      >
        <ContentBoxHeader
          text='WindowScroller'
          sourceLink='https://github.com/bvaughn/react-virtualized/blob/master/source/WindowScroller/WindowScroller.example.js'
          docsLink='https://github.com/bvaughn/react-virtualized/blob/master/docs/WindowScroller.md'
        />

        <ContentBoxParagraph>
          This component decorates <code>VirtualScroll</code>, <code>FlexTable</code>, or any other component
          and manages the window scroll to scroll through the list
        </ContentBoxParagraph>

        <div className={styles.WindowScrollerWrapper}>
          <WindowScroller>
            {({ height, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <VirtualScroll
                    autoHeight
                    className={styles.VirtualScroll}
                    height={height}
                    rowCount={list.size}
                    rowHeight={30}
                    rowRenderer={this._rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </div>
      </ContentBox>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _rowRenderer ({ index }) {
    const { list } = this.props
    const row = list.get(index)

    return (
      <div
        key={index}
        className={styles.row}
        style={{ height: 30 }}
      >
        {row.name}
      </div>
    )
  }
}
