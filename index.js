window.addEventListener('DOMContentLoaded', () => {
  const mememoryWrapper = document.querySelector('.memory')
  const tempMap = new Map()
  const cardName = ['clown-icon', 'dracula-icon', 'nun-icon', 'cyclops-icon', 'goblin-icon', 'mummy-icon', 'clown-icon', 'dracula-icon', 'nun-icon', 'cyclops-icon', 'goblin-icon', 'mummy-icon']
  const gameWin = cardName.length / 2
  let gameScore = 0
  const toggleBtn = document.querySelector('.toggle-btn')
  const toggleIcon = toggleBtn.querySelector('img')
  const body = document.querySelector('body')
  const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)')
  
  const setColorScheme = e => {
    if (e.matches){
      // Dark
      toggleIcon.setAttribute('src', 'img/moon_icon.svg')
      body.classList.remove('light')
      body.classList.add('dark')
    } 
    else{
      // Light
      toggleIcon.setAttribute('src', 'img/sun_icon.svg')
      body.classList.remove('dark')
      body.classList.add('light')
    }
  }
    
  setColorScheme(colorSchemeQueryList);
  colorSchemeQueryList.addEventListener('change', setColorScheme)

  toggleBtn.addEventListener('click', toggleMode)

  function toggleMode(){
    if(body.classList.contains('dark')){
      toggleIcon.setAttribute('src', 'img/sun_icon.svg')
      body.classList.remove('dark')
      body.classList.add('light')
    }
    else{
      toggleIcon.setAttribute('src', 'img/moon_icon.svg')
      body.classList.remove('light')
      body.classList.add('dark')
    }
  }

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
        setTimeout(() => card.style.opacity = '0', 500)
      })
      gameScore += 1
      if(gameWin === gameScore){
        setTimeout(() => {
          alert('You won!')
          location.reload()
        }, 800)
      }
    }
    else{
      [firstCard, secondCard].forEach(card => {
        setTimeout(() => card.classList.remove('active'), 1000)
      })
    }
    tempMap.clear()
  }

})
