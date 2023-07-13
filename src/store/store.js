import { makeAutoObservable } from "mobx"

class WikiStore {
  data = [];
  search = '';

  constructor() {
    makeAutoObservable(this);
    this.changeSearch = this.changeSearch.bind(this);
  }

  fetchData = () => {
    if (this.search === '') {
      return;
    }

    const WikiAPI = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.search}&limit=10&namespace=0&format=json&`;

  fetch(WikiAPI)
      .then(res => res.json())
      .then(items => {
        const formattedData = items[1].map((title, index) => ({
          title: title,
          url: items[3][index]
        }))
        this.data = formattedData;
      });
  }

  changeSearch(event) {
    let searchString = event.target.value;
    this.search = searchString;
  }
}

const store = new WikiStore();

export default store;