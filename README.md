baserJS
===

Client side JavaScript libraries for [baserCMS](http://basercms.net/)

## Usage

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="baser.js"></script>
```

## Example

```html
<input type="radio" name="foo" id="bar"><label for="bar">ラベル</label>
```

↓

```javascript
$('input:radio').bcRadio();
```

↓

```html
<span class="-bc-form-element-wapper">
	<input type="radio" name="foo" id="bar" class="-bc-form-element -bc-form-element-radio -bc-form-element-state-unchecked -bc-form-element-blur" aria-checked="false">
	<label for="bar" class="-bc-form-element -bc-form-element-label -bc-form-element-radio-label -bc-form-element-blur">ラベル</label>
</span>
```

## Methods

- bcRadio()
- bcCheckbox()
- bcSelect()

* * *

Copyright © 2014 baserCMS Users Community, Licensed under the MIT License.