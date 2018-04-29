import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi.nimi}</h1>
    </div>

  )
}

const Sisalto = (props) => {
  return (
    <div>
      {props.kurssi.osat.map(kurs => <Osa key={kurs.id} nimi={kurs.nimi} tehtavia={kurs.tehtavia} />)}
    </div>

  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.nimi} {props.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.kurssi.osat.reduce( (summa, osa) => {
        return summa+osa.tehtavia;
      }, 0)} tehtävää</p>
    </div>

  )
}

export default Kurssi