// source: dummy_hole_service.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.smart3dmap.v1.A3dDot', null, global);
goog.exportSymbol('proto.smart3dmap.v1.DummyHoleServiceReply', null, global);
goog.exportSymbol('proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo', null, global);
goog.exportSymbol('proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo', null, global);
goog.exportSymbol('proto.smart3dmap.v1.DummyHoleServiceRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.smart3dmap.v1.A3dDot = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.smart3dmap.v1.A3dDot, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.smart3dmap.v1.A3dDot.displayName = 'proto.smart3dmap.v1.A3dDot';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.smart3dmap.v1.DummyHoleServiceRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.smart3dmap.v1.DummyHoleServiceRequest.repeatedFields_, null);
};
goog.inherits(proto.smart3dmap.v1.DummyHoleServiceRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.smart3dmap.v1.DummyHoleServiceRequest.displayName = 'proto.smart3dmap.v1.DummyHoleServiceRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.smart3dmap.v1.DummyHoleServiceReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.smart3dmap.v1.DummyHoleServiceReply.repeatedFields_, null);
};
goog.inherits(proto.smart3dmap.v1.DummyHoleServiceReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.smart3dmap.v1.DummyHoleServiceReply.displayName = 'proto.smart3dmap.v1.DummyHoleServiceReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.displayName = 'proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.repeatedFields_, null);
};
goog.inherits(proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.displayName = 'proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.smart3dmap.v1.A3dDot.prototype.toObject = function(opt_includeInstance) {
  return proto.smart3dmap.v1.A3dDot.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.smart3dmap.v1.A3dDot} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.A3dDot.toObject = function(includeInstance, msg) {
  var f, obj = {
    x: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    y: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    z: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.smart3dmap.v1.A3dDot}
 */
proto.smart3dmap.v1.A3dDot.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.smart3dmap.v1.A3dDot;
  return proto.smart3dmap.v1.A3dDot.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.smart3dmap.v1.A3dDot} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.smart3dmap.v1.A3dDot}
 */
proto.smart3dmap.v1.A3dDot.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setX(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setY(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setZ(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.smart3dmap.v1.A3dDot.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.smart3dmap.v1.A3dDot.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.smart3dmap.v1.A3dDot} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.A3dDot.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getX();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getY();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getZ();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
};


/**
 * optional double x = 1;
 * @return {number}
 */
proto.smart3dmap.v1.A3dDot.prototype.getX = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.A3dDot} returns this
 */
proto.smart3dmap.v1.A3dDot.prototype.setX = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional double y = 2;
 * @return {number}
 */
proto.smart3dmap.v1.A3dDot.prototype.getY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.A3dDot} returns this
 */
proto.smart3dmap.v1.A3dDot.prototype.setY = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional double z = 3;
 * @return {number}
 */
proto.smart3dmap.v1.A3dDot.prototype.getZ = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.A3dDot} returns this
 */
