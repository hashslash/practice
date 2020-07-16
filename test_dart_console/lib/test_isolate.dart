import 'dart:io';
import 'dart:isolate';

class Worker {
  ReceivePort receivePort;

  Isolate isolate;

  Worker() {
    initiate();
  }

  Future<Isolate> initiate() async {
    receivePort = ReceivePort();
    isolate = await Isolate.spawn(entryPoint, receivePort.sendPort);
    receivePort.listen(onData);
  }

  Future<String> sendMessage() async {
    return 'a';
  }

  static void entryPoint(SendPort sendPort) {
    sleep(Duration(seconds: 5));
    sendPort.send("Done");
  }

  void onData(message) {
    print(message);
  }

  void close() {
    isolate.kill();
  }
}
