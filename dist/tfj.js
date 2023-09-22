class TFJError extends Error {
  constructor(message) {
    super(message);
    this.name = "TFJError";
  }
}

class TFJ {
  constructor() {
    this.json = [];
    this.version = "1.1";
  }

  async init(fileName, enableCaching) {
    console.log("TFJ init");
    try {
      if (enableCaching) {
        await this.loadJSONWithCaching(fileName);
      } else {
        await this.loadJSON(fileName);
      }
    } catch (error) {
      console.error("Error initializing TFJ:", error);
    }
  }

  async loadJSON(fileName) {
    try {
      const response = await fetch(fileName);
      if (!response.ok) {
        throw new Error(`Error loading JSON: ${response.status} ${response.statusText}`);
      }
      this.json = await response.json();
      const event = new CustomEvent("JSONLoaded", {
        detail: {
          json: this.json,
        },
      });
      document.dispatchEvent(event);
      this.load(); // Load the default language after JSON is loaded
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
  }

  async loadJSONWithCaching(fileName) {
    const cachedData = localStorage.getItem("TFJ_JSON");

    if (cachedData) {
      this.json = JSON.parse(cachedData);
      this.load();
    } else {
      try {
        const response = await fetch(fileName);
        if (!response.ok) {
          throw new Error(`Error loading JSON: ${response.status} ${response.statusText}`);
        }
        this.json = await response.json();

        // Cache the JSON data
        localStorage.setItem("TFJ_JSON", JSON.stringify(this.json));

        this.load();
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
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
              // select element get all options and change all options text to elementData.content which if in this context is the text of the selected option it will be an array of options
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
              // select element get all options and change all options text to elementData.content which if in this context is the text of the selected option it will be an array of options
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
