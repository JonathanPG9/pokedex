import React, { useState, useEffect, Fragment } from "react"
import Combate from "./Combate"
import "./Pokedex.css"
import "./Pokemon.css"
// import Player from "./Player"

const Pokedex = () => {

  const [playerInfo, setPlayerInfo] = useState([])

  const [info, setInfo] = useState(false)

  let randomNumber = Math.floor(Math.random() * 800 + 1)
  /// el siguiente useState contiene toda la informacion del pokemon
  const [todo, setTodo] = useState([])
  /// los siguientes dos useState son  arrays de objetos con el valor solamente de imagen y el nombre del pokemon
  const [traerImg, setTraerImg] = useState([])
  const [traerText, setTraerText] = useState([])
  /// el siguiente useState es un array de objetos con los pokemones capturados por el usuario
  const [lista, setLista] = useState([])

  // const [pelea,setPelea] = useState(false)

  const [combate, setCombate] = useState([])

  /// playerReady
  const [playerR, setPlayerR] = useState(false)

  /// Llamar api y asignar valores a los useState anteriores
  const llamandoPokemon = async (id, time = 1200) => {
    let llamar = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let llamado = await llamar.json()
    let sprites = await llamado.sprites.front_default
    let nombres = llamado.name


    setAtrapadoTrue(false)

    setTraerText("Looking for a pokemon  ...")
    /// asignando el valor total del objeto pokemon a la variable todo
    setTodo(llamado)
    //setstimeouts
    setTimeout(() => {
      setTraerImg(sprites)
    }, 988)
    setTimeout(() => {
      setTraerText(`Is ${nombres}!!`)
    }, time)
  }


  const [atrapadoTrue, setAtrapadoTrue] = useState(false)

  /// un uso de useEffect simple en el cual le asigno un valor "predeterminado y principal" para el primer pokemon que se renderize en el DOM
  useEffect(() => {

    llamandoPokemon(25, 600)
  }, [])

  /// una funcion simple en el cual se atrapa al pokemon y se le añade al usuario en el array "lista"
  const atrapado = () => {

    alert(`Congratulations!! ${nameMaster} your new Pokemon is ${todo.name}`)
    setLista([...lista,
      todo])
    setAtrapadoTrue(true)

  }

  /// una funcion en la cual el pokemon huye una vez que el usuario intenta atraparlo

  const escapando = () => {
    alert(`Sorry ${nameMaster}, ${todo.name} is escaping!!`)
    setTraerText(
      <div>
        <h4>
          Sorry search another pokemon!
    </h4>
      </div>
    )
    setAtrapadoTrue(false)
    setTraerImg("")
  }
  /// una funcion en la cual si el usuario saca dos en los numeros randoms este fallara al atrapar y tendra otra oportunidad para intentarlo
  /// pero si saca 3 esto llamara  a la funcion escapando ( el 1 esta reservado para la funcion capturar)

  const failTry = (x) => {
    x === 2 ? alert(`Sorry ${nameMaster}, ${todo.name} its too strong! try to capture again`) : escapando()

  }

  //  esta funcion es la principal y en la cual se anidan las anteriores funciones 

  const capturar = () => {

    let lowRandom = Math.floor(Math.random() * 4 + 1)

    lowRandom === 1 || lowRandom === 4 ? atrapado() : failTry(lowRandom)



  }
  const limpiando = () => {
    const newLista = lista.filter((x, index) => lista.indexOf(x) === index)
    // const newLista = [...new Set(lista)] 
    setLista(newLista)
    alert(`${nameMaster}, Sorry you had a repeated pokemon`)
  }
  // elimina un pokemon de la lista del usuario

  const eliminar = (id) => {

    setLista(lista.filter(x => x.id !== id))
  }


  const [nameMaster, setNameMaster] = useState("")

  const nombrePlayer = (event) => {
    let name = event.target.value

    let validar = new RegExp(/^[A-Za-z0-9\s]+$/g);
    let resultado = validar.test(name);
    /// si tiene alguna de las expresiones regulares devuelve false si no tiene ninguna devuelve true 
    console.log(resultado)
    resultado ? setNameMaster(name) : setNameMaster(false)

  }



  const deniedEnter = () => {

    if (nameMaster.length >= 13) {
      alert(`Please enter a shorter name`)
      setPlayerR(false)
    }
    if (nameMaster.length <= 1) {
      alert(`Please enter a longer name`)
      setPlayerR(false)
    }
    if (nameMaster === false) {
      alert(`Enter a correct name without special characters please..`)
      setPlayerR(false)
    }
  }



  const allowEnter = () => {
    alert(`Welcome!, ${nameMaster}`)
    setPlayerR(true)
  }


  const finishLogin = () => {
    nameMaster.length > 1 && nameMaster.length < 13 ? allowEnter() : deniedEnter()



  }



  const playerMoreInf = (x, experience) => {

    setPlayerInfo(lista.filter(z => z.id === x))



    setInfo(true)
    console.log(expGanada)

    setTimeout(() => {
      setExpGanada(0)
    }, 700)
  }





  const [expGanada, setExpGanada] = useState(0)


  // Entrenamiento o Pelea 

  const [player, setPlayer] = useState([])

  let playerStats = [{
    vida: null, daño: null
  }]

  const [peleando, setPeleando] = useState(false)

  const entrenando = (x, daño, vida) => {
    setCombate(lista.filter(id => id.id === x))
    playerStats.vida = vida;
    playerStats.daño = daño
    setPlayer(playerStats)
    setPeleando(true)

  }


  const mouseLeaveInfo = () => {

    setInfo(false)


  }
  return (

    <Fragment>
      {playerR ?
        <div>
          {peleando === false ?
            <div className="pokemon-body">
              <h1>Pokedex</h1>
              <h2>{traerText}</h2>
              <img src={traerImg} alt=" " className="pokemon-img" />
              <br />
              <label onClick={() => llamandoPokemon(randomNumber)} className="pokemon-body-button"> Search Pokemon </label>
              <br />
              <br />
              {
                traerImg === "" || atrapadoTrue !== false ?
                  console.log()
                  :
                  <label onClick={() => capturar()} className="pokemon-body-button"> Try Catch it</label>
              }
              <br />

            </div>
            :
            console.log()
          }

          <br />
          <br />
          <br />
          {
            peleando === false ?
              <h1 className="table-h1">{nameMaster}, here are your pokemon! </h1> :
              ""
          }

          {peleando === false ?
            <table className="table">
              <thead>
                {lista.length > 0 ? <tr>
                  <th><h2>Pokemon</h2></th>
                  <th><h2>Name</h2></th>
                  <th><h2>Type</h2></th>
                  <th> <h2>Remove</h2></th>
                  <th> <h2>Trained</h2></th>
                  <th><h2>More</h2></th>

                </tr> : console.log()}

              </thead>
              <tbody>

                {
                  lista.length > 0 ?
                    lista.map(x =>
                      <tr key={x.id}>
                        <td>  <img src={x.sprites.front_default} alt="" /></td>
                        <td><h3>{x.name} </h3> </td>
                        <td><h3> {x.types[0].type.name}</h3></td>
                        <td><label onClick={() => eliminar(x.id)} className="table-button">Remove</label></td>
                        <td><label onClick={() => entrenando(x.id, x.stats[1].base_stat, x.stats[0].base_stat)} className="table-button">Trained</label></td>
                        <td className="ocultar"><button onMouseMove={() => limpiando()} style={{ opacity: 0 }}></button></td>
                        <td><label className="button-info" onClick={() => playerMoreInf(x.id, x.base_experience)} onMouseLeave={() => mouseLeaveInfo()}>+   </label></td>

                      </tr>
                    )
                    :
                    <tr>
                      <td><h3>{nameMaster} Catch one!</h3></td>

                      <td style={{
                        color: "red",
                        position: "relative",
                        fontFamily: "Arial",
                        fontStyle: "italic",
                      }}><h4>
                          Advice: is not a good idea to have the same pokemon twice...
</h4></td>

                    </tr>

                }

              </tbody>
            </table>
            :
            ""

          }


          <br />
          <br />

        </div>
        : <div className="login-player">
          <h4>{new Date().toLocaleDateString()}</h4>
          <h1>Welcome to Pokedex/Combat !!</h1>
          <h2>Login</h2>
          <label ><h3>Enter a name:</h3></label>
          <input onChange={nombrePlayer} type="text" />
          <br />
          <button onClick={() => finishLogin()}>Done</button>
        </div>}

      {info ?
        <div>
          {playerInfo.map(x =>
            <section id="post-list-more">
              <div className="content-more">
                <article className="post-more">
                  <div className="post-header-more">
                    <div className="post-img-more">
                      <img src={x.sprites.front_default} alt="" className="post-img-1-more" />
                    </div>
                    <div className="post-body-more" key={x.id}>
                      <h2>{x.name}</h2>
                      <h2  >ID: {x.id}</h2>
                      <h3>Type: {x.types[0].type.name}</h3>
                      <h3>Health: {x.stats[0].base_stat}</h3>
                      <h3> Damage: {x.stats[1].base_stat}</h3>
                      <h3>EXP: {x.base_experience += expGanada} </h3>

                    </div>
                  </div>
                </article>
              </div>
            </section>

          )}
        </div>
        :
        ""
      }

      <Combate
        combate={combate}
        lista={lista}
        setLista={setLista}
        llamandoPokemon={llamandoPokemon}
        todo={todo}
        player={player}
        peleando={peleando}
        setPeleando={setPeleando}
        nameMaster={nameMaster}
        setExpGanada={setExpGanada}
        info={info}
        expGanada={expGanada}

      />



    </Fragment>
  )

}
export default Pokedex;