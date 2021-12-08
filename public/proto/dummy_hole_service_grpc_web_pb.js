/**
 * @fileoverview gRPC-Web generated client stub for smart3dmap.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.smart3dmap = {};
proto.smart3dmap.v1 = require('./dummy_hole_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.smart3dmap.v1.DummyHoleServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.smart3dmap.v1.DummyHoleServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.smart3dmap.v1.DummyHoleServiceRequest,
 *   !proto.smart3dmap.v1.DummyHoleServiceReply>}
 */
const methodDescriptor_DummyHoleService_CreateDummyHoles = new grpc.web.MethodDescriptor(
  '/smart3dmap.v1.DummyHoleService/CreateDummyHoles',
  grpc.web.MethodType.UNARY,
  proto.smart3dmap.v1.DummyHoleServiceRequest,
  proto.smart3dmap.v1.DummyHoleServiceReply,
  /**
   * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.smart3dmap.v1.DummyHoleServiceReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.smart3dmap.v1.DummyHoleServiceRequest,
 *   !proto.smart3dmap.v1.DummyHoleServiceReply>}
 */
const methodInfo_DummyHoleService_CreateDummyHoles = new grpc.web.AbstractClientBase.MethodInfo(
  proto.smart3dmap.v1.DummyHoleServiceReply,
  /**
   * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.smart3dmap.v1.DummyHoleServiceReply.deserializeBinary
);


/**
 * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.smart3dmap.v1.DummyHoleServiceReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.smart3dmap.v1.DummyHoleServiceReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.smart3dmap.v1.DummyHoleServiceClient.prototype.createDummyHoles =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/smart3dmap.v1.DummyHoleService/CreateDummyHoles',
      request,
      metadata || {},
      methodDescriptor_DummyHoleService_CreateDummyHoles,
      callback);
};


/**
 * @param {!proto.smart3dmap.v1.DummyHoleServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.smart3dmap.v1.DummyHoleServiceReply>}
 *     A native promise that resolves to the response
 */
proto.smart3dmap.v1.DummyHoleServicePromiseClient.prototype.createDummyHoles =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/smart3dmap.v1.DummyHoleService/CreateDummyHoles',
      request,
      metadata || {},
      methodDescriptor_DummyHoleService_CreateDummyHoles);
};


module.exports = proto.smart3dmap.v1;

