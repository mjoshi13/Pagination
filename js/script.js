/* Author: Mehul Joshi
 * For the pagination I am going for most of the meets expectations
 * and some of the exceeds expectations
 */
  const mainDiv = document.querySelector('div.page');
  const mainList = document.querySelector('ul').children;
  const headerDiv = mainDiv.firstElementChild;
  const searchDiv = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');


  //Given a lengthy page with numberous data points only show those that are in the range of the page
  //Meaning that show all data in the range of [10*page, 10*page+n)
  const showPage = (list, page) => {
    let n = page + 1 === Math.ceil(list.length/10)? list.length % 10: 10;
    for(let i = 0; i < list.length; i++) {
      let elem = list[i];
      if(i >= 10*page && i < 10*page + n) {
        elem.style.display = '';
      } else {
        elem.style.display = 'none';
      }
    }


  }

  //creates the initail setup for the pagination
  const appendPageLinks = (list) => {
    const div = setPagePaginations(list);
    mainDiv.appendChild(div);

    const linksList = div.querySelector('ul');

    linksList.addEventListener('click', (e)=> {
      adjustPageLinks(parseInt(e.target.textContent - 1), linksList, list);
    });
  }

  //appends the search feature to the document
  function appendSearch() {
    searchDiv.className = 'student-search';
    input.placeholder = "Search for students...";
    button.textContent = "Search";

    searchDiv.appendChild(input);
    searchDiv.appendChild(button);
    headerDiv.appendChild(searchDiv);
  }

  //sets the initial features for a list of items and returns a div element
  function setPagePaginations(list) {
    const div = document.createElement('div');
    const linksList = document.createElement('ul');
    const size = Math.ceil(list.length/10);
    div.className = 'pagination';
    for(let i = 0 ; i < size; i++) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = (i + 1);
      if(i === 0) {
        link.className = "active";
        showPage(list, 0);
      }
      link.href = '#';
      li.appendChild(link);
      linksList.appendChild(li);
    }

    div.appendChild(linksList);

    return div;
  }

  //after one of the numbers are pressed then the page adjusts showing the next 10 results
  //Since the variable name may get confusing here is a clarifier:
  //page represenets the page of the pagination
  //linksList represents the list of links at the bottom of the page
  //and the list represents the list of the searched results
  function adjustPageLinks(page, linksList, list) {
    const children = linksList.children;
    for(let i = 0; i < children.length; i++) {
      if(i === page) {
        children[i].firstElementChild.className = "active";
      } else {
        children[i].firstElementChild.className = "";
      }
    }
    showPage(list, page);
  }

  appendSearch();

  appendPageLinks(mainList);
