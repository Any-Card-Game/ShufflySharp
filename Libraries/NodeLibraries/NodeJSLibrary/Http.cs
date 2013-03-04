using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
namespace NodeJSLibrary
{
    [Imported]
    [ModuleName("http")]
    [IgnoreNamespace]
    public class Agent
    {
        private Agent() { }

        public int MaxSockets { get; set; }
    }
    [IgnoreNamespace]
    [Imported]
    public class Http : NodeModule
    {
        public Http() {}

        public HttpServer CreateServer(Action<HttpRequest, HttpResponse> callback)
        {
            return null;
        }
        public ClientRequest Get(RequestOptions options, Action<ClientResponse> callback) { return null; }
        public ClientRequest Get(string url, Action<ClientResponse> callback) { return null; }

    }
    [Imported]
    [Serializable]
    public class RequestOptions
    {
        public string Host { get; set; }

        public string Hostname { get; set; }

        public int? Port { get; set; }

        public string LocalAddress { get; set; }

        public string SocketPath { get; set; }

        public string Method { get; set; }

        public string Path { get; set; }

        public JsDictionary<string, string> Headers { get; set; }

        public string Auth { get; set; }

        /// <summary>
        /// Possible values are: Script.Undefined, an Agent, or 'false'
        /// </summary>
        public TypeOption<object, Agent, bool> Agent { get; set; }
    }
    [Imported]
    [ModuleName("http")]
    [IgnoreNamespace]
    public class ClientRequest : WritableStream
    {
        private ClientRequest() { }

        public void Abort() { }

        public void SetTimeout(int timeout) { }

        public void SetTimeout(int timeout, Action timeoutListener) { }

        public void SetNoDelay(bool noDelay) { }

        public void SetSocketKeepAlive(bool enable) { }

        public void SetSocketKeepAlive(bool enable, int initialDelay) { }


