class TFJError extends Error {
  constructor(message) {
    super(message);
    this.name = "TFJError";
  }
}

class TFJ {
  constructor() {
    this.json = [];
    this.version = "1.0";
  }

  init(fileName, enableCaching) {
    console.log("TFJ init");
    if (enableCaching) {
      this.loadJSONWithCaching(fileName);
    } else {
      this.loadJSON(fileName);
    }
  }

  loadJSON(fileName) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", fileName, true);
    xobj.onreadystatechange = () => {
      if (xobj.readyState == 4 && xobj.status == "200") {
        this.json = JSON.parse(xobj.responseText);
        const event = new CustomEvent("JSONLoaded", {
          detail: {
            json: this.json,
          },
        });
        document.dispatchEvent(event);
        this.load(); // Load the default language after JSON is loaded
      } else if (xobj.readyState == 4 && xobj.status != "200") {
        console.error("Error loading JSON:", xobj.status, xobj.statusText);
      }
    };
    xobj.send(null);
  }

  loadJSONWithCaching(fileName) {
    const cachedData = localStorage.getItem("TFJ_JSON");

    if (cachedData) {
      this.json = JSON.parse(cachedData);
      this.load();
    } else {
      let xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open("GET", fileName, true);
      xobj.onreadystatechange = () => {
        if (xobj.readyState == 4 && xobj.status == "200") {
          this.json = JSON.parse(xobj.responseText);

          // Cache the JSON data
          localStorage.setItem("TFJ_JSON", JSON.stringify(this.json));

          this.load();
        } else if (xobj.readyState == 4 && xobj.status != "200") {
          console.error("Error loading JSON:", xobj.status, xobj.statusText);
        }
      };
      xobj.send(null);
    }
  }

  getJSON() {
    return this.json;
  }
  load() {
    let json = this.getJSON();
    let defaultLang = json.find((item) => item.default === true);

    if (!defaultLang) {
      throw new TFJError("Default language not found");
    }

    let data = defaultLang.data;

    for (let key in data) {
      let elementData = data[key];

      if (typeof elementData === "object" && elementData.content) {
        let selector = elementData.selector;
        let type = elementData.type;

        let selectedElements = document.querySelectorAll(selector);

        if (selectedElements.length > 0) {
          selectedElements.forEach((selectedElement) => {
            if (type === "text") {
              selectedElement.textContent = elementData.content;
            }
            if (type === "select") {
              //select element get all options and change all options text to elementData.content which if in this context is the text of the selected option it will be an array of options
              let data = elementData.content;
              for (let i = 0; i < data.length; i++) {
                selectedElement.options[i].text = data[i];
              }
            } else if (type === "value") {
              selectedElement.value = elementData.content;
            } else if (type === "placeholder") {
              selectedElement.placeholder = elementData.content;
            } else if (type === "title") {
              selectedElement.title = elementData.content;
            } else if (type === "alt") {
              selectedElement.alt = elementData.content;
            } else if (type === "href") {
              selectedElement.href = elementData.content;
            } else if (type === "src") {
              selectedElement.src = elementData.content;
            }
            // Example for disabled attribute
            else if (type === "disabled") {
              selectedElement.disabled = elementData.content;
            }
          });
        }
      }
    }

    const event = new CustomEvent("languageLoaded", {
      detail: { language: defaultLang.code },
    });
    document.dispatchEvent(event);
  }

  setLang(lang) {
    let json = this.getJSON();
    let selectedLang = json.find((item) => item.code === lang);

    if (!selectedLang) {
      throw new TFJError("Language not found");
    }

    this.updateContent(selectedLang.data);

    // Trigger a custom event when the language changes
    const event = new CustomEvent("languageChanged", {
      detail: { language: lang },
    });
    document.dispatchEvent(event);
  }

  updateContent(data) {
    for (let key in data) {
      let elementData = data[key];

      if (typeof elementData === "object" && elementData.content) {
        let selector = elementData.selector;
        let type = elementData.type;

        let selectedElements = document.querySelectorAll(selector);

        if (selectedElements.length > 0) {
          selectedElements.forEach((selectedElement) => {
            if (type === "text") {
              selectedElement.textContent = elementData.content;
            }
            if (type === "select") {
              //select element get all options and change all options text to elementData.content which if in this context is the text of the selected option it will be an array of options
              let data = elementData.content;
              for (let i = 0; i < data.length; i++) {
                selectedElement.options[i].text = data[i];
              }
            } else if (type === "value") {
              selectedElement.value = elementData.content;
            } else if (type === "placeholder") {
              selectedElement.placeholder = elementData.content;
            } else if (type === "title") {
              selectedElement.title = elementData.content;
            } else if (type === "alt") {
              selectedElement.alt = elementData.content;
            } else if (type === "href") {
              selectedElement.href = elementData.content;
            } else if (type === "src") {
              selectedElement.src = elementData.content;
            }
            // Example for disabled attribute
            else if (type === "disabled") {
              selectedElement.disabled = elementData.content;
            }
          });
        }
      }
    }
  }
  getVersion() {
    return this.version;
  }

  getLang() {
    let json = this.getJSON();
    let defaultLang = json.find((item) => item.default === true);

    if (!defaultLang) {
      throw new TFJError("Default language not found");
    }

    return defaultLang.code;
  }

  getLangs() {
    let json = this.getJSON();
    let langs = [];

    json.forEach((item) => {
      langs.push(item.code);
    });

    return langs;
  }

  getLangName(lang) {
    let json = this.getJSON();
    let selectedLang = json.find((item) => item.code === lang);

    if (!selectedLang) {
      throw new TFJError("Language not found");
    }

    return selectedLang.lang;
  }

  getLangNames() {
    let json = this.getJSON();
    let langNames = [];

    json.forEach((item) => {
      langNames.push(item.lang);
    });

    return langNames;
  }
}