proto.smart3dmap.v1.A3dDot.prototype.setZ = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.smart3dmap.v1.DummyHoleServiceRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    mdlDbId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    mdlId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    dummyholeArcs: jspb.Message.getFieldWithDefault(msg, 3, 0),
    dummyholeRadius: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    rgnDotsList: jspb.Message.toObjectList(msg.getRgnDotsList(),
    proto.smart3dmap.v1.A3dDot.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.smart3dmap.v1.DummyHoleServiceRequest;
  return proto.smart3dmap.v1.DummyHoleServiceRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMdlDbId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMdlId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDummyholeArcs(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDummyholeRadius(value);
      break;
    case 5:
      var value = new proto.smart3dmap.v1.A3dDot;
      reader.readMessage(value,proto.smart3dmap.v1.A3dDot.deserializeBinaryFromReader);
      msg.addRgnDots(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.smart3dmap.v1.DummyHoleServiceRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMdlDbId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getMdlId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getDummyholeArcs();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getDummyholeRadius();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getRgnDotsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.smart3dmap.v1.A3dDot.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 mdl_db_id = 1;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.getMdlDbId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.setMdlDbId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 mdl_id = 2;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.getMdlId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.setMdlId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 dummyhole_arcs = 3;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.getDummyholeArcs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.setDummyholeArcs = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional double dummyhole_radius = 4;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.getDummyholeRadius = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.setDummyholeRadius = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * repeated A3dDot rgn_dots = 5;
 * @return {!Array<!proto.smart3dmap.v1.A3dDot>}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.getRgnDotsList = function() {
  return /** @type{!Array<!proto.smart3dmap.v1.A3dDot>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.smart3dmap.v1.A3dDot, 5));
};


/**
 * @param {!Array<!proto.smart3dmap.v1.A3dDot>} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest} returns this
*/
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.setRgnDotsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.smart3dmap.v1.A3dDot=} opt_value
 * @param {number=} opt_index
 * @return {!proto.smart3dmap.v1.A3dDot}
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.addRgnDots = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.smart3dmap.v1.A3dDot, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceRequest} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceRequest.prototype.clearRgnDotsList = function() {
  return this.setRgnDotsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.smart3dmap.v1.DummyHoleServiceReply.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.toObject = function(opt_includeInstance) {
  return proto.smart3dmap.v1.DummyHoleServiceReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    dummyholeDbId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    dummyholeId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    holeListList: jspb.Message.toObjectList(msg.getHoleListList(),
    proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.smart3dmap.v1.DummyHoleServiceReply;
  return proto.smart3dmap.v1.DummyHoleServiceReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDummyholeDbId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDummyholeId(value);
      break;
    case 3:
      var value = new proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo;
      reader.readMessage(value,proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.deserializeBinaryFromReader);
      msg.addHoleList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.smart3dmap.v1.DummyHoleServiceReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDummyholeDbId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getDummyholeId();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getHoleListList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    topElevation: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
    bottomElevation: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    stratCode: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo;
  return proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setTopElevation(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setBottomElevation(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setStratCode(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTopElevation();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getBottomElevation();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
  f = message.getStratCode();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional double top_elevation = 1;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.getTopElevation = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.setTopElevation = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional double bottom_elevation = 2;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.getBottomElevation = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.setBottomElevation = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional string strat_code = 3;
 * @return {string}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.getStratCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.prototype.setStratCode = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    layerInfoListList: jspb.Message.toObjectList(msg.getLayerInfoListList(),
    proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo;
  return proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo;
      reader.readMessage(value,proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.deserializeBinaryFromReader);
      msg.addLayerInfoList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLayerInfoListList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated LayerInfo layer_info_list = 1;
 * @return {!Array<!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo>}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.prototype.getLayerInfoListList = function() {
  return /** @type{!Array<!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo, 1));
};


/**
 * @param {!Array<!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo>} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo} returns this
*/
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.prototype.setLayerInfoListList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.prototype.addLayerInfoList = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.smart3dmap.v1.DummyHoleServiceReply.LayerInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo.prototype.clearLayerInfoListList = function() {
  return this.setLayerInfoListList([]);
};


/**
 * optional int32 dummyhole_db_id = 1;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.getDummyholeDbId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.setDummyholeDbId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 dummyhole_id = 2;
 * @return {number}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.getDummyholeId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.setDummyholeId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated HoleInfo hole_list = 3;
 * @return {!Array<!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo>}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.getHoleListList = function() {
  return /** @type{!Array<!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo, 3));
};


/**
 * @param {!Array<!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo>} value
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply} returns this
*/
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.setHoleListList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo}
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.addHoleList = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.smart3dmap.v1.DummyHoleServiceReply.HoleInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.smart3dmap.v1.DummyHoleServiceReply} returns this
 */
proto.smart3dmap.v1.DummyHoleServiceReply.prototype.clearHoleListList = function() {
  return this.setHoleListList([]);
};


goog.object.extend(exports, proto.smart3dmap.v1);
