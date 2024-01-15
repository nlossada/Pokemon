

export const validateInput = (pokeData) => {
    const errors = {}
    //NAME -> only letters and spaces
    const regExpName = /^[A-Za-z\s]+$/;
    const regExpImage = /^https?:\/\//;
    const regExpNumbers = /^[0-9]+$/;



    //NAME
    if (!pokeData.name.length) errors.name = "You must provide a name"
    else {
        if (pokeData.name.length < 3) errors.name = "Name must be at least 3 characters"
        if (pokeData.name.length > 11) errors.name = "Name must be a maximum of 10 characters"
        if (!regExpName.test(pokeData.name)) errors.name = "Name can only contain letters and spaces"
    }

    //IMAGE
    if (!pokeData.image.length) errors.image = "You must enter an image link"
    else {
        // if (pokeData.image.length > 500) errors.image = "Image link must be a maximum of 500 characters"
        if (!regExpImage.test(pokeData.image)) errors.image = "Image must be a link that begins with http"
    }

    //LIFE
    if (!pokeData.life.length) errors.life = "You must provide a number of lives"
    else {
        if (!regExpNumbers.test(pokeData.life)) errors.life = "You must enter only whole numbers"
        if (pokeData.life <= 0) errors.life = "Life must be greater than zero"
        if (pokeData.life > 255) errors.life = "Life can have a maximum value of 255"

    }
    //ATTACK
    if (!pokeData.attack.length) errors.attack = "You must provide a number for attacks"
    else {
        if (!regExpNumbers.test(pokeData.attack)) errors.attack = "You must enter only whole numbers"
        if (pokeData.attack <= 0) errors.attack = "Attack must be greater than zero"
        if (pokeData.attack > 210) errors.attack = "Attack can have a maximum value of 210"
    }
    //DEFENSE
    if (!pokeData.defense.length) errors.defense = "You must provide a number for defense"
    else {
        if (!regExpNumbers.test(pokeData.defense)) errors.defense = "You must enter only whole numbers"
        if (pokeData.defense <= 0) errors.defense = "Defense must be greater than zero"
        if (pokeData.defense > 250) errors.defense = "Defense can have a maximum value of 250"
    }

    //SPEED - not required
    if (pokeData.speed.length > 0 && !regExpNumbers.test(pokeData.speed)) errors.speed = "You must enter only whole numbers"

    //HEIGHT - not required
    if (pokeData.height.length > 0 && !regExpNumbers.test(pokeData.height)) errors.height = "You must enter only whole numbers"

    //WEIGHT - not required
    if (pokeData.weight.length > 0 && !regExpNumbers.test(pokeData.weight)) errors.weight = "You must enter only whole numbers"

    return errors
}