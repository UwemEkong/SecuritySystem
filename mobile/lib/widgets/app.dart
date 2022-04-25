import 'package:flutter/material.dart';
import 'package:mobile/pages/aboutus.dart';
import 'package:mobile/pages/faq.dart';
import 'package:mobile/pages/neighbors.dart';
import 'package:mobile/pages/registration_page.dart';
import 'package:mobile/pages/requestresettoken.dart';
import '../models/navigation_item.dart';
import '../pages/home_page.dart';
import '../pages/login.dart';

class App extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => AppState();
}

class AppState extends State<App> {
  int _currentPage = 0;

  final List<NavigationItem> _items = [
    NavigationItem(
        icon: const Icon(Icons.home),
        title: const Text("Home"),
        widget: HomePage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
    NavigationItem(
        icon: const Icon(Icons.person),
        title: const Text("Login"),
        widget: LoginPage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
    NavigationItem(
        icon: const Icon(Icons.person),
        title: const Text("Sign Up"),
        widget: RegistrationPage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
    NavigationItem(
        icon: const Icon(Icons.info),
        title: const Text("FAQ"),
        widget: FaqPage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
    NavigationItem(
        icon: const Icon(Icons.info),
        title: const Text("About Us"),
        widget: AboutUsPage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
    NavigationItem(
        icon: const Icon(Icons.person),
        title: const Text("Neighbors"),
        widget: NeighborsPage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
    NavigationItem(
        icon: const Icon(Icons.password),
        title: const Text("Reset Password"),
        widget: RequestResetTokenPage(),
        NavigationItemKey: GlobalKey<NavigatorState>()),
  ];

  static var _isAuthed = false;

  Widget _navigationTab(
      {required GlobalKey<NavigatorState> naviKey, required Widget widget}) {
    return Navigator(
      key: naviKey,
      onGenerateRoute: (routeSettings) {
        return MaterialPageRoute(builder: (context) => widget);
      },
    );
  }

  void _selectTab(int index) {
    if (index == _currentPage) {
      _items[index]
          .NavigationItemKey
          .currentState
          ?.popUntil((route) => route.isFirst);
    } else {
      setState(() {
        _currentPage = index;
      });
    }
  }

  Widget _bottomNavigationBar() {
    return BottomNavigationBar(
      backgroundColor: Colors.grey.shade900,
      selectedItemColor: Colors.deepOrangeAccent[400],
      unselectedItemColor: Colors.white,
      type: BottomNavigationBarType.fixed,
      currentIndex: _currentPage,
      onTap: (int index) {
        _selectTab(index);
      },
      items: _items
          .map((e) => BottomNavigationBarItem(
              icon: e.icon, label: formatTitle(e.title.toString())))
          .toList(),
    );
  }

  String formatTitle(String title) {
    String removeText = title.replaceAll("Text", "");
    String removeOpenParens = removeText.replaceAll("(", "");
    String removeCloseParens = removeOpenParens.replaceAll(")", "");
    return removeCloseParens.replaceAll('"', '');
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        final isFirstRouteInCurrentTab = await _items[_currentPage]
            .NavigationItemKey
            .currentState!
            .maybePop();
        if (isFirstRouteInCurrentTab) {
          if (_currentPage != 0) {
            _selectTab(1);
            return false;
          }
        }
        // let system handle back button if we're on the first route
        return isFirstRouteInCurrentTab;
      },
      child: Scaffold(
        body: IndexedStack(
            index: _currentPage,
            children: _items
                .map((e) => _navigationTab(
                    naviKey: e.NavigationItemKey, widget: e.widget))
                .toList()),
        bottomNavigationBar: _bottomNavigationBar(),
      ),
    );
  }

  // String formatTitle(String title) {
  //   String removeText = title.replaceAll("Text", "");
  //   String removeOpenParens = removeText.replaceAll("(", "");
  //   String removeCloseParens = removeOpenParens.replaceAll(")", "");
  //   return removeCloseParens.replaceAll('"', '');
  // }
}
