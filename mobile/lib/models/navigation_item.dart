import 'package:flutter/material.dart';

class NavigationItem {
  final Widget widget;
  final Icon icon;
  final Widget title;
  final GlobalKey<NavigatorState> NavigationItemKey;
  NavigationItem(
      {required this.widget,
      required this.icon,
      required this.title,
      required this.NavigationItemKey});
}
