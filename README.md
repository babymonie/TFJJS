
---

# TFJ (Translation Framework for JavaScript)

TFJ is a JavaScript library for dynamic content loading and localization. It allows you to easily change the content of HTML elements based on the selected language, making your web application multilingual.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Reference](#api-reference)
  - [TFJ Class](#tfj-class)
    - [Constructor](#constructor)
    - [init(fileName, enableCaching)](#init)
    - [loadJSON(fileName)](#loadjson)
    - [loadJSONWithCaching(fileName)](#loadjsonwithcaching)
    - [getJSON()](#getjson)
    - [load()](#load)
    - [setLang(lang)](#setlang)
    - [updateContent(data)](#updatecontent)
    - [getVersion()](#getversion)
    - [getLang()](#getlang)
    - [getLangs()](#getlangs)
    - [getLangName(lang)](#getlangname)
    - [getLangNames()](#getlangnames)
- [Examples](#examples)
- [License](#license)

## Getting Started

### Installation

To use TFJ in your project, you need to include the `TFJ.js` or `TFJ.min.js` script in your HTML file:

you should use the minified version for production.

```html
<script src="TFJ.js"></script>
```

### Usage

To get started with TFJ, follow these steps:

1. Initialize the TFJ object:

   ```javascript
   let tfj = new TFJ();
   ```

2. Load your JSON language data file:

   ```javascript
   tfj.init('data.json', true); // Enable caching
   ```

   Replace `'data.json'` with the path to your JSON file containing language data.

3. Add an event listener to change the language:

   ```javascript
   document.getElementById('select').addEventListener('change', function (e) {
     tfj.setLang(e.target.value);
   });
   ```

   Replace `'select'` with the ID of your language selector element.

4. TFJ will automatically load the default language and translate the content on page load. You can also manually change the language using `tfj.setLang(lang)`.

## API Reference

### TFJ Class

#### Constructor

- `TFJ()`: Creates a new TFJ instance.

#### `init(fileName, enableCaching)`

- `fileName`: Path to the JSON language data file.
- `enableCaching`: Enable caching of JSON data (boolean).

Initializes the TFJ library. It loads the JSON language data and sets up event listeners.

#### `loadJSON(fileName)`

- `fileName`: Path to the JSON language data file.

Loads JSON language data from the specified file.

#### `loadJSONWithCaching(fileName)`

- `fileName`: Path to the JSON language data file.

Loads JSON language data with caching. If data is cached, it uses the cached data; otherwise, it fetches the data and caches it.

#### `getJSON()`

Returns the loaded JSON language data.

#### `load()`

Loads the default language and translates the content on page load.

#### `setLang(lang)`

- `lang`: Language code (e.g., 'en', 'fr').

Changes the language to the specified language code.

#### `updateContent(data)`

- `data`: Language data object.

Updates the content of HTML elements based on the provided language data.

#### `getVersion()`

Returns the version of the TFJ library.

#### `getLang()`

Returns the code of the currently selected language.

#### `getLangs()`

Returns an array of available language codes.

#### `getLangName(lang)`

- `lang`: Language code (e.g., 'en', 'fr').

Returns the name of the language corresponding to the given language code.

#### `getLangNames()`

Returns an array of available language names.

## Examples

Here are some example usage scenarios:

1. Basic Initialization:

   ```javascript
   let tfj = new TFJ();
   tfj.init('data.json', true);
   ```

2. Changing the Language:

   ```javascript
   document.getElementById('select').addEventListener('change', function (e) {
     tfj.setLang(e.target.value);
   });
   ```

3. Getting Current Language Information:

   ```javascript
   let currentLang = tfj.getLang();
   let availableLangs = tfj.getLangs();
   let langName = tfj.getLangName('en');
   let langNames = tfj.getLangNames();
   ```

## License

This library is open-source and available under the [MIT License](LICENSE).

---

Feel free to customize and expand this documentation according to your specific needs.
