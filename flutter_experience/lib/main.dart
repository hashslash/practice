import 'package:flutter/material.dart';

void main() {
  runApp(FlutterExperienceApp());
}

class FlutterExperienceApp extends StatefulWidget {
  @override
  _FlutterExperienceAppState createState() => _FlutterExperienceAppState();
}

class _FlutterExperienceAppState extends State<FlutterExperienceApp> {
  ThemeData theme = ThemeData.dark();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Home(toggleTheme),
      theme: theme,
    );
  }

  void toggleTheme() {
    setState(() {
      theme = theme == ThemeData.dark() ? ThemeData.light() : ThemeData.dark();
    });
  }
}

class Home extends StatefulWidget {
  final Function toggleTheme;

  Home(this.toggleTheme);
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _index = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Title"),
        centerTitle: true,
      ),
      body: Container(
        child: Row(
          children: <Widget>[
            NavigationRail(
              onDestinationSelected: (index) {
                setState(() {
                  _index = index;
                });
              },
              elevation: 5,
              extended: false,
              // labelType: NavigationRailLabelType.selected,
              groupAlignment: -1, //insane
              leading: FlutterLogo(),
              trailing: FlutterLogo(),
              minExtendedWidth: 50,
              destinations: [
                NavigationRailDestination(
                  icon: Icon(Icons.plus_one),
                  label: Text("plus"),
                ),
                NavigationRailDestination(
                  label: Text("looks"),
                  icon: Icon(Icons.looks_one),
                ),
                NavigationRailDestination(
                  label: Text("repeat"),
                  icon: Icon(Icons.repeat_one),
                ),
              ],
              selectedIndex: _index,
            ),
            Expanded(
                child: Center(
              child: Text("Yah its ${_index + 1}"),
            ))
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        mini: true,
        onPressed: () {
          widget.toggleTheme();
        },
        child: Icon(Icons.trip_origin),
      ),
    );
  }
}
