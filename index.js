window.addEventListener('DOMContentLoaded', () => {
  const allCard = document.querySelectorAll('.memory-item')
  const tempMap = new Map()

  for(let card of allCard){
    card.addEventListener('click', flipCard)
  }

  function flipCard(e){
    const card = e.currentTarget
    card.classList.add('active')
    if(!tempMap.has(card.dataset.id)) tempMap.set(card.dataset.id, card)
    if(tempMap.size === 2) isEqual(tempMap)
  }

  function isEqual(mapCard){
    const iterator1 = mapCard.values()
    const firstCard = iterator1.next().value
    const secondCard = iterator1.next().value
    const firstCardName = firstCard.dataset.name
    const secondCardName = secondCard.dataset.name
    if(firstCardName === secondCardName){
      [firstCard, secondCard].forEach(card => {
        setTimeout(() => card.style.display = 'none', 500)
      })
    }
    else{
      [firstCard, secondCard].forEach(card => {
        setTimeout(() => card.classList.remove('active'), 500)
      })
    }
    tempMap.clear()
  }

})
