window.addEventListener('DOMContentLoaded', () => {
  const allCard = document.querySelectorAll('.memory-item')
  const tempArr = []

  for(let card of allCard){
    card.addEventListener('click', flipCard)
  }

  function flipCard(e){
    const card = e.currentTarget
    card.classList.add('active')
    tempArr.push(card)
    if(tempArr.length === 2){
      isEqual(tempArr)
    }
  }

  function isEqual(listCard){
    if(listCard[0].dataset.name !== listCard[1].dataset.name){
      listCard.forEach(card => {
        setTimeout(() => card.classList.remove('active'), 500)
      })
    }
    else {
      listCard.forEach(card => {
        setTimeout(() => card.style.display = 'none', 500)
      })
    }
    tempArr.length = 0
  }

})
