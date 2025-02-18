const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function load(selector, path) {
  const cached = localStorage.getItem(path);
  if (cached) {
    $(selector).innerHTML = cached;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html != cached) {
        $(selector).innerHTML = html;
        localStorage.setItem(path, html);
      }
    })
    .finally(() => {
      window.dispatchEvent(new Event("template-loaded"));
    });
}

function handleCollapseClick() {
  const collapseItemsTop = $$(".collapse__top");
  if (collapseItemsTop) {
    collapseItemsTop.forEach((collapseItem) => {
      collapseItem.addEventListener("click", () => {
        collapseItemsTop.forEach((itemCurrent) => {
          if (itemCurrent != collapseItem) {
            const otherItemContent = itemCurrent.nextElementSibling;

            if (otherItemContent && otherItemContent.classList.contains("open")) {
              otherItemContent.classList.remove("open");
              itemCurrent.classList.remove("open");
            }
          }
        });

        const collapseContent = collapseItem.nextElementSibling;

        if (collapseContent) {
          collapseContent.classList.toggle("open");
          collapseItem.classList.toggle("open");
        }
      });
    });
  }
}
document.addEventListener("DOMContentLoaded", handleCollapseClick);
