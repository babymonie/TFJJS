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
- [Creating a JSON Language Data File](#creating-a-json-language-data-file)
- [Using a CDN via jsDelivr](#using-a-cdn-via-jsdelivr)
- [License](#license)

## Getting Started

### Installation

To use TFJ in your project, you need to include the `TFJ.js` or `TFJ.min.js` script in your HTML file. For production use, it's recommended to use the minified version.

#### Using a CDN via jsDelivr

You can include TFJ directly from a CDN like jsDelivr:

```html
<!-- Latest version(Unminified) -->
<script src="https://cdn.jsdelivr.net/gh/babymonie/TFJJS@latest/dist/tfj.js"></script>
<!-- Latest version(Minified) -->
<script src="https://cdn.jsdelivr.net/gh/babymonie/TFJJS@latest/dist/tfj.min.js"></script>
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

## Creating a JSON Language Data File

The TFJ library relies on a JSON language data file to provide translations for your web application. Below, we'll outline how to structure this JSON file and provide an example.

### JSON File Structure

The JSON language data file should have an array of language objects, with each object representing a specific language. Here's the basic structure of each language object:

```json
{
  "lang": "Language Name",
  "code": "Language Code",
  "country": "Country Name",
  "default": true|false,
  "data": {
    "key1": {
      "content": "Translation",
      "selector": "Element Selector",
      "type": "Text Type"
    },
    "key2": {
      "content": "Translation",
      "selector": "Element Selector",
      "type": "Text Type"
    },
    ...
  }
}
```

- `"lang"`: The name of the language (e.g., "English", "French").
- `"code"`: The language code (e.g., "en", "fr").
- `"country"`: The name of the country associated with the language (optional).
- `"default"`: Indicates whether this is the default language (`true` or `false`).
- `"data"`: An object containing translations for various elements.

Each `"data"` object should contain translations for specific HTML elements in your web application. Here's what each property within the `"data"` object represents:

- `"key"`: A unique identifier for the translation.
- `"content"`: The translated content.
- `"selector"`: The CSS selector for the HTML element to be translated.
- `"type"`: The type of HTML element (`"text"`, `"select"`, etc.).

### Example JSON Language Data File

Here's an example JSON language data file with two languages (English and French):

```json
[
  {
    "lang": "English",
    "code": "en",
    "country": "US",
    "default": true,
    "data": {
      "title": {
        "content": "Hello World",
        "selector": "h1",
        "type": "text"
      },
      "description": {
        "content": "This is a description",
        "selector": "p",
        "type": "text"
      },
      "test": {
        "content": ["Test 1", "Test 2"],
        "selector": "#test",
        "type": "select"
      }
    }
  },
  {
    "lang": "French",
    "code": "fr",
    "country": "France",
    "data": {
      "title": {
        "content": "Bonjour le monde",
        "selector": "h1",
        "type": "text"
      },
      "description": {
        "content": "Ceci est une description",
        "selector": "p",
        "type": "text"
      },
      "test": {
        "content": ["Vue 1", "Vue 2"],
        "selector": "#test",
        "type": "select"
      }
    }
  }
]
```


## License

This library is open-source and available under the [MIT License](LICENSE).

