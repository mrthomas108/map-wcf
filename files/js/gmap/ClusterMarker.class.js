/**
 * ClusterMarker creates a marker that shows the number of markers that
 * a cluster contains.
 *
 * @constructor
 * @private
 * @param {GLatLng} latlng Marker's lat and lng.
 * @param {Number} count Number to show.
 * @license	Apache License 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 */
function ClusterMarker(latlng, count) {
  var styles = [];
  var padding = 60;
  var sizes = [53, 56, 66, 78, 90];

  var i = 0;
  for (i = 1; i <= 5; ++i) {
    styles.push({
      'url': "http://gmaps-utility-library.googlecode.com/svn/trunk/markerclusterer/images/m" + i + ".png",
      'height': sizes[i - 1],
      'width': sizes[i - 1]
    });
  }

  var index = 0;
  var dv = count;
  while (dv !== 0) {
    dv = parseInt(dv / 10, 10);
    index ++;
  }

  if (styles.length < index) {
    index = styles.length;
  }
  this.url_ = styles[index - 1].url;
  this.height_ = styles[index - 1].height;
  this.width_ = styles[index - 1].width;
  this.textColor_ = styles[index - 1].opt_textColor;
  this.anchor_ = styles[index - 1].opt_anchor;
  this.latlng_ = latlng;
  this.index_ = index;
  this.styles_ = styles;
  this.text_ = count;
  this.padding_ = padding;
}

ClusterMarker.prototype = new GOverlay();

/**
 * Initialize cluster marker.
 * @private
 */
ClusterMarker.prototype.initialize = function (map) {
  this.map_ = map;
  var div = document.createElement("div");
  var latlng = this.latlng_;
  var pos = map.fromLatLngToDivPixel(latlng);
  pos.x -= parseInt(this.width_ / 2, 10);
  pos.y -= parseInt(this.height_ / 2, 10);
  var mstyle = "";
  if (document.all) {
    mstyle = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="' + this.url_ + '");';
  } else {
    mstyle = "background:url(" + this.url_ + ");";
  }
  if (typeof this.anchor_ === "object") {
    if (typeof this.anchor_[0] === "number" && this.anchor_[0] > 0 && this.anchor_[0] < this.height_) {
      mstyle += 'height:' + (this.height_ - this.anchor_[0]) + 'px;padding-top:' + this.anchor_[0] + 'px;';
    } else {
      mstyle += 'height:' + this.height_ + 'px;line-height:' + this.height_ + 'px;';
    }
    if (typeof this.anchor_[1] === "number" && this.anchor_[1] > 0 && this.anchor_[1] < this.width_) {
      mstyle += 'width:' + (this.width_ - this.anchor_[1]) + 'px;padding-left:' + this.anchor_[1] + 'px;';
    } else {
      mstyle += 'width:' + this.width_ + 'px;text-align:center;';
    }
  } else {
    mstyle += 'height:' + this.height_ + 'px;line-height:' + this.height_ + 'px;';
    mstyle += 'width:' + this.width_ + 'px;text-align:center;';
  }
  var txtColor = this.textColor_ ? this.textColor_ : 'black';

  div.style.cssText = mstyle + 'cursor:pointer;top:' + pos.y + "px;left:" +
      pos.x + "px;color:" + txtColor +  ";position:absolute;font-size:11px;" +
      'font-family:Arial,sans-serif;font-weight:bold';
  div.innerHTML = this.text_;
  map.getPane(G_MAP_MAP_PANE).appendChild(div);
  var padding = this.padding_;
  GEvent.addDomListener(div, "click", function () {
    var pos = map.fromLatLngToDivPixel(latlng);
    var sw = new GPoint(pos.x - padding, pos.y + padding);
    sw = map.fromDivPixelToLatLng(sw);
    var ne = new GPoint(pos.x + padding, pos.y - padding);
    ne = map.fromDivPixelToLatLng(ne);
    var zoom = map.getBoundsZoomLevel(new GLatLngBounds(sw, ne), map.getSize());
    map.setCenter(latlng, zoom);
  });
  this.div_ = div;
};

/**
 * Remove this overlay.
 * @private
 */
ClusterMarker.prototype.remove = function () {
  this.div_.parentNode.removeChild(this.div_);
};

/**
 * Copy this overlay.
 * @private
 */
ClusterMarker.prototype.copy = function () {
  return new ClusterMarker(this.latlng_, this.index_, this.text_, this.styles_, this.padding_);
};

/**
 * Redraw this overlay.
 * @private
 */
ClusterMarker.prototype.redraw = function (force) {
  if (!force) {
    return;
  }
  var pos = this.map_.fromLatLngToDivPixel(this.latlng_);
  pos.x -= parseInt(this.width_ / 2, 10);
  pos.y -= parseInt(this.height_ / 2, 10);
  this.div_.style.top =  pos.y + "px";
  this.div_.style.left = pos.x + "px";
};

/**
 * Hide this cluster marker.
 */
ClusterMarker.prototype.hide = function () {
  this.div_.style.display = "none";
};

/**
 * Show this cluster marker.
 */
ClusterMarker.prototype.show = function () {
  this.div_.style.display = "";
};

/**
 * Get whether the cluster marker is hidden.
 * @return {Boolean}
 */
ClusterMarker.prototype.isHidden = function () {
  return this.div_.style.display === "none";
};
