console.log("The connection to JS is working")



const get_pokemon = async() => {
    random_id = Math.floor(Math.random()*1025)+1;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random_id}`);
    let data = await response.json();

    let poke_display = document.getElementById('pokemon_display')
    let new_div = document.createElement('div');
    let first_pic = document.createElement('img');
    let first_name = document.createElement('h5');
    let first_wrap = document.createElement('div')
    new_div.style.display = 'flex'
    new_div.style.gap = '8vmin'

    first_pic.src = data.sprites.front_shiny;
    first_name.innerText = data.name;
    first_wrap.appendChild(first_name);
    first_wrap.appendChild(first_pic);
    new_div.appendChild(first_wrap)
    
    
    let printed_mons = [data.name]

    for(let i=0; i<5; i++){
        let new_mon = await search_type(data, printed_mons);
        printed_mons.push(new_mon.name);

        let wrapper  = document.createElement('div')
        let new_pic = document.createElement('img');
        let new_name = document.createElement('h5');
        new_pic.src = new_mon.sprites.front_shiny;
        new_name.innerText = new_mon.name;
        wrapper.appendChild(new_name);
        wrapper.appendChild(new_pic);
        new_div.appendChild(wrapper)
    }

    poke_display.appendChild(new_div);
}

const search_type = async(base_mon,pokeList) => {
    let rand = 0;
    if(base_mon.types.length == 2){
        rand = Math.floor(Math.random()*2);
    }

    let response = await fetch(base_mon.types[rand]['type']['url']);
    let data = await response.json();
    let loop = false;
    do{
        rand =  Math.floor(Math.random() * data.pokemon.length);
        if(pokeList.includes(data.pokemon[rand]['pokemon']['name'])){
            loop = true;
        }
    } while(loop);

    let new_response = await fetch(data.pokemon[rand]['pokemon']['url'])
    let new_mon = await new_response.json()
    
    return new_mon;
}