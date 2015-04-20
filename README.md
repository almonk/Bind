# Bind

Bind is an open source, experimental tool for designing interfaces. It's a native OSX app that allows you to design using <a href="http://gridstylesheets.org">GSS, an auto-layout like language for describing an interface via constraints. Bind is not meant to replace tools like <a href="http://bohemiancoding.com/sketch/">Sketch</a>, Photoshop or <a href="http://framerjs.com">Framer</a>, but is instead suited for the very niche task of designing user interfaces. For more background info, see the <a href="https://medium.com/@almonk/design-like-it-s-1999-48ce5f5be14">blog post</a> I wrote about it.

<img src="http://f.cl.ly/items/0X1o0y1F1r0h1U3e2n16/bind-screenshot.png"/>

#### Features
* Write GSS manually or automate it with built in UIs
* Creates `.bind` files which can be easily version controlled with Git and other tools
* Supports emmet for HTML and CSS
* Native OSX app with Yosemite integration
* Presentation mode

#### Planned features
* 1-click sharing
* Visual versioning

----

#### Building from source

Bind is a hybrid web & native application. Dependencies:
* jsx node module
* XCode 6.3
* OSX 10.10 and higher

`cd ~/bind/public`

`jsx --watch views/ dist/`

`cd ../; open Bind.xcodeproj`
