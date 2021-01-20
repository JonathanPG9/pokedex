import React, { Fragment, useState, } from "react"
import "./Combate.css"



const Combate = (props) => {

  const [isHere, setIsHere] = useState(false)

  let randomNumber = Math.floor(Math.random() * 800 + 1)

  const [enemy, setEnemy] = useState([])

  const enemigo = [{
    daño: null, vida: null
  }]

  const [stats, setStats] = useState([])

  /// stats del pokemon del usuario

  const [nombreEnemigo, setNombreEnemigo] = useState()

  const llamandoEnemigo = async (id) => {
    let llamar = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let llamado = await llamar.json()
    let nombre = await llamado.name
    /// asignando el valor total del objeto pokemon a la variable todo
    alert(`${props.nameMaster}. Your enemy is here when you are ready press Attack!`)

    enemigo.daño = llamado.stats[1].base_stat
    enemigo.vida = llamado.stats[0].base_stat
    setTimer(10)
    setNombreEnemigo(nombre)

    setStats(enemigo)

    setTimeout(() => {
      setEnemy([llamado])

    }, 840)

    setIsHere(true)
  }


  const [gano, setGano] = useState(true)


  let randomExp = Math.floor(Math.random() * 190)



  const loss = (a, nombreUser) => {

    alert(`${props.nameMaster} You loss :( , ${nombreEnemigo} attack you and your life is ${a}`)

    setTimeout(() => {
      setGano(false)
    }, 40)

    setTimeout(() => {
      alert(`${props.nameMaster} your ${nombreUser} is injured wait 10 seconds for the next fight`)

      setTimeout(() => {
        props.setPeleando(false)
        setGano(true)
        setIsHere(false)

      }, 10444)
    }, 200)

    setTimeout(() => {
      time()
    }, 400)




  }

  const win = (nombre) => {




    alert(`${props.nameMaster} Congratulations!!, you won the fight against ${nombreEnemigo} `)

    setTimeout(() => {
      let totalExp = randomExp + randomExp

      alert(`${props.nameMaster} Congratulations!!, your ${nombre} got ${totalExp} of experience`)



      props.setExpGanada(randomExp)



      setTimeout(() => {

        atras()
      }, 800)


    }, 500)

    setIsHere(false)



  }

  const dañoEnemigo = (nombreUser) => {

    const batalla = (x) => {

      stats.vida = stats.vida - props.player.daño

      props.player.vida = props.player.vida - stats.daño

      alert(`${nombreEnemigo} has ${stats.vida} of life left, prepare yourself for the attack from ${nombreEnemigo}! `)

      props.player.vida <= 0 ? loss(props.player.vida, nombreUser) : alert(`${nombreEnemigo} just attacked you ,you have ${props.player.vida} of life left`)

    }

    batalla(nombreUser)

    if (stats.vida === 0) {
      win(nombreUser)
    }

  }
  const atras = () => {
    props.setPeleando(false)
    setIsHere(false)
  }

  const fight = (nombreUser, callback) => {

    props.player.daño > stats.vida ? callback(nombreUser) : dañoEnemigo(nombreUser)

    setTimer(10)

  }

  let [timer, setTimer] = useState(10)

  const time = () => {

    let conteo = setInterval(() => {
      --timer
      setTimer(timer)

      timer === 0 ? clearInterval(conteo) : setGano(false)


    }, 1000)
  }

  return (

    <Fragment>
      {props.peleando === true ? <div>

        {props.combate.map(x =>
          <section className="post-list">
            <h1 key={x.id}>{props.nameMaster}</h1>
            <div className="content">
              <article className="post">
                <div className="post-header">
                  <div className="post-img">
                    <img src={props.player.vida >= 0 ? x.sprites.front_default : x.sprites.back_default} alt="" className="post-img-1" />
                  </div>
                  <div className="post-body">

                    <h2>{x.name}</h2>

                    <h3>Type: {x.types[0].type.name}</h3>
                    <h3>Health: {x.stats[0].base_stat}</h3>
                    <h3> Damage: {x.stats[1].base_stat}</h3>
                    <br />
                    {
                      gano === true ?
                        <label onClick={() => llamandoEnemigo(randomNumber)} className="post-body-button">Search Enemy</label>
                        :
                        console.log()
                    }
                    <br />


                    {
                      gano === true ?
                        <label onClick={() => fight(x.name, win)} className="post-body-button"> Attack </label>
                        :
                        <label className="post-body-button">Wait ! {timer}</label>
                    }
                    <br />
                    {gano === true ?
                      <label onClick={() => atras()} className="post-body-button"> Back </label>
                      :
                      console.log()
                    }
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

      </div> :
        ""
      }





      {isHere === true ?
        <div>
          {enemy.map(x =>
            <section className="post-list-enemy">
              <h1 key={x.id}>Enemy</h1>
              <div className="content-enemy">
                <article className="post-enemy">
                  <div className="post-header-enemy">
                    <div className="post-img-enemy">
                      <img src={x.sprites.front_default} alt="" className="post-img-1-enemy" />
                    </div>
                    <div className="post-body-enemy">

                      <h2>{x.name}</h2>

                      <h3>Type: {x.types[0].type.name}</h3>
                      <h3>Health: {x.stats[0].base_stat}</h3>
                      <h3> Damage: {x.stats[1].base_stat}</h3>

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

    </Fragment>

  );
}

export default Combate;