        public event Action<ClientResponse> OnResponse
        {
            [InlineCode("{this}.addListener('response', {value})")]
            add { }
            [InlineCode("{this}.removeListener('response', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('response', {callback})")]
        public void OnceRequest(Action<ClientResponse> callback) { }


        public event Action<ClientResponse> OnSocket
        {
            [InlineCode("{this}.addListener('socket', {value})")]
            add { }
            [InlineCode("{this}.removeListener('socket', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('socket', {callback})")]
        public void OnceSocket(Action<ClientResponse> callback) { }


        public event Action<ClientResponse, Socket, Buffer> OnConnect
        {
            [InlineCode("{this}.addListener('connect', {value})")]
            add { }
            [InlineCode("{this}.removeListener('connect', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('connect', {callback})")]
        public void OnceConnect(Action<ClientResponse, Socket, Buffer> callback) { }


        public event Action<ClientResponse, Socket, Buffer> OnUpgrade
        {
            [InlineCode("{this}.addListener('upgrade', {value})")]
            add { }
            [InlineCode("{this}.removeListener('upgrade', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('upgrade', {callback})")]
        public void OnceUpgrade(Action<ClientResponse, Socket, Buffer> callback) { }


        public event Action OnContinue
        {
            [InlineCode("{this}.addListener('continue', {value})")]
            add { }
            [InlineCode("{this}.removeListener('continue', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('continue', {callback})")]
        public void OnceContinue(Action callback) { }
    }
    [Imported]
    [Serializable]
    public class SocketAddress
    {
        public int Port { get; set; }
        public string Family { get; set; }
        public string Address { get; set; }

        public SocketAddress(int port, string family, string address)
        {
        }
    }
    [Imported]
    [NamedValues]
    public enum SocketType
    {
        Tcp4,
        Tcp6,
        Unix,
    }

    [Imported]
    [Serializable]
    public class SocketOptions
    {
        public int? Fd { get; set; }
        public SocketType? Type { get; set; }
        public bool? AllowHalfOpen { get; set; }
    }
    [Serializable]
    [Imported]
    public class PipeOptions
    {
        public bool? End { get; set; }

        public PipeOptions()
        {
        }

        public PipeOptions(bool? end)
        {
        }
    }
    [Imported]
    public class ReadWriteStream : EventEmitter
    {
        [NonScriptable]
        public ReadWriteStream() { }

        // Hacky stuff
        [ScriptSkip]
        public static implicit operator ReadableStream(ReadWriteStream s) { return null; }

        [ScriptSkip]
        public static implicit operator WritableStream(ReadWriteStream s) { return null; }

        [ScriptSkip]
        public static explicit operator ReadWriteStream(ReadableStream s) { return null; }

        [ScriptSkip]
        public static explicit operator ReadWriteStream(WritableStream s) { return null; }

        // ReadableStream

        [IntrinsicProperty]
        public bool Readable { get; private set; }

        public void SetEncoding(Encoding encoding) { }

        public void Pause() { }

        public void Resume() { }

        public void Destroy() { }

        public void Pipe(WritableStream dest) { }

        public void Pipe(WritableStream dest, PipeOptions options) { }


        public event Action<Buffer> OnData
        {
            [InlineCode("{this}.addListener('data', {value})")]
            add { }
            [InlineCode("{this}.removeListener('data', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('data', {callback})")]
        public void OnceData(Action<Buffer> callback) { }


        public event Action<string> OnEncodedData
        {
            [InlineCode("{this}.addListener('data', {value})")]
            add { }
            [InlineCode("{this}.removeListener('data', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('data', {callback})")]
        public void OnceEncodedData(Action<string> callback) { }


        public event Action OnEnd
        {
            [InlineCode("{this}.addListener('end', {value})")]
            add { }
            [InlineCode("{this}.removeListener('end', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('end', {callback})")]
        public void OnceEnd(Action callback) { }


        public event Action<Error> OnError
        {
            [InlineCode("{this}.addListener('error', {value})")]
            add { }
            [InlineCode("{this}.removeListener('error', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('error', {callback})")]
        public void OnceError(Action<Error> callback) { }


        public event Action OnClose
        {
            [InlineCode("{this}.addListener('close', {value})")]
            add { }
            [InlineCode("{this}.removeListener('close', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('close', {callback})")]
        public void OnceClose(Action callback) { }

        // WritableStream

        [IntrinsicProperty]
        public bool Writable { get; private set; }

        public bool Write(string data) { return false; }

        public bool Write(string data, Encoding encoding) { return false; }

        public bool Write(Buffer data) { return false; }

        public void End() { }

        public void End(string data) { }

        public void End(string data, Encoding encoding) { }

        public void End(Buffer data) { }

        public void DestroySoon() { }


        public event Action OnDrain
        {
            [InlineCode("{this}.addListener('drain', {value})")]
            add { }
            [InlineCode("{this}.removeListener('drain', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('drain', {callback})")]
        public void OnceDrain(Action callback) { }


        public event Action OnPipe
        {
            [InlineCode("{this}.addListener('pipe', {value})")]
            add { }
            [InlineCode("{this}.removeListener('pipe', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('pipe', {callback})")]
        public void OncePipe(Action callback) { }
    }
    [Imported]
    [ModuleName("net")]
    [IgnoreNamespace]
    public class Socket : ReadWriteStream
    {
        public Socket()
        {
        }

        public Socket(SocketOptions options)
        {
        }

        public void Connect(int port) { }

        public void Connect(int port, string host) { }

        public void Connect(int port, Action<Socket> connectListener) { }

        public void Connect(int port, string host, Action<Socket> connectListener) { }

        public void Connect(string path) { }

        public void Connect(string path, Action<Socket> connectListener) { }


        [IntrinsicProperty]
        public int BufferSize { get; private set; }


        public void SetTimeout(int timeout) { }

        public void SetTimeout(int timeout, Action callback) { }

        public void SetNoDelay() { }

        public void SetNoDelay(bool noDelay) { }

        public void SetKeepAlive(bool enable) { }

        public void SetKeepAlive(bool enable, int initialDelay) { }

        public SocketAddress Address { [ScriptName("address")] get; private set; }

        [IntrinsicProperty]
        public string RemoteAddress { get; private set; }

        [IntrinsicProperty]
        public int RemotePort { get; private set; }

        [IntrinsicProperty]
        public int BytesRead { get; private set; }

        [IntrinsicProperty]
        public int BytesWritten { get; private set; }


        public event Action OnConnect
        {
            [InlineCode("{this}.addListener('connect', {value})")]
            add { }
            [InlineCode("{this}.removeListener('connect', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('connect', {callback})")]
        public void OnceConnect(Action callback) { }


        public event Action OnTimeout
        {
            [InlineCode("{this}.addListener('timeout', {value})")]
            add { }
            [InlineCode("{this}.removeListener('timeout', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('timeout', {callback})")]
        public void OnceTimeout(Action callback) { }


        public new event Action<bool> OnClose
        {
            [InlineCode("{this}.addListener('close', {value})")]
            add { }
            [InlineCode("{this}.removeListener('close', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('close', {callback})")]
        public void OnceClose(Action<bool> callback) { }
    }
    [Imported]
    [ModuleName("http")]
    [IgnoreNamespace]
    public class ClientResponse : ReadableStream
    {
        private ClientResponse() { }

        [IntrinsicProperty]
        public int StatusCode { get; private set; }

        [IntrinsicProperty]
        public string HttpVersion { get; private set; }

        [IntrinsicProperty]
        public JsDictionary<string, string> Headers { get; private set; }

        [IntrinsicProperty]
        public JsDictionary<string, string> Trailers { get; private set; }
    }
    [Imported]
    public class ReadableStream : EventEmitter
    {
        [NonScriptable]
        public ReadableStream() { }

        [IntrinsicProperty]
        public bool Readable { get; private set; }

        public void SetEncoding(Encoding encoding) { }

        public void Pause() { }

        public void Resume() { }

        public void Destroy() { }

        public void Pipe(WritableStream dest) { }

        public void Pipe(WritableStream dest, PipeOptions options) { }


        public event Action<Buffer> OnData
        {
            [InlineCode("{this}.addListener('data', {value})")]
            add { }
            [InlineCode("{this}.removeListener('data', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('data', {callback})")]
        public void OnceData(Action<Buffer> callback) { }


        public event Action<string> OnEncodedData
        {
            [InlineCode("{this}.addListener('data', {value})")]
            add { }
            [InlineCode("{this}.removeListener('data', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('data', {callback})")]
        public void OnceEncodedData(Action<string> callback) { }


        public event Action OnEnd
        {
            [InlineCode("{this}.addListener('end', {value})")]
            add { }
            [InlineCode("{this}.removeListener('end', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('end', {callback})")]
        public void OnceEnd(Action callback) { }


        public event Action<Error> OnError
        {
            [InlineCode("{this}.addListener('error', {value})")]
            add { }
            [InlineCode("{this}.removeListener('error', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('error', {callback})")]
        public void OnceError(Action<Error> callback) { }


        public event Action OnClose
        {
            [InlineCode("{this}.addListener('close', {value})")]
            add { }
            [InlineCode("{this}.removeListener('close', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('close', {callback})")]
        public void OnceClose(Action callback) { }
    }
    [Imported]
    [ModuleName("buffer")]
    [IgnoreNamespace]
    public class Buffer
    {
        public Buffer(int size) { }

        public Buffer(Array data) { }

        public Buffer(string data) { }

        public Buffer(string data, Encoding encoding) { }


        public int Write(string data) { return 0; }

        public int Write(string data, int offset) { return 0; }

        public int Write(string data, int offset, int length) { return 0; }

        public int Write(string data, int offset, int length, Encoding encoding) { return 0; }


        public string ToString(Encoding encoding) { return null; }

        public string ToString(Encoding encoding, int start) { return null; }

        public string ToString(Encoding encoding, int start, int end) { return null; }


        [IntrinsicProperty]
        public byte this[int index] { get { return 0; } set { } }

        [IntrinsicProperty]
        public int Length { get; private set; }


        public void Copy(Buffer targetBuffer) { }

        public void Copy(Buffer targetBuffer, int targetStart) { }

        public void Copy(Buffer targetBuffer, int targetStart, int sourceStart) { }

        public void Copy(Buffer targetBuffer, int targetStart, int sourceStart, int sourceEnd) { }


        public Buffer Slice() { return null; }

        public Buffer Slice(int start) { return null; }

        public Buffer Slice(int start, int end) { return null; }


        public byte ReadUInt8(int offset) { return 0; }
        public byte ReadUInt8(int offset, bool noAssert) { return 0; }

        public ushort ReadUInt16LE(int offset) { return 0; }
        public ushort ReadUInt16LE(int offset, bool noAssert) { return 0; }

        public ushort ReadUInt16BE(int offset) { return 0; }
        public ushort ReadUInt16BE(int offset, bool noAssert) { return 0; }

        public uint ReadUInt32LE(int offset) { return 0; }
        public uint ReadUInt32LE(int offset, bool noAssert) { return 0; }

        public uint ReadUInt32BE(int offset) { return 0; }
        public uint ReadUInt32BE(int offset, bool noAssert) { return 0; }

        public sbyte ReadInt8(int offset) { return 0; }
        public sbyte ReadInt8(int offset, bool noAssert) { return 0; }

        public short ReadInt16LE(int offset) { return 0; }
        public short ReadInt16LE(int offset, bool noAssert) { return 0; }

        public short ReadInt16BE(int offset) { return 0; }
        public short ReadInt16BE(int offset, bool noAssert) { return 0; }

        public int ReadInt32LE(int offset) { return 0; }
        public int ReadInt32LE(int offset, bool noAssert) { return 0; }

        public int ReadInt32BE(int offset) { return 0; }
        public int ReadInt32BE(int offset, bool noAssert) { return 0; }

        public float ReadFloatLE(int offset) { return 0; }
        public float ReadFloatLE(int offset, bool noAssert) { return 0; }

        public float ReadFloatBE(int offset) { return 0; }
        public float ReadFloatBE(int offset, bool noAssert) { return 0; }

        public double ReadDoubleLE(int offset) { return 0; }
        public double ReadDoubleLE(int offset, bool noAssert) { return 0; }

        public double ReadDoubleBE(int offset) { return 0; }
        public double ReadDoubleBE(int offset, bool noAssert) { return 0; }


        public void WriteUInt8(byte value, int offset) { }
        public void WriteUInt8(byte value, int offset, bool noAssert) { }

        public void WriteUInt16LE(ushort value, int offset) { }
        public void WriteUInt16LE(ushort value, int offset, bool noAssert) { }

        public void WriteUInt16BE(ushort value, int offset) { }
        public void WriteUInt16BE(ushort value, int offset, bool noAssert) { }

        public void WriteUInt32LE(uint value, int offset) { }
        public void WriteUInt32LE(uint value, int offset, bool noAssert) { }

        public void WriteUInt32BE(uint value, int offset) { }
        public void WriteUInt32BE(uint value, int offset, bool noAssert) { }

        public void WriteInt8(sbyte value, int offset) { }
        public void WriteInt8(sbyte value, int offset, bool noAssert) { }

        public void WriteInt16LE(short value, int offset) { }
        public void WriteInt16LE(short value, int offset, bool noAssert) { }

        public void WriteInt16BE(short value, int offset) { }
        public void WriteInt16BE(short value, int offset, bool noAssert) { }

        public void WriteInt32LE(int value, int offset) { }
        public void WriteInt32LE(int value, int offset, bool noAssert) { }

        public void WriteInt32BE(int value, int offset) { }
        public void WriteInt32BE(int value, int offset, bool noAssert) { }

        public void WriteFloatLE(float value, int offset) { }
        public void WriteFloatLE(float value, int offset, bool noAssert) { }

        public void WriteFloatBE(float value, int offset) { }
        public void WriteFloatBE(float value, int offset, bool noAssert) { }

        public void WriteDoubleLE(double value, int offset) { }
        public void WriteDoubleLE(double value, int offset, bool noAssert) { }

        public void WriteDoubleBE(double value, int offset) { }
        public void WriteDoubleBE(double value, int offset, bool noAssert) { }


        public void Fill(byte value) { }

        public void Fill(byte value, int offset) { }

        public void Fill(byte value, int offset, int end) { }


        public void Fill(string value) { }

        public void Fill(string value, int offset) { }

        public void Fill(string value, int offset, int end) { }


        public static bool IsBuffer(object obj) { return false; }

        public static int ByteLength(string data) { return 0; }

        public static int ByteLength(string data, Encoding encoding) { return 0; }

        public static Buffer Concat(Buffer[] buffers) { return null; }

        public static Buffer Concat(Buffer[] buffers, int totalLength) { return null; }
    }
    [Imported]
    [NamedValues]
    public enum Encoding
    {
        Ascii,
        Utf8,
        Utf16le,
        Base64,
        Binary,
        Hex
    }
    [Imported]
    public class WritableStream : EventEmitter
    {
        [NonScriptable]
        public WritableStream() { }

        [IntrinsicProperty]
        public bool Writable { get; private set; }

        public bool Write(string data) { return false; }

        public bool Write(string data, Encoding encoding) { return false; }

        public bool Write(Buffer data) { return false; }

        public void End() { }

        public void End(string data) { }

        public void End(string data, Encoding encoding) { }

        public void End(Buffer data) { }

        public void Destroy() { }

        public void DestroySoon() { }


        public event Action OnDrain
        {
            [InlineCode("{this}.addListener('drain', {value})")]
            add { }
            [InlineCode("{this}.removeListener('drain', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('drain', {callback})")]
        public void OnceDrain(Action callback) { }


        public event Action<Error> OnError
        {
            [InlineCode("{this}.addListener('error', {value})")]
            add { }
            [InlineCode("{this}.removeListener('error', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('error', {callback})")]
        public void OnceError(Action<Error> callback) { }


        public event Action OnClose
        {
            [InlineCode("{this}.addListener('close', {value})")]
            add { }
            [InlineCode("{this}.removeListener('close', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('close', {callback})")]
        public void OnceClose(Action callback) { }


        public event Action OnPipe
        {
            [InlineCode("{this}.addListener('pipe', {value})")]
            add { }
            [InlineCode("{this}.removeListener('pipe', {value})")]
            remove { }
        }

        [InlineCode("{this}.once('pipe', {callback})")]
        public void OncePipe(Action callback) { }
    }
}