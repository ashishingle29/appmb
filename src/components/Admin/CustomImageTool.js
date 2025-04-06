export default class CustomImageTool {
    constructor({ data, api, config }) {
      this.api = api;
      this.data = data;
      this.config = config;
      this.wrapper = undefined;
    }
  
    static get toolbox() {
      return {
        title: 'Image',
        icon: '<svg width="18" height="18" ...</svg>' // Use a camera or image icon
      };
    }
  
    render() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('p-2');
  
      if (this.data && this.data.url) {
        const img = document.createElement('img');
        img.src = this.data.url;
        img.className = 'rounded-md max-w-full h-auto';
        this.wrapper.appendChild(img);
      } else {
        const button = document.createElement('button');
        button.className = 'bg-blue-600 text-white px-3 py-1 rounded';
        button.innerText = 'Select Image from Library';
        button.addEventListener('click', () => {
          this.config.openMediaLibrary((selectedMedia) => {
            if (selectedMedia?.url) {
              this.data = { url: selectedMedia.url };
              this.wrapper.innerHTML = ''; // Clear and re-render
              this.render();
            }
          });
        });
  
        this.wrapper.appendChild(button);
      }
  
      return this.wrapper;
    }
  
    save() {
      return this.data;
    }
  }
  