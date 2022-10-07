window.addEventListener('DOMContentLoaded', () => {
  const mememoryWrapper = document.querySelector('.memory')
  const tempMap = new Map()
  const cardName = ['clown-icon', 'dracula-icon', 'nun-icon', 'cyclops-icon', 'goblin-icon', 'mummy-icon', 'clown-icon', 'dracula-icon', 'nun-icon', 'cyclops-icon', 'goblin-icon', 'mummy-icon']

  function randomArr(array){
    return array.sort(function() { return 0.5 - Math.random() })
  }

  const randCardList = randomArr(cardName)

  for(let i = 0; i < cardName.length; i++){
    const templateMemmoryItem = `
      <div class="memory-item" data-name="${randCardList[i]}" data-id="${i}">
        <div class="back_card_wrap">
          <img src="img/back-card-icon.svg" alt="back">
        </div>
        <div class="front_card_wrap">
          <img src="img/${randCardList[i]}.svg" alt="">
        </div>
      </div>
    `
    mememoryWrapper.insertAdjacentHTML('beforeend', templateMemmoryItem)
  }

  const allCard = mememoryWrapper.querySelectorAll('.memory-item')

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
