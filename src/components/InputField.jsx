import styles from './inputField.module.css'
import React from 'react';


/* Props explanation:
// display = ["labelontop", "labelonleft"] : refers to the label's display, labels can either be over the text field or on its left
// label is the label's name
// size ["extralarge", "verylarge", "large", "overaverage", "average", "belowaverage", "small", "verysmall"] : tefers to the width of the input text field
// type, value, et onChange are params of html Input tag
*/

const InputField = ({ display,label,size,type,disabled,value,onChange,readOnly, placeholder, dir='ltr' }) => {

    function switchSizeCase() {
            switch (size){
                case 'extralarge' : 
                return   (<input className={styles.extralarge}
                                type={type}
                                disabled={disabled}
                                value={value !== null ? value : ''}
                                onChange={onChange}
                                readOnly={readOnly}
                                placeholder={placeholder}
                                dir={dir}
                          />)
                case 'verylarge' : 
                    return   (<input className={styles.verylarge}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'averagelarge' : 
                    return   (<input className={styles.averagelarge}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'large' : 
                    return   (<input className={styles.large}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'overaverage' : 
                    return   (<input className={styles.overaverage}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'average' : 
                    return   (<input className={styles.average}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'belowaverage' : 
                    return   (<input className={styles.belowaverage}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'belowbelowaverage' : 
                    return   (<input className={styles.belowbelowaverage}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'small' : 
                    return   (<input className={styles.small}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                case 'verysmall' : 
                    return   (<input className={styles.verysmall}
                                    type={type}
                                    disabled={disabled}
                                    value={value !== null ? value : ''}
                                    onChange={onChange}
                                    readOnly={readOnly}
                                    placeholder={placeholder}
                                    dir={dir}
                              />)
                default : 
                return   (<input className={styles.average}
                                type={type}
                                disabled={disabled}
                                value={value !== null ? value : ''}
                                onChange={onChange}
                                readOnly={readOnly}
                                placeholder={placeholder}
                                dir={dir}
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
            display === "labelonright" ? (
                <label className={styles.labelonright}>{label}
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