function resizeHeight(idFloatingElement, idFixedElement) {
    // Select the div you want to observe
  document.querySelector('#lp-pom-root').style.height = '100%';
  document.querySelector(idFloatingElement).style.height = 'auto';
  const embedContainer = document.querySelector(idFloatingElement); // this element is floating
  const sectionContainer = document.querySelector(idFixedElement); // this element is fixed
  const fullPageOverlay = document.querySelector('#lp-pom-root-color-overlay'); //
  const diff = sectionContainer.clientHeight - embedContainer.clientHeight;
  const floatingElems = document.getElementsByClassName('lp-positioned-content')[0].children; // all elements that are floating
  let previousHeight = embedContainer.clientHeight;

  function changeHeight(newHeight) {
    const newHeightPlusDiff = newHeight + diff + 'px';

    //Set new height to sectionContainer and its children
    sectionContainer.style.height = newHeightPlusDiff;
    for (let i = 0; i < sectionContainer.children.length; i++) {
      sectionContainer.children[i].style.height = newHeightPlusDiff; // Set the height of each child div
    }

    const offset = newHeight - previousHeight;

    for (let i = 0; i < floatingElems.length; i++) {
      const elemOffsetTop = floatingElems[i].offsetTop;

      if (elemOffsetTop > embedContainer.offsetTop) {
        // Move all elements of the page but the ones that are above than the form
        floatingElems[i].style.top = (elemOffsetTop + offset) + 'px';
      }
    }

    fullPageOverlay.style.height = fullPageOverlay.offsetHeight + (offset - 1) + 'px';
  }

  // Create a new ResizeObserver instance
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      console.log('New height:', entry.contentRect.height);
      changeHeight(entry.contentRect.height);
      // After changing the height, keep a copy of the previous height
      previousHeight = entry.contentRect.height;
    }
  });

  // Start observing the target div
  resizeObserver.observe(embedContainer);
}