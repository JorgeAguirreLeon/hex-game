export function createGhostTile(data) {

  // Creating the ghost div
  const ghost_div = document.createElement('div')

  // Assign id and classname
  ghost_div.id = 'ghost'
  ghost_div.className = 'hex-container ghost-hex'

  // Create the card with the attributes
  const card = document.createElement('div')
  card.className = 'hex-card'
  card.setAttribute('data-image', data.image)
  card.setAttribute('data-attack-sides', data.attack_sides)
  card.setAttribute('data-player', data.player)

  // Place top div
  const top_div = document.createElement('div')
  top_div.className = 'hex-card-top'
  card.appendChild(top_div)

  // Place bottom divider
  const bottom_div = document.createElement('div')
  bottom_div.className = 'hex-card-bottom'
  card.appendChild(bottom_div)

  // Place attack
  const attack_span = document.createElement('span')
  attack_span.className = 'card-attack'
  attack_span.innerHTML = data.attack
  card.appendChild(attack_span)

  // Place health
  const health_span = document.createElement('span')
  health_span.className = 'card-health'
  health_span.innerHTML = data.health
  card.appendChild(health_span)

  // Place card in the ghost div
  ghost_div.appendChild(card)

  document.body.appendChild(ghost_div)

  return ghost_div
}

export function removeGhostTile() {
  document.getElementById('ghost').remove()
}
