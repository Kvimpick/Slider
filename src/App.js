import React, { useState, useEffect } from 'react';
import data from './data';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className='section'>
      <div className='title'>
        <h2>Slider</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'prevSlide';
          }
          return (
            <article key={id} className={position}>
              <img src={image} className='person-img' alt={name}></img>
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='quote'>{quote}</p>
            </article>
          );
        })}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          {<FaArrowLeft />}
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          {<FaArrowRight />}
        </button>
      </div>
    </section>
  );
}

export default App;
