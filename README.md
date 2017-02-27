baserJS
===

[![Build Status](https://travis-ci.org/baserproject/baserjs.svg?branch=rc)](https://travis-ci.org/baserproject/baserjs)

コーポレートサイトにちょうどいいJavaScriptライブラリ

<!--- [Web Site](https://baserproject.github.io/baserjs)
- [API Document](http://baserproject.github.io/baserjs/docs/)
- [Reference](http://qiita.com/search?q=baserjs)-->

## Develop `v1.0.0` in progress

### Functions
- [ ] Components/Elements
	- [ ] Styled `<select>`
	- [ ] Modal window
	- [ ] Slideshow
	- [ ] Tooltip
	- [ ] Expander
	- [ ] Tabs
	- [ ] Dropdown Navigation
	- [ ] Maps
		- [ ] GoogleMaps
			- [x] Standard
			- [x] Multi pins
			- [x] Fit bounds
			- [x] Rendering on scroll spy
			- [x] Pinning on scroll spy
			- [ ] Animation pinning
			- [ ] Info window
	- [ ] Video
		- [ ] General API & UI `<video>`, YouTube and Vimeo
		- [ ] YouTube
			- [x] Standard
			- [x] Loading a thumbnail image
			- [ ] Multi Tracks
		- [ ] Vimeo
- [ ] Display Helper
	- [ ] Aligning height
	- [ ] Object Fit (CSS `object-fit`)
	- [ ] Nth letter (Separate by chars)
- [ ] Interaction Helper
	- [ ] Case by device width (breakpoints)
	- [ ] Hyperlink delegation
	- [ ] Detection when descendant image loaded
	- [ ] Detection when element resized
	- [ ] Promise sequencer
	- [ ] Scroll spy for elements
		- [x] Standard
		- [x] High performance
		- [x] Support Scroll Event on `Passive Event Listener`
		- [x] Support `IntersectionObserver`
	- [ ] Converting units of length
- [ ] DOM Helper
	- [ ] Node walker
- [ ] Get browser state
	- [ ] Window dimensions
	- [ ] Timer
	- [ ] Counter
	- [ ] Storage
	- [ ] History
	- [ ] URL Hash
	- [ ] URL Query string
	- [ ] Exception Tracker

### Support Browsers
- IE11 & Edge
- Chrome
- Safari (last 2 version)
- Firefox
- Android Chrome
- iOS Safari (last 2 version)

## Usage

```js
import baser from 'baserjs';
```

```html
<script src="baser.js"></script>
```

* * *

## Development and Contribution

[How to Install](INSTALL.md)

Copyright © 2017 baserCMS Users Community, Licensed under the MIT License.
