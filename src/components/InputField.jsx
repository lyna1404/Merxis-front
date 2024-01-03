import styles from './inputField.module.css'
import React from 'react';


/* Props explanation:
// display = ["labelontop", "labelonleft"] : refers to the label's display, labels can either be over the text field or on its left
// label is the label's name
// size ["extralarge", "verylarge", "large", "overaverage", "average", "belowaverage", "small", "verysmall"] : tefers to the width of the input text field
// type, value, et onChange are params of html Input tag
*/

const InputField = ({ display,label,size,type,disabled,value,onChange,readOnly }) => {

    function switchSizeCase() {
            switch (size){
                case 'extralarge' : 
                return   (<input className={styles.extralarge}
                                type={type}
                                disabled={disabled}
                                value={value !== null ? value : ''}
                                onChange={onChange}
                                readOnly={readOnly}
                          />)
                case 'verylarge' : 
                    return   (<input className={styles.verylarge}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                case 'large' : 
                    return   (<input className={styles.large}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                case 'overaverage' : 
                    return   (<input className={styles.overaverage}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                case 'average' : 
                    return   (<input className={styles.average}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                case 'belowaverage' : 
                    return   (<input className={styles.belowaverage}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                case 'small' : 
                    return   (<input className={styles.small}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                case 'verysmall' : 
                    return   (<input className={styles.verysmall}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}

                              />)
                default : 
                return   (<input className={styles.average}
                                type={type}
                                disabled={disabled}
                                value={value !== null ? value : ''}
                                onChange={onChange}
                                readOnly={readOnly}

                        />)
    
            }
    }
    return (

        <>
        {
            display === "labelontop" ? (
                <label className={styles.labelontop}>{label}
                { switchSizeCase() }
                </label>
            ) :
            (
                <label className={styles.labelonleft}>{label}
                { switchSizeCase() }
                </label>
            )


        }
        </>
    );
}

export default InputField;