import React, { Component, PropTypes } from 'react';
import draggable from './Draggable';

class Map extends Component {
  getMapStyles () {
    const { map, mapActive } = Map.defaultStyles;
    return Object.assign({},
      map,
      this.props.style && this.props.style,
      this.props.active && mapActive
    );
  }

  getPointerStyles () {
    const { pointer, pointerDark, pointerLight } = Map.defaultStyles;
    return Object.assign({},
      pointer,
      this.props.pointerStyle && this.props.pointerStyle,
      {
        left: this.props.getPercentageValue(this.props.x),
        bottom: this.props.getPercentageValue(this.props.y)
      },
    );
  }

  getBgStyles () {
    const { bg } = Map.defaultStyles;
    const { backgroundColor } = this.props;
    return Object.assign({}, bg, { backgroundColor });
  }

  render () {
    const { bgOverlay } = Map.defaultStyles;
    return (
      <div
        className={this.props.className}
        style={this.getMapStyles()}
        onMouseDown={this.props.startUpdates}
        onTouchStart={this.props.startUpdates}>

        <div className="Map__Background" style={this.getBgStyles()}>
          <span className="Map__Background__overlay" style={bgOverlay} />
        </div>

        { this.props.rect && (
          <div className="Map__Pointer" style={this.getPointerStyles()} />
        )}
      </div>
    );
  }
}

Map.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  backgroundColor: React.PropTypes.string,
  className: React.PropTypes.string,
};

Map.defaultProps = {
  x: 0,
  y: 0,
  backgroundColor: 'transparent',
  className: 'Map',
};

Map.defaultStyles = {
  // Map
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'hidden',
    userSelect: 'none',
  },
  mapActive: {
    cursor: 'none',
  },

  // Pointer
  pointer: {
    position: 'absolute',
    width: 10,
    height: 10,
    marginLeft: -5,
    marginBottom: -5,
    borderRadius: '100%',
    border: '1px solid',
    willChange: 'auto',
  },

  // Background
  bg: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  bgOverlay: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%),
                 linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)`,
  },
};

export default draggable()(Map);
