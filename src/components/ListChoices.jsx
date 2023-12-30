import React from 'react';
import { useState } from 'react';
import styles from './ListChoices.module.css';



const ListChoices = ({name, radios, selectedRadio, handleRadioClick}) => {

    return (
        <span className={styles.container}>
            <label className={styles.label_style}>Afficher :</label>
            <div  className={styles.radio_wrapper}>
                {radios.map(radio => (
                 <label className={styles.radio_style}>
                    <input className={styles.choice_input}
                        type="radio"
                        name={name}
                        value={radio.name}
                        checked={selectedRadio === radio.name}
                        onChange={handleRadioClick}
                    />
                    {radio.name}
                </label>
                ))}
            </div>
        </span >
    );
}

export default ListChoices;